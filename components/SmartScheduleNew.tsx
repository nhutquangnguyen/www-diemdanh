import { useState, useEffect } from 'react';
import { Staff, ShiftTemplate } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  generateSmartSchedule,
  getWeekStartDate,
  getWeekDates,
  calculateShiftDuration
} from '@/lib/smartSchedule';
import { useToast } from '@/components/Toast';
import SmartSchedulePreview from './SmartSchedulePreview';

interface SmartScheduleNewProps {
  storeId: string;
  staff: Staff[];
  shifts: ShiftTemplate[];
  currentWeekStart: Date;
  navigateWeek: (direction: 'prev' | 'next') => void;
  goToToday: () => void;
  onScheduleApplied: () => void;
}

export default function SmartScheduleNew({
  storeId,
  staff,
  shifts,
  currentWeekStart,
  navigateWeek,
  goToToday,
  onScheduleApplied,
}: SmartScheduleNewProps) {
  const toast = useToast();

  // State
  const [step, setStep] = useState<1 | 2>(1);
  const [requirements, setRequirements] = useState<{ [key: string]: number }>({});
  const [availability, setAvailability] = useState<{ [key: string]: boolean }>({});
  const [expandedStaff, setExpandedStaff] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [bulkApplyValue, setBulkApplyValue] = useState<string>('1');

  const weekStartStr = getWeekStartDate(currentWeekStart);
  const weekDates = getWeekDates(weekStartStr);
  const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // Load data
  useEffect(() => {
    loadData();
  }, [weekStartStr, storeId]);

  async function loadData() {
    try {
      setLoading(true);

      // Load requirements
      const { data: reqData, error: reqError } = await supabase
        .from('shift_requirements')
        .select('*')
        .eq('store_id', storeId)
        .eq('week_start_date', weekStartStr);

      if (reqError) throw reqError;

      const reqMap: { [key: string]: number } = {};
      reqData?.forEach(item => {
        const key = `${item.day_of_week}_${item.shift_template_id}`;
        reqMap[key] = item.required_staff_count;
      });
      setRequirements(reqMap);

      // Load availability
      const { data: availData, error: availError } = await supabase
        .from('staff_availability')
        .select('*')
        .eq('store_id', storeId)
        .eq('week_start_date', weekStartStr);

      if (availError) throw availError;

      const availMap: { [key: string]: boolean } = {};
      availData?.forEach(item => {
        const key = `${item.staff_id}_${item.day_of_week}_${item.shift_template_id}`;
        availMap[key] = item.is_available;
      });
      setAvailability(availMap);

    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }

  // Get/Set requirement
  function getRequirement(dayIndex: number, shiftId: string): number {
    const key = `${dayIndex}_${shiftId}`;
    return requirements[key] || 0;
  }

  function setRequirement(dayIndex: number, shiftId: string, value: number) {
    const key = `${dayIndex}_${shiftId}`;
    setRequirements(prev => ({ ...prev, [key]: Math.max(0, value) }));
  }

  // Bulk apply requirement
  function bulkApplyRequirement(value: number) {
    const newReqs: { [key: string]: number } = {};
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      for (const shift of shifts) {
        const key = `${dayIndex}_${shift.id}`;
        newReqs[key] = value;
      }
    }
    setRequirements(newReqs);
    if (value === 0) {
      toast.success('Đã xóa tất cả yêu cầu');
    } else {
      toast.success(`Đã áp dụng ${value} người cho tất cả ca`);
    }
  }

  function handleBulkApply() {
    const num = parseInt(bulkApplyValue);
    if (isNaN(num) || num < 0) {
      toast.error('Vui lòng nhập số hợp lệ (≥ 0)');
      return;
    }
    bulkApplyRequirement(num);
  }

  // Get/Set availability
  function isAvailable(staffId: string, dayIndex: number, shiftId: string): boolean {
    const key = `${staffId}_${dayIndex}_${shiftId}`;
    return availability[key] || false;
  }

  function toggleAvailability(staffId: string, dayIndex: number, shiftId: string) {
    const key = `${staffId}_${dayIndex}_${shiftId}`;
    setAvailability(prev => ({ ...prev, [key]: !prev[key] }));
  }

  // Quick apply for staff
  function quickApplyStaff(staffId: string, pattern: 'all' | 'weekdays' | 'weekends' | 'clear') {
    const newAvail = { ...availability };

    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      let shouldApply = false;

      if (pattern === 'all') shouldApply = true;
      else if (pattern === 'weekdays' && dayIndex >= 0 && dayIndex <= 4) shouldApply = true;
      else if (pattern === 'weekends' && (dayIndex === 5 || dayIndex === 6)) shouldApply = true;
      else if (pattern === 'clear') shouldApply = false;

      if (pattern !== 'clear' || pattern === 'clear') {
        for (const shift of shifts) {
          const key = `${staffId}_${dayIndex}_${shift.id}`;
          newAvail[key] = shouldApply;
        }
      }
    }

    setAvailability(newAvail);
  }

  // Count staff availability
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

  // Save to database
  async function handleSave() {
    try {
      setSaving(true);

      // Prepare requirement records
      const reqRecords = Object.entries(requirements)
        .filter(([_, count]) => count > 0)
        .map(([key, count]) => {
          const [dayOfWeek, shiftTemplateId] = key.split('_');
          return {
            store_id: storeId,
            week_start_date: weekStartStr,
            shift_template_id: shiftTemplateId,
            day_of_week: parseInt(dayOfWeek),
            required_staff_count: count,
          };
        });

      // Prepare availability records
      const availRecords = Object.entries(availability)
        .filter(([_, isAvail]) => isAvail)
        .map(([key]) => {
          const [staffId, dayOfWeek, shiftTemplateId] = key.split('_');
          return {
            staff_id: staffId,
            store_id: storeId,
            week_start_date: weekStartStr,
            shift_template_id: shiftTemplateId,
            day_of_week: parseInt(dayOfWeek),
            is_available: true,
          };
        });

      // Delete existing
      await supabase.from('shift_requirements').delete()
        .eq('store_id', storeId).eq('week_start_date', weekStartStr);
      await supabase.from('staff_availability').delete()
        .eq('store_id', storeId).eq('week_start_date', weekStartStr);

      // Insert new
      if (reqRecords.length > 0) {
        const { error: reqError } = await supabase.from('shift_requirements').insert(reqRecords);
        if (reqError) throw reqError;
      }
      if (availRecords.length > 0) {
        const { error: availError } = await supabase.from('staff_availability').insert(availRecords);
        if (availError) throw availError;
      }

      toast.success('Đã lưu thành công');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Lỗi khi lưu dữ liệu');
    } finally {
      setSaving(false);
    }
  }

  // Generate schedule
  async function handleGenerate() {
    try {
      setGenerating(true);

      // Validate
      const hasRequirements = Object.values(requirements).some(v => v > 0);
      const hasAvailability = Object.values(availability).some(v => v);

      if (!hasRequirements) {
        toast.warning('Vui lòng nhập số lượng nhân viên cần thiết');
        return;
      }
      if (!hasAvailability) {
        toast.warning('Vui lòng đánh dấu lịch rảnh cho nhân viên');
        return;
      }

      // Save first
      await handleSave();

      // Prepare data
      const shiftsData = [];
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
      const availabilityMatrix: any = {};
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
      setShowPreview(true);

    } catch (error) {
      console.error('Error generating:', error);
      toast.error('Lỗi khi tạo lịch');
    } finally {
      setGenerating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 py-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Lịch Thông Minh 🤖
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Bước {step}/2: {step === 1 ? 'Số lượng nhân viên' : 'Lịch rảnh'}
            </p>
          </div>
          <button
            onClick={goToToday}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50"
          >
            Tuần Này
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex gap-2 mb-4">
          <div className={`flex-1 h-2 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`} />
          <div className={`flex-1 h-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`} />
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button onClick={() => navigateWeek('prev')} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-sm font-semibold text-gray-700">
            {(() => {
              const formatDM = (d: string) => {
                const date = new Date(d);
                return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
              };
              return `${formatDM(weekDates[0])} - ${formatDM(weekDates[6])}`;
            })()}
          </div>
          <button onClick={() => navigateWeek('next')} className="p-2 hover:bg-gray-100 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* STEP 1: Requirements */}
      {step === 1 && (
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Số Lượng Nhân Viên Cần</h2>

          {/* Bulk apply */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="text-sm font-semibold text-gray-700 mb-3">Áp dụng nhanh:</div>
            <div className="flex flex-wrap gap-2 items-center">
              <input
                type="number"
                min="0"
                value={bulkApplyValue}
                onChange={(e) => setBulkApplyValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleBulkApply();
                  }
                }}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="0"
              />
              <button
                onClick={handleBulkApply}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm transition-colors"
              >
                Áp dụng cho tất cả
              </button>
              <button
                onClick={() => bulkApplyRequirement(0)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold text-sm transition-colors"
              >
                Xóa tất cả
              </button>
            </div>
          </div>

          {/* Requirements Grid */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left p-2 sm:p-3 text-gray-700 font-bold text-xs sm:text-sm sticky left-0 bg-white z-10 min-w-[80px] sm:min-w-0">
                    Ca
                  </th>
                  {dayNames.map((day, idx) => (
                    <th key={idx} className="p-1 sm:p-2 text-center text-gray-700 font-bold text-[10px] sm:text-xs w-[40px] sm:w-16">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift, shiftIdx) => (
                  <tr key={shift.id} className={`border-b ${shiftIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                    <td className="p-2 sm:p-3 sticky left-0 bg-inherit z-10 min-w-[80px] sm:min-w-0">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full flex-shrink-0" style={{ backgroundColor: shift.color }} />
                        <span className="font-semibold text-xs sm:text-sm text-gray-800 truncate">{shift.name}</span>
                      </div>
                    </td>
                    {weekDates.map((_, dayIndex) => {
                      const value = getRequirement(dayIndex, shift.id);
                      return (
                        <td key={dayIndex} className="p-0.5 sm:p-2 text-center w-[40px] sm:w-16">
                          <button
                            onClick={() => {
                              const newValue = prompt('Nhập số lượng nhân viên cần:', value.toString());
                              if (newValue !== null) {
                                const num = parseInt(newValue);
                                if (!isNaN(num) && num >= 0) {
                                  setRequirement(dayIndex, shift.id, num);
                                }
                              }
                            }}
                            className="w-8 h-8 sm:w-12 sm:h-12 bg-white hover:bg-blue-50 border-2 border-gray-300 hover:border-blue-500 rounded sm:rounded-lg mx-auto font-bold text-sm sm:text-lg text-gray-800 transition-all active:scale-95"
                          >
                            {value}
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Actions */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={() => { handleSave(); setStep(2); }}
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              {saving ? 'Đang lưu...' : 'Lưu & Tiếp'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Availability */}
      {step === 2 && (
        <div className="space-y-4">
          {staff.map(staffMember => {
            const { available, total } = countStaffAvailability(staffMember.id);
            const percentage = total > 0 ? (available / total) * 100 : 0;
            const isExpanded = expandedStaff.has(staffMember.id);

            let badgeColor = 'bg-gray-200 text-gray-700';
            let badgeEmoji = '⚪';
            if (percentage >= 80) { badgeColor = 'bg-green-100 text-green-700'; badgeEmoji = '🟢'; }
            else if (percentage >= 50) { badgeColor = 'bg-yellow-100 text-yellow-700'; badgeEmoji = '🟡'; }
            else if (percentage > 0) { badgeColor = 'bg-orange-100 text-orange-700'; badgeEmoji = '🟠'; }
            else { badgeColor = 'bg-red-100 text-red-700'; badgeEmoji = '🔴'; }

            return (
              <div key={staffMember.id} className="bg-white rounded-lg shadow">
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
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {(staffMember.name || staffMember.full_name)?.split(' ').slice(-2).map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-800">{staffMember.name || staffMember.full_name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${badgeColor}`}>
                        {badgeEmoji} {available}/{total}
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
                              <th key={idx} className="text-center text-xs font-semibold text-gray-600 p-2">
                                {day}
                              </th>
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

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
            >
              Quay lại
            </button>
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
            >
              {generating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Đang tạo...
                </>
              ) : (
                <>
                  🤖 Tạo Lịch Tự Động
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreview && generatedSchedule && (
        <SmartSchedulePreview
          schedule={generatedSchedule}
          staff={staff}
          shifts={shifts}
          weekDates={weekDates}
          storeId={storeId}
          weekStartStr={weekStartStr}
          onClose={() => setShowPreview(false)}
          onApplied={() => {
            setShowPreview(false);
            onScheduleApplied();
          }}
        />
      )}
    </div>
  );
}
