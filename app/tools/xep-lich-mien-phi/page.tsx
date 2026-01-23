'use client';

import { useState, useEffect, useRef } from 'react';
import { generateSmartSchedule, getWeekStartDate, getWeekDates, calculateShiftDuration } from '@/lib/smartSchedule';
import type {
  SmartScheduleShift,
  SmartScheduleAvailability,
  SmartScheduleResult,
  ShiftTemplate
} from '@/types';
import ExcelJS from 'exceljs';
import { getAppUrl } from '@/lib/env';
import MarketingLayout from '@/components/MarketingLayout';

// Simple staff interface for free tool (no database)
interface FreeToolStaff {
  id: string;
  display_name: string;
}

// localStorage data structure
interface FreeToolData {
  staff: FreeToolStaff[];
  shifts: ShiftTemplate[];
  weekStart: string;
  requirements: { [key: string]: number };
  availability: { [key: string]: boolean };
}

export default function FreeScheduleTool() {
  const appUrl = getAppUrl();
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [staffCount, setStaffCount] = useState<string>('5');
  const [shiftOption, setShiftOption] = useState<2 | 3>(2);
  const [editableShifts, setEditableShifts] = useState<Array<{ name: string; start_time: string; end_time: string }>>([
    { name: 'Ca 1', start_time: '08:00', end_time: '12:00' },
    { name: 'Ca 2', start_time: '12:00', end_time: '18:00' }
  ]);

  const [staff, setStaff] = useState<FreeToolStaff[]>([]);
  const [shifts, setShifts] = useState<ShiftTemplate[]>([]);
  const [weekStart, setWeekStart] = useState<Date>(new Date());
  const [requirements, setRequirements] = useState<{ [key: string]: number }>({});
  const [availability, setAvailability] = useState<{ [key: string]: boolean }>({});
  const [expandedStaff, setExpandedStaff] = useState<Set<string>>(new Set());
  const [generatedSchedule, setGeneratedSchedule] = useState<SmartScheduleResult | null>(null);
  const [generating, setGenerating] = useState(false);
  const [showHelp, setShowHelp] = useState<string | null>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const [editingCell, setEditingCell] = useState<{ staffId: string; date: string } | null>(null);
  const [shareModal, setShareModal] = useState<{ url: string; qrCode: string; expiresAt: string } | null>(null);
  const [sharing, setSharing] = useState(false);

  const weekStartStr = getWeekStartDate(weekStart);
  const weekDates = getWeekDates(weekStartStr);
  const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // Initialize week to current Monday
  useEffect(() => {
    const today = new Date();
    const monday = new Date(today);
    const day = monday.getDay();
    const diff = monday.getDate() - day + (day === 0 ? -6 : 1);
    monday.setDate(diff);
    setWeekStart(monday);

    // Try to load from localStorage
    loadFromLocalStorage();
  }, []);

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  // Auto-save to localStorage whenever data changes
  useEffect(() => {
    if (staff.length > 0 || shifts.length > 0) {
      saveToLocalStorage();
    }
  }, [staff, shifts, requirements, availability]);

  // Close help tooltip when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (helpRef.current && !helpRef.current.contains(event.target as Node)) {
        setShowHelp(null);
      }
    }

    if (showHelp) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showHelp]);

  function saveToLocalStorage() {
    const data: FreeToolData = {
      staff,
      shifts,
      weekStart: weekStartStr,
      requirements,
      availability
    };
    localStorage.setItem('freeScheduleTool', JSON.stringify(data));
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('freeScheduleTool');
    if (saved) {
      try {
        const data: FreeToolData = JSON.parse(saved);
        setStaff(data.staff || []);
        setShifts(data.shifts || []);
        setRequirements(data.requirements || {});
        setAvailability(data.availability || {});
      } catch (error) {
        console.error('Error loading from localStorage:', error);
      }
    }
  }

  // STEP 1: Quick Staff Setup
  function handleStep1Complete() {
    const count = parseInt(staffCount);
    if (isNaN(count) || count < 2 || count > 10) {
      alert('Vui lòng nhập số nhân viên từ 2-10');
      return;
    }

    const newStaff: FreeToolStaff[] = [];
    for (let i = 0; i < count; i++) {
      newStaff.push({
        id: `staff-${i + 1}`,
        display_name: `Nhân viên ${i + 1}`
      });
    }
    setStaff(newStaff);
    setStep(2);
  }

  // STEP 2: Shift Setup
  function handleStep2Complete() {
    const shiftColors = ['#3b82f6', '#10b981', '#f59e0b'];
    const newShifts: ShiftTemplate[] = [];

    // Use editableShifts if available, otherwise fallback to defaults
    const shiftsToUse = editableShifts.length > 0 ? editableShifts : [];

    if (shiftsToUse.length === 0) {
      alert('Vui lòng chọn số ca làm việc (2 hoặc 3 ca)');
      return;
    }

    // Create shifts from editable values
    shiftsToUse.forEach((editableShift, index) => {
      // Ensure 24-hour format (HH:mm)
      const startTime = editableShift.start_time.includes(':')
        ? editableShift.start_time
        : '08:00';
      const endTime = editableShift.end_time.includes(':')
        ? editableShift.end_time
        : '17:00';

      newShifts.push({
        id: `shift-${index + 1}`,
        store_id: 'free-tool',
        name: editableShift.name,
        start_time: startTime + ':00', // Convert HH:mm to HH:mm:ss
        end_time: endTime + ':00',     // Convert HH:mm to HH:mm:ss
        grace_period_minutes: 15,
        color: shiftColors[index] || shiftColors[0],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    });

    console.log('Created shifts:', newShifts); // Debug log
    setShifts(newShifts);

    // Initialize all availability as true (everyone available for all shifts)
    const newAvailability: { [key: string]: boolean } = {};
    staff.forEach(s => {
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        newShifts.forEach(shift => {
          const key = `${s.id}_${dayIndex}_${shift.id}`;
          newAvailability[key] = true;
        });
      }
    });
    setAvailability(newAvailability);

    setStep(3);
  }

  // Requirements functions (Step 3)
  function getRequirement(dayIndex: number, shiftId: string): number {
    const key = `${dayIndex}_${shiftId}`;
    return requirements[key] || 0;
  }

  function setRequirement(dayIndex: number, shiftId: string, value: number) {
    const key = `${dayIndex}_${shiftId}`;
    setRequirements(prev => ({ ...prev, [key]: Math.max(0, value) }));
  }

  function bulkApplyRequirement(value: number) {
    const newReqs: { [key: string]: number } = {};
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      for (const shift of shifts) {
        const key = `${dayIndex}_${shift.id}`;
        newReqs[key] = value;
      }
    }
    setRequirements(newReqs);
  }

  // Availability functions (Step 4)
  function isAvailable(staffId: string, dayIndex: number, shiftId: string): boolean {
    const key = `${staffId}_${dayIndex}_${shiftId}`;
    return availability[key] || false;
  }

  function toggleAvailability(staffId: string, dayIndex: number, shiftId: string) {
    const key = `${staffId}_${dayIndex}_${shiftId}`;
    setAvailability(prev => ({ ...prev, [key]: !prev[key] }));
  }

  function quickApplyStaff(staffId: string, pattern: 'all' | 'weekdays' | 'weekends' | 'clear') {
    const newAvail = { ...availability };

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      let shouldApply = false;

      if (pattern === 'all') shouldApply = true;
      else if (pattern === 'weekdays' && dayIndex >= 0 && dayIndex <= 4) shouldApply = true;
      else if (pattern === 'weekends' && (dayIndex === 5 || dayIndex === 6)) shouldApply = true;

      for (const shift of shifts) {
        const key = `${staffId}_${dayIndex}_${shift.id}`;
        newAvail[key] = shouldApply;
      }
    }

    setAvailability(newAvail);
  }

  function countStaffAvailability(staffId: string): { available: number; total: number } {
    let available = 0;
    const total = 7 * shifts.length;

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      for (const shift of shifts) {
        if (isAvailable(staffId, dayIndex, shift.id)) {
          available++;
        }
      }
    }

    return { available, total };
  }

  // Generate schedule (Step 5)
  async function handleGenerate() {
    setGenerating(true);
    try {
      // Prepare data for algorithm
      const shiftsData: SmartScheduleShift[] = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        for (const shift of shifts) {
          const required = getRequirement(dayIndex, shift.id);
          if (required > 0) {
            shiftsData.push({
              date: weekDates[dayIndex],
              shiftTemplateId: shift.id,
              shiftName: shift.name,
              startTime: shift.start_time,
              endTime: shift.end_time,
              duration: calculateShiftDuration(shift.start_time, shift.end_time),
              required,
              dayOfWeek: dayIndex === 6 ? 0 : dayIndex + 1,
            });
          }
        }
      }

      // Prepare availability matrix
      const availabilityMatrix: SmartScheduleAvailability = {};
      staff.forEach(s => {
        availabilityMatrix[s.id] = {};
        weekDates.forEach((date, dayIndex) => {
          availabilityMatrix[s.id][date] = {};
          shifts.forEach(shift => {
            availabilityMatrix[s.id][date][shift.id] = isAvailable(s.id, dayIndex, shift.id);
          });
        });
      });

      // Run algorithm
      const result = generateSmartSchedule(
        shiftsData,
        availabilityMatrix,
        staff.map(s => s.id)
      );

      setGeneratedSchedule(result);
      setStep(5);
    } catch (error) {
      console.error('Error generating schedule:', error);
      alert('Có lỗi khi tạo lịch. Vui lòng thử lại.');
    } finally {
      setGenerating(false);
    }
  }

  function updateStaffName(staffId: string, newName: string) {
    setStaff(prev => prev.map(s => s.id === staffId ? { ...s, display_name: newName } : s));
  }

  function updateShiftName(shiftId: string, newName: string) {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, name: newName } : s));
  }

  function updateShiftTime(shiftId: string, field: 'start_time' | 'end_time', value: string) {
    setShifts(prev => prev.map(s => s.id === shiftId ? { ...s, [field]: value + ':00' } : s));
  }

  function resetAll() {
    setStep(1);
    setStaff([]);
    setShifts([]);
    setRequirements({});
    setAvailability({});
    setGeneratedSchedule(null);
    localStorage.removeItem('freeScheduleTool');
  }

  // Toggle shift assignment for a staff member on a specific date
  function toggleShiftAssignment(staffId: string, date: string, shiftId: string) {
    if (!generatedSchedule) return;

    const newAssignments = { ...generatedSchedule.assignments };
    if (!newAssignments[staffId]) {
      newAssignments[staffId] = {};
    }
    if (!newAssignments[staffId][date]) {
      newAssignments[staffId][date] = [];
    }

    const shiftIds = newAssignments[staffId][date];
    const index = shiftIds.indexOf(shiftId);

    if (index > -1) {
      // Remove shift
      newAssignments[staffId][date] = shiftIds.filter(id => id !== shiftId);
      if (newAssignments[staffId][date].length === 0) {
        delete newAssignments[staffId][date];
      }
    } else {
      // Add shift
      newAssignments[staffId][date] = [...shiftIds, shiftId];
    }

    // Recalculate hours and shift counts
    const newStaffHours = { ...generatedSchedule.staffHours };
    const newStaffShiftCount = { ...generatedSchedule.staffShiftCount };

    staff.forEach(s => {
      let totalHours = 0;
      let totalShifts = 0;
      Object.values(newAssignments[s.id] || {}).forEach((shiftIds) => {
        totalShifts += shiftIds.length;
        shiftIds.forEach(shiftId => {
          const shift = shifts.find(sh => sh.id === shiftId);
          if (shift) {
            totalHours += calculateShiftDuration(shift.start_time, shift.end_time);
          }
        });
      });
      newStaffHours[s.id] = totalHours;
      newStaffShiftCount[s.id] = totalShifts;
    });

    setGeneratedSchedule({
      ...generatedSchedule,
      assignments: newAssignments,
      staffHours: newStaffHours,
      staffShiftCount: newStaffShiftCount
    });
  }

  function getStaffName(staffId: string): string {
    return staff.find(s => s.id === staffId)?.display_name || staffId;
  }

  function formatDateForDisplay(dateStr: string): string {
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  async function handleShare() {
    if (!generatedSchedule) return;

    setSharing(true);
    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          staff,
          shifts,
          schedule: generatedSchedule,
          weekStart: weekStartStr
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create share link');
      }

      const data = await response.json();
      setShareModal({
        url: data.url.trim(), // Remove any whitespace
        qrCode: data.qrCode,
        expiresAt: data.expiresAt
      });
    } catch (error) {
      console.error('Error sharing schedule:', error);
      alert('Có lỗi khi tạo link chia sẻ. Vui lòng thử lại.');
    } finally {
      setSharing(false);
    }
  }

  function copyToClipboard(text: string) {
    // Trim whitespace and newlines to prevent copy issues
    const cleanText = text.trim();
    navigator.clipboard.writeText(cleanText).then(() => {
      alert('Đã sao chép link!');
    }).catch(() => {
      alert('Không thể sao chép. Vui lòng sao chép thủ công.');
    });
  }

  function getDaysUntilExpiration(expiresAt: string): number {
    const expires = new Date(expiresAt);
    const now = new Date();
    const diff = expires.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  async function exportToExcel() {
    if (!generatedSchedule) return;

    const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

    // Create workbook and worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Lịch Làm Việc');

    // Add header row
    const headerRow = worksheet.addRow(['Ngày', ...staff.map(s => s.display_name)]);

    // Style header row
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF2563EB' } // Blue
      };
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFFFF' } // White
      };
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
    });

    // Add data rows
    weekDates.forEach((date, dayIndex) => {
      const dateObj = new Date(date);
      const dayLabel = `${dayNames[dayIndex]} ${dateObj.getDate()}/${dateObj.getMonth() + 1}`;

      const rowData = [dayLabel];

      // Add staff shift data
      staff.forEach((staffMember) => {
        const shiftIds = generatedSchedule.assignments[staffMember.id]?.[date] || [];
        const assignedShifts = shiftIds.map(id => shifts.find(s => s.id === id)).filter(Boolean) as ShiftTemplate[];

        if (assignedShifts.length > 0) {
          const shiftNames = assignedShifts.map(s => `${s.name} (${s.start_time.substring(0, 5)}-${s.end_time.substring(0, 5)})`).join(', ');
          rowData.push(shiftNames);
        } else {
          rowData.push('OFF');
        }
      });

      const row = worksheet.addRow(rowData);

      // Style cells
      row.eachCell((cell, colNumber) => {
        // Date column
        if (colNumber === 1) {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFF3F4F6' } // Light gray
          };
          cell.font = { bold: true };
          cell.alignment = { vertical: 'middle', horizontal: 'left' };
        } else {
          // Staff shift cells
          const staffIndex = colNumber - 2;
          const staffMember = staff[staffIndex];
          const shiftIds = generatedSchedule.assignments[staffMember.id]?.[date] || [];
          const assignedShifts = shiftIds.map(id => shifts.find(s => s.id === id)).filter(Boolean) as ShiftTemplate[];

          if (assignedShifts.length > 0) {
            // Use shift color
            const shiftColor = assignedShifts[0].color.replace('#', '');
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF' + shiftColor }
            };
            cell.font = {
              bold: true,
              color: { argb: 'FFFFFFFF' } // White text
            };
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'center',
              wrapText: true
            };
          } else {
            // OFF cell
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFFEE2E2' } // Light red
            };
            cell.font = {
              bold: true,
              color: { argb: 'FFDC2626' } // Red text
            };
            cell.alignment = {
              vertical: 'middle',
              horizontal: 'center'
            };
          }
        }
      });
    });

    // Set column widths
    worksheet.getColumn(1).width = 15;
    staff.forEach((_, index) => {
      worksheet.getColumn(index + 2).width = 25;
    });

    // Generate filename
    const startDate = new Date(weekDates[0]);
    const endDate = new Date(weekDates[6]);
    const filename = `Lich_Lam_Viec_${startDate.getDate()}-${startDate.getMonth() + 1}_den_${endDate.getDate()}-${endDate.getMonth() + 1}.xlsx`;

    // Download file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <MarketingLayout>
      <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
        {/* Main Content */}
        <main className="flex-1">
        {/* Hero Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">Xếp Lịch AI Miễn Phí</h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-6">Tạo lịch làm việc công bằng trong 5 phút - Không cần đăng ký</p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Tối đa 10 nhân viên</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>3 ca làm việc</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>1 tuần</span>
              </div>
            </div>
          </div>
        </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress bar */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold text-sm sm:text-base shrink-0 ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {s}
                </div>
                {s < 5 && (
                  <div className={`flex-1 h-1 mx-1 sm:mx-2 min-w-[20px] ${
                    step > s ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-gray-600">
            Bước {step}/5: {
              step === 1 ? 'Thêm nhân viên' :
              step === 2 ? 'Chọn ca làm việc' :
              step === 3 ? 'Số lượng nhân viên cần' :
              step === 4 ? 'Lịch rảnh' :
              'Xem trước lịch'
            }
          </div>
        </div>

        {/* STEP 1: Quick Staff Setup */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bước 1: Thêm nhân viên</h2>
            <p className="text-gray-600 mb-6">Nhập số lượng nhân viên (tối đa 10 người)</p>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng nhân viên</label>
              <input
                type="number"
                min="2"
                max="10"
                value={staffCount}
                onChange={(e) => setStaffCount(e.target.value)}
                className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Nhập số từ 2-10"
              />
              <p className="mt-2 text-sm text-gray-500">
                Tên nhân viên sẽ được tạo tự động (Nhân viên 1, Nhân viên 2, ...) và bạn có thể sửa sau
              </p>
            </div>

            <button
              onClick={handleStep1Complete}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
            >
              Tiếp theo →
            </button>

            {/* Upgrade CTA */}
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-800">
                💡 <strong>Cần nhiều hơn 10 nhân viên?</strong> <a href={`${appUrl}/auth/signup`} className="underline font-semibold">Đăng ký miễn phí</a> để quản lý không giới hạn nhân viên
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Shift Selection */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bước 2: Chọn ca làm việc</h2>
            <p className="text-gray-600 mb-6">Chọn số lượng ca và tùy chỉnh giờ làm việc</p>

            {/* Shift option selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Bạn có mấy ca làm việc?</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setShiftOption(2);
                    setEditableShifts([
                      { name: 'Ca 1', start_time: '08:00', end_time: '12:00' },
                      { name: 'Ca 2', start_time: '12:00', end_time: '18:00' }
                    ]);
                  }}
                  className={`py-4 px-6 rounded-xl border-2 transition-all ${
                    shiftOption === 2
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl font-bold text-gray-800">2 ca</div>
                </button>
                <button
                  onClick={() => {
                    setShiftOption(3);
                    setEditableShifts([
                      { name: 'Ca 1', start_time: '08:00', end_time: '12:00' },
                      { name: 'Ca 2', start_time: '12:00', end_time: '16:00' },
                      { name: 'Ca 3', start_time: '16:00', end_time: '20:00' }
                    ]);
                  }}
                  className={`py-4 px-6 rounded-xl border-2 transition-all ${
                    shiftOption === 3
                      ? 'border-blue-600 bg-blue-50 shadow-md'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="text-2xl font-bold text-gray-800">3 ca</div>
                </button>
              </div>
            </div>

            {/* Editable Shifts */}
            {editableShifts.length > 0 && (
              <div className="mb-8 bg-gray-50 border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tùy chỉnh ca làm việc</h3>
                <div className="space-y-4">
                  {editableShifts.map((shift, index) => (
                    <div key={index} className="bg-white border border-gray-300 rounded-lg p-4">
                      {/* Shift Name */}
                      <div className="mb-4">
                        <label className="block text-xs font-semibold text-gray-600 mb-2">Tên ca</label>
                        <input
                          type="text"
                          value={shift.name}
                          onChange={(e) => {
                            const newShifts = [...editableShifts];
                            newShifts[index].name = e.target.value;
                            setEditableShifts(newShifts);
                          }}
                          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white text-gray-900"
                          placeholder="Vd: Ca sáng"
                        />
                      </div>

                      {/* Time Inputs - Side by Side */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Start Time */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-2">Giờ bắt đầu</label>
                          <div className="flex items-center gap-0.5">
                            <select
                              value={shift.start_time.split(':')[0]}
                              onChange={(e) => {
                                const newShifts = [...editableShifts];
                                const [, minutes] = shift.start_time.split(':');
                                newShifts[index].start_time = `${e.target.value}:${minutes || '00'}`;
                                setEditableShifts(newShifts);
                              }}
                              className="w-12 px-0.5 py-1.5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-center appearance-none bg-white text-gray-900"
                              style={{ backgroundImage: 'none' }}
                            >
                              {Array.from({ length: 24 }, (_, i) => (
                                <option key={i} value={String(i).padStart(2, '0')}>
                                  {String(i).padStart(2, '0')}
                                </option>
                              ))}
                            </select>
                            <span className="text-gray-600 text-sm">:</span>
                            <select
                              value={shift.start_time.split(':')[1] || '00'}
                              onChange={(e) => {
                                const newShifts = [...editableShifts];
                                const [hours] = shift.start_time.split(':');
                                newShifts[index].start_time = `${hours}:${e.target.value}`;
                                setEditableShifts(newShifts);
                              }}
                              className="w-12 px-0.5 py-1.5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-center appearance-none bg-white text-gray-900"
                              style={{ backgroundImage: 'none' }}
                            >
                              {Array.from({ length: 60 }, (_, i) => (
                                <option key={i} value={String(i).padStart(2, '0')}>
                                  {String(i).padStart(2, '0')}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* End Time */}
                        <div>
                          <label className="block text-xs font-semibold text-gray-600 mb-2">Giờ kết thúc</label>
                          <div className="flex items-center gap-0.5">
                            <select
                              value={shift.end_time.split(':')[0]}
                              onChange={(e) => {
                                const newShifts = [...editableShifts];
                                const [, minutes] = shift.end_time.split(':');
                                newShifts[index].end_time = `${e.target.value}:${minutes || '00'}`;
                                setEditableShifts(newShifts);
                              }}
                              className="w-12 px-0.5 py-1.5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-center appearance-none bg-white text-gray-900"
                              style={{ backgroundImage: 'none' }}
                            >
                              {Array.from({ length: 24 }, (_, i) => (
                                <option key={i} value={String(i).padStart(2, '0')}>
                                  {String(i).padStart(2, '0')}
                                </option>
                              ))}
                            </select>
                            <span className="text-gray-600 text-sm">:</span>
                            <select
                              value={shift.end_time.split(':')[1] || '00'}
                              onChange={(e) => {
                                const newShifts = [...editableShifts];
                                const [hours] = shift.end_time.split(':');
                                newShifts[index].end_time = `${hours}:${e.target.value}`;
                                setEditableShifts(newShifts);
                              }}
                              className="w-12 px-0.5 py-1.5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm text-center appearance-none bg-white text-gray-900"
                              style={{ backgroundImage: 'none' }}
                            >
                              {Array.from({ length: 60 }, (_, i) => (
                                <option key={i} value={String(i).padStart(2, '0')}>
                                  {String(i).padStart(2, '0')}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                ← Quay lại
              </button>
              <button
                onClick={handleStep2Complete}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
              >
                Tiếp theo →
              </button>
            </div>

            {/* Upgrade CTA */}
            <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-800">
                💡 <strong>Cần nhiều hơn 3 ca?</strong> <a href={`${appUrl}/auth/signup`} className="underline font-semibold">Đăng ký miễn phí</a> để tạo không giới hạn ca làm việc
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Requirements (Reuse SmartScheduleNew UI) */}
        {step === 3 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bước 3: Số lượng nhân viên cần</h2>
            <p className="text-gray-600 mb-6">Nhập số lượng nhân viên cần cho mỗi ca</p>

            {/* Bulk apply */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="text-sm font-semibold text-gray-700 mb-3">Áp dụng:</div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  defaultValue="1"
                  id="bulkApplyValue"
                  className="w-14 px-2 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-bold text-base bg-white text-gray-900"
                />
                <button
                  onClick={() => {
                    const input = document.getElementById('bulkApplyValue') as HTMLInputElement;
                    const value = parseInt(input.value);
                    if (!isNaN(value) && value >= 0) {
                      bulkApplyRequirement(value);
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  Áp dụng
                </button>
                <button
                  onClick={() => bulkApplyRequirement(0)}
                  className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold text-sm transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>

            {/* Requirements Grid */}
            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-2 text-gray-700 font-bold text-sm sticky left-0 bg-white z-10 w-32">Ca</th>
                    {dayNames.map((day, idx) => (
                      <th key={idx} className="p-2 text-center text-gray-700 font-bold text-xs">{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {shifts.map((shift, shiftIdx) => (
                    <tr key={shift.id} className={`border-b ${shiftIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="p-2 sticky left-0 bg-inherit z-10 w-32">
                        <div className="flex items-center gap-1.5">
                          <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: shift.color }} />
                          <div className="flex flex-col min-w-0">
                            <input
                              type="text"
                              value={shift.name}
                              onChange={(e) => updateShiftName(shift.id, e.target.value)}
                              className="font-semibold text-sm text-gray-800 bg-white border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1 w-full min-w-0"
                            />
                            <span className="text-xs text-gray-500 px-1">
                              {shift.start_time.substring(0, 5)}-{shift.end_time.substring(0, 5)}
                            </span>
                          </div>
                        </div>
                      </td>
                      {weekDates.map((_, dayIndex) => {
                        const value = getRequirement(dayIndex, shift.id);
                        return (
                          <td key={dayIndex} className="p-1 text-center">
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={value}
                              onChange={(e) => {
                                const num = parseInt(e.target.value);
                                if (!isNaN(num) && num >= 0) {
                                  setRequirement(dayIndex, shift.id, num);
                                } else if (e.target.value === '') {
                                  setRequirement(dayIndex, shift.id, 0);
                                }
                              }}
                              className="w-12 h-10 bg-white border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-lg mx-auto font-bold text-base text-gray-800 text-center transition-all"
                            />
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                ← Quay lại
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg"
              >
                Tiếp theo →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Availability (Reuse SmartScheduleNew UI) */}
        {step === 4 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Bước 4: Lịch rảnh</h2>
            <p className="text-gray-600 mb-6">Đánh dấu ai có thể làm ca nào (mặc định tất cả đều rảnh)</p>

            <div className="space-y-4 mb-6">
              {staff.map(staffMember => {
                const { available, total } = countStaffAvailability(staffMember.id);
                const percentage = total > 0 ? (available / total) * 100 : 0;
                const isExpanded = expandedStaff.has(staffMember.id);

                let badgeColor = 'bg-gray-200 text-gray-700';
                if (percentage >= 80) badgeColor = 'bg-green-100 text-green-700';
                else if (percentage >= 50) badgeColor = 'bg-yellow-100 text-yellow-700';
                else if (percentage > 0) badgeColor = 'bg-orange-100 text-orange-700';
                else badgeColor = 'bg-red-100 text-red-700';

                return (
                  <div key={staffMember.id} className="bg-white rounded-lg shadow border border-gray-200">
                    {/* Staff Header */}
                    <button
                      onClick={() => {
                        const newExpanded = new Set(expandedStaff);
                        if (isExpanded) newExpanded.delete(staffMember.id);
                        else newExpanded.add(staffMember.id);
                        setExpandedStaff(newExpanded);
                      }}
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {staffMember.display_name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="text-left">
                          <input
                            type="text"
                            value={staffMember.display_name}
                            onChange={(e) => {
                              e.stopPropagation();
                              updateStaffName(staffMember.id, e.target.value);
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="font-semibold text-gray-800 bg-white border-none focus:outline-none focus:ring-1 focus:ring-blue-500 rounded px-1"
                          />
                          <div className={`text-xs px-2 py-1 rounded-full inline-block ${badgeColor}`}>
                            {available}/{total}
                          </div>
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="p-4 border-t border-gray-200">
                        {/* Quick Actions */}
                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                          <div className="text-xs font-semibold text-gray-600 mb-2">Áp dụng nhanh:</div>
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => quickApplyStaff(staffMember.id, 'all')}
                              className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-xs font-semibold"
                            >
                              Tất cả tuần
                            </button>
                            <button
                              onClick={() => quickApplyStaff(staffMember.id, 'weekdays')}
                              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-semibold"
                            >
                              T2-T6
                            </button>
                            <button
                              onClick={() => quickApplyStaff(staffMember.id, 'weekends')}
                              className="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded text-xs font-semibold"
                            >
                              T7-CN
                            </button>
                            <button
                              onClick={() => quickApplyStaff(staffMember.id, 'clear')}
                              className="px-3 py-1.5 bg-gray-500 hover:bg-gray-600 text-white rounded text-xs font-semibold"
                            >
                              Bỏ chọn
                            </button>
                          </div>
                        </div>

                        {/* Availability Grid */}
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr>
                                <th className="text-left text-xs font-semibold text-gray-600 p-2">Ca</th>
                                {dayNames.map((day, idx) => (
                                  <th key={idx} className="text-center text-xs font-semibold text-gray-600 p-2">{day}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {shifts.map(shift => (
                                <tr key={shift.id} className="border-t border-gray-100">
                                  <td className="p-2">
                                    <div className="flex items-center gap-2">
                                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: shift.color }} />
                                      <span className="text-xs font-medium text-gray-700">{shift.name}</span>
                                    </div>
                                  </td>
                                  {weekDates.map((_, dayIndex) => {
                                    const checked = isAvailable(staffMember.id, dayIndex, shift.id);
                                    return (
                                      <td key={dayIndex} className="p-2 text-center">
                                        <button
                                          onClick={() => toggleAvailability(staffMember.id, dayIndex, shift.id)}
                                          className="w-full h-8 flex items-center justify-center"
                                        >
                                          {checked ? (
                                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                          ) : (
                                            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
                                            </svg>
                                          )}
                                        </button>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(3)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                ← Quay lại
              </button>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {generating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang tạo...
                  </>
                ) : (
                  <>🤖 Tạo Lịch Tự Động</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Preview (Reuse preview UI from SmartScheduleNew) */}
        {step === 5 && generatedSchedule && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Bước 5: Lịch làm việc của bạn</h2>

            {/* Stats Cards */}
            <div ref={helpRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              {/* Độ Phủ */}
              <div className="bg-blue-50 rounded-lg p-4 relative">
                <div className="flex items-center gap-1 mb-1">
                  <div className="text-xs text-gray-600">Độ Phủ</div>
                  <button
                    onClick={() => setShowHelp(showHelp === 'coverage' ? null : 'coverage')}
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                {showHelp === 'coverage' && (
                  <div className="absolute z-50 top-full left-0 mt-1 bg-white border border-blue-300 rounded-lg shadow-lg p-3 text-xs text-gray-700 w-48 sm:w-64 max-w-[calc(100vw-2rem)]">
                    <p className="font-semibold text-blue-700 mb-1">Độ Phủ</p>
                    <p>Tỷ lệ phần trăm (%) ca làm việc được xếp thành công so với tổng số ca cần xếp. Độ phủ càng cao thì lịch càng đầy đủ.</p>
                  </div>
                )}
                <div className="text-2xl font-bold text-blue-600">{generatedSchedule.stats.coveragePercent}%</div>
                <div className="text-xs text-gray-500">
                  {generatedSchedule.stats.totalShiftsFilled}/{generatedSchedule.stats.totalShiftsRequired} ca
                </div>
              </div>

              {/* Giờ TB */}
              <div className="bg-purple-50 rounded-lg p-4 relative">
                <div className="flex items-center gap-1 mb-1">
                  <div className="text-xs text-gray-600">Giờ TB</div>
                  <button
                    onClick={() => setShowHelp(showHelp === 'hours' ? null : 'hours')}
                    className="text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                {showHelp === 'hours' && (
                  <div className="absolute z-50 top-full left-0 mt-1 bg-white border border-purple-300 rounded-lg shadow-lg p-3 text-xs text-gray-700 w-48 sm:w-64 max-w-[calc(100vw-2rem)]">
                    <p className="font-semibold text-purple-700 mb-1">Giờ Trung Bình</p>
                    <p>Số giờ làm việc trung bình mỗi nhân viên trong tuần. Khoảng nhỏ nhất - lớn nhất cho biết người làm ít nhất và nhiều nhất có bao nhiêu giờ.</p>
                  </div>
                )}
                <div className="text-2xl font-bold text-purple-600">{generatedSchedule.stats.avgHoursPerStaff}h</div>
                <div className="text-xs text-gray-500">
                  {generatedSchedule.stats.minHours}h - {generatedSchedule.stats.maxHours}h
                </div>
              </div>

              {/* Cảnh Báo */}
              <div className="bg-orange-50 rounded-lg p-4 relative">
                <div className="flex items-center gap-1 mb-1">
                  <div className="text-xs text-gray-600">Cảnh Báo</div>
                  <button
                    onClick={() => setShowHelp(showHelp === 'warnings' ? null : 'warnings')}
                    className="text-orange-600 hover:text-orange-700 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
                {showHelp === 'warnings' && (
                  <div className="absolute z-50 top-full right-0 mt-1 bg-white border border-orange-300 rounded-lg shadow-lg p-3 text-xs text-gray-700 w-48 sm:w-64 max-w-[calc(100vw-2rem)]">
                    <p className="font-semibold text-orange-700 mb-1">Cảnh Báo</p>
                    <p>Số vấn đề tiềm ẩn được phát hiện trong lịch (vd: ca thiếu người, nhân viên làm quá nhiều giờ, làm liên tục nhiều ngày). Kiểm tra chi tiết bên dưới để xem cụ thể.</p>
                  </div>
                )}
                <div className="text-2xl font-bold text-orange-600">{generatedSchedule.warnings.length}</div>
                <div className="text-xs text-gray-500">Vấn đề phát hiện</div>
              </div>
            </div>

            {/* Warnings */}
            {generatedSchedule.warnings.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex gap-2">
                  <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div className="flex-1">
                    <div className="font-semibold text-yellow-800 text-sm mb-2">
                      Cảnh báo ({generatedSchedule.warnings.length}):
                    </div>
                    <div className="space-y-1 max-h-32 overflow-y-auto">
                      {generatedSchedule.warnings.map((warning, idx) => (
                        <div key={idx} className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800">
                          {warning.message}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Schedule Table - Date-based view (matches production app) */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Lịch Làm Việc</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="sticky left-0 z-20 text-left p-3 text-gray-700 font-bold text-sm bg-blue-600 text-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Ngày</th>
                      {staff.map((staffMember) => (
                        <th key={staffMember.id} className="p-3 text-center border-l border-gray-200 bg-blue-600 text-white min-w-[120px]">
                          <div className="font-semibold text-sm">{staffMember.display_name}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {weekDates.map((date, dayIndex) => {
                      const isToday = date === new Date().toISOString().split('T')[0];
                      const bgColor = isToday ? 'bg-yellow-50' : dayIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50';
                      return (
                        <tr
                          key={date}
                          className={`border-b ${bgColor}`}
                        >
                          <td className={`sticky left-0 z-10 p-3 border-r-2 border-gray-300 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] ${bgColor}`}>
                            <div className="font-semibold text-gray-800 text-sm">{dayNames[dayIndex]}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(date).getDate()}/{new Date(date).getMonth() + 1}
                            </div>
                          </td>
                          {staff.map((staffMember) => {
                            const shiftIds = generatedSchedule.assignments[staffMember.id]?.[date] || [];
                            const assignedShifts = shiftIds.map(id => shifts.find(s => s.id === id)).filter(Boolean) as ShiftTemplate[];

                            return (
                              <td key={staffMember.id} className="p-2 border-l border-gray-200 text-center align-middle">
                                <button
                                  onClick={() => setEditingCell({ staffId: staffMember.id, date })}
                                  className="w-full min-h-[60px] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                                >
                                  {assignedShifts.length > 0 ? (
                                    <div className="flex flex-col gap-1">
                                      {assignedShifts.map((shift) => (
                                        <div
                                          key={shift.id}
                                          className="px-3 py-2 rounded-lg text-sm font-medium text-white"
                                          style={{ backgroundColor: shift.color }}
                                          title={`${shift.start_time.substring(0, 5)} - ${shift.end_time.substring(0, 5)}`}
                                        >
                                          {shift.name}
                                        </div>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-red-500 text-sm font-medium">OFF</div>
                                  )}
                                </button>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Edit Shift Modal */}
            {editingCell && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800">Chọn Ca Làm Việc</h3>
                    <button
                      onClick={() => setEditingCell(null)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-6">
                    {/* Staff Info */}
                    <div className="mb-4">
                      <div className="text-sm text-gray-600">Nhân viên</div>
                      <div className="text-lg font-bold text-gray-800">
                        {getStaffName(editingCell.staffId)}
                      </div>
                    </div>

                    {/* Date Info */}
                    <div className="mb-6">
                      <div className="text-sm text-gray-600">Ngày</div>
                      <div className="text-lg font-semibold text-gray-800">
                        {formatDateForDisplay(editingCell.date)}
                      </div>
                    </div>

                    {/* Shifts List */}
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Chọn ca:</div>
                      {shifts.map((shift) => {
                        const isAssigned = generatedSchedule.assignments[editingCell.staffId]?.[editingCell.date]?.includes(shift.id) || false;

                        return (
                          <button
                            key={shift.id}
                            onClick={() => toggleShiftAssignment(editingCell.staffId, editingCell.date, shift.id)}
                            className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                          >
                            {/* Checkbox */}
                            <div className="flex-shrink-0">
                              {isAssigned ? (
                                <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center">
                                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              ) : (
                                <div className="w-5 h-5 border-2 border-gray-300 rounded"></div>
                              )}
                            </div>

                            {/* Shift Color */}
                            <div
                              className="w-6 h-6 rounded"
                              style={{ backgroundColor: shift.color }}
                            />

                            {/* Shift Info */}
                            <div className="flex-1 text-left">
                              <div className="font-semibold text-gray-800">{shift.name}</div>
                              <div className="text-sm text-gray-600">
                                {shift.start_time.substring(0, 5)} - {shift.end_time.substring(0, 5)}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-6 border-t border-gray-200">
                    <button
                      onClick={() => setEditingCell(null)}
                      className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setStep(4)}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                ← Quay lại
              </button>
              <button
                onClick={resetAll}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
              >
                🔄 Tạo lịch mới
              </button>
              <button
                onClick={exportToExcel}
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Tải Excel
              </button>
              <button
                onClick={handleShare}
                disabled={sharing}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {sharing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Đang tạo...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Chia sẻ lịch
                  </>
                )}
              </button>
            </div>

            {/* Share Modal */}
            {shareModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl w-full max-w-[calc(100vw-2rem)] sm:max-w-lg max-h-[90vh] overflow-y-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-5 border-b border-gray-200">
                    <h3 className="text-xl font-bold text-gray-800 pr-2">🎉 Lịch đã sẵn sàng!</h3>
                    <button
                      onClick={() => setShareModal(null)}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="p-5 space-y-5 overflow-x-hidden">
                    {/* Share URL */}
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-gray-700 mb-2">📱 Chia sẻ với nhân viên:</div>
                      <div className="space-y-2 min-w-0">
                        <input
                          type="text"
                          value={shareModal.url}
                          readOnly
                          className="w-full min-w-0 px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-mono truncate text-gray-900"
                        />
                        <button
                          onClick={() => copyToClipboard(shareModal.url)}
                          className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 shrink-0"
                        >
                          <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>Copy</span>
                        </button>
                      </div>
                    </div>

                    {/* QR Code */}
                    <div className="text-center overflow-hidden">
                      <div className="text-sm font-semibold text-gray-700 mb-3">Hoặc quét mã QR:</div>
                      <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-xl">
                        <img src={shareModal.qrCode} alt="QR Code" className="w-48 h-48" />
                      </div>
                    </div>

                    {/* Expiration Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div className="text-sm text-blue-800 flex-1 min-w-0">
                          <div className="font-semibold">Link có hiệu lực {getDaysUntilExpiration(shareModal.expiresAt)} ngày</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="p-5 border-t border-gray-200">
                    <button
                      onClick={() => setShareModal(null)}
                      className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg font-semibold transition-colors"
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      </main>
      </div>
    </MarketingLayout>
  );
}
