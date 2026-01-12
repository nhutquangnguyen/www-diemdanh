import { useState, useEffect } from 'react';
import { Staff, ShiftTemplate, StaffAvailability, ShiftRequirement, ScheduleGeneration } from '@/types';
import { supabase } from '@/lib/supabase';
import {
  generateSmartSchedule,
  getWeekStartDate,
  getWeekDates,
  calculateShiftDuration
} from '@/lib/smartSchedule';
import { useToast } from '@/components/Toast';
import SmartSchedulePreview from './SmartSchedulePreview';

interface SmartScheduleProps {
  storeId: string;
  staff: Staff[];
  shifts: ShiftTemplate[];
  currentWeekStart: Date;
  navigateWeek: (direction: 'prev' | 'next') => void;
  goToToday: () => void;
  onScheduleApplied: () => void;
}

export default function SmartSchedule({
  storeId,
  staff,
  shifts,
  currentWeekStart,
  navigateWeek,
  goToToday,
  onScheduleApplied,
}: SmartScheduleProps) {
  const toast = useToast();

  // State
  const [availability, setAvailability] = useState<{ [key: string]: boolean }>({});
  const [requirements, setRequirements] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<any>(null);
  const [showPreview, setShowPreview] = useState(false);

  const weekStartStr = getWeekStartDate(currentWeekStart);
  const weekDates = getWeekDates(weekStartStr);
  const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  // Load availability and requirements
  useEffect(() => {
    loadData();
  }, [weekStartStr, storeId]);

  async function loadData() {
    try {
      setLoading(true);

      // Load availability
      const { data: availData, error: availError } = await supabase
        .from('staff_availability')
        .select('*')
        .eq('store_id', storeId)
        .eq('week_start_date', weekStartStr);

      if (availError) throw availError;

      // Convert to lookup object
      const availMap: { [key: string]: boolean } = {};
      availData?.forEach(item => {
        const key = `${item.staff_id}_${item.day_of_week}_${item.shift_template_id}`;
        availMap[key] = item.is_available;
      });
      setAvailability(availMap);

      // Load requirements
      const { data: reqData, error: reqError } = await supabase
        .from('shift_requirements')
        .select('*')
        .eq('store_id', storeId)
        .eq('week_start_date', weekStartStr);

      if (reqError) throw reqError;

      // Convert to lookup object
      const reqMap: { [key: string]: number } = {};
      reqData?.forEach(item => {
        const key = `${item.day_of_week}_${item.shift_template_id}`;
        reqMap[key] = item.required_staff_count;
      });
      setRequirements(reqMap);

    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Lỗi khi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }

  // Toggle availability
  function toggleAvailability(staffId: string, dayIndex: number, shiftId: string) {
    const key = `${staffId}_${dayIndex}_${shiftId}`;
    setAvailability(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }

  // Update requirement
  function updateRequirement(dayIndex: number, shiftId: string, value: number) {
    const key = `${dayIndex}_${shiftId}`;
    setRequirements(prev => ({
      ...prev,
      [key]: Math.max(0, value)
    }));
  }

  // Save availability and requirements
  async function handleSave() {
    try {
      setSaving(true);

      // Prepare availability records
      const availRecords = Object.entries(availability).map(([key, isAvailable]) => {
        const [staffId, dayOfWeek, shiftTemplateId] = key.split('_');
        return {
          staff_id: staffId,
          store_id: storeId,
          week_start_date: weekStartStr,
          shift_template_id: shiftTemplateId,
          day_of_week: parseInt(dayOfWeek),
          is_available: isAvailable,
        };
      });

      // Prepare requirement records
      const reqRecords = Object.entries(requirements).map(([key, count]) => {
        const [dayOfWeek, shiftTemplateId] = key.split('_');
        return {
          store_id: storeId,
          week_start_date: weekStartStr,
          shift_template_id: shiftTemplateId,
          day_of_week: parseInt(dayOfWeek),
          required_staff_count: count,
        };
      });

      // Delete existing records for this week
      await supabase
        .from('staff_availability')
        .delete()
        .eq('store_id', storeId)
        .eq('week_start_date', weekStartStr);

      await supabase
        .from('shift_requirements')
        .delete()
        .eq('store_id', storeId)
        .eq('week_start_date', weekStartStr);

      // Insert new records (only those that are marked)
      const availToInsert = availRecords.filter(r => r.is_available);
      if (availToInsert.length > 0) {
        const { error: availError } = await supabase
          .from('staff_availability')
          .insert(availToInsert);
        if (availError) throw availError;
      }

      const reqToInsert = reqRecords.filter(r => r.required_staff_count > 0);
      if (reqToInsert.length > 0) {
        const { error: reqError } = await supabase
          .from('shift_requirements')
          .insert(reqToInsert);
        if (reqError) throw reqError;
      }

      toast.success('Đã lưu thành công');
    } catch (error) {
      console.error('Error saving:', error);
      toast.error('Lỗi khi lưu dữ liệu');
    } finally {
      setSaving(false);
    }
  }

  // Generate smart schedule
  async function handleGenerate() {
    try {
      setGenerating(true);

      // Validate: check if there's enough data
      const hasAvailability = Object.values(availability).some(v => v);
      const hasRequirements = Object.values(requirements).some(v => v > 0);

      if (!hasAvailability) {
        toast.warning('Vui lòng đánh dấu ít nhất một ca rảnh cho nhân viên');
        return;
      }

      if (!hasRequirements) {
        toast.warning('Vui lòng nhập số lượng nhân viên cần thiết cho ít nhất một ca');
        return;
      }

      // Prepare data for algorithm
      const shiftsData = [];
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        for (const shift of shifts) {
          const reqKey = `${dayIndex}_${shift.id}`;
          const required = requirements[reqKey] || 0;

          if (required > 0) {
            shiftsData.push({
              date: weekDates[dayIndex],
              shiftTemplateId: shift.id,
              shiftName: shift.name,
              startTime: shift.start_time,
              endTime: shift.end_time,
              duration: calculateShiftDuration(shift.start_time, shift.end_time),
              required,
              dayOfWeek: dayIndex === 6 ? 0 : dayIndex + 1, // Convert to 0=Sunday
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
            const key = `${s.id}_${dayIndex}_${shift.id}`;
            availabilityMatrix[s.id][date][shift.id] = availability[key] || false;
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
      console.error('Error generating schedule:', error);
      toast.error('Lỗi khi tạo lịch tự động');
    } finally {
      setGenerating(false);
    }
  }

  // Get availability for a cell
  function isAvailable(staffId: string, dayIndex: number, shiftId: string): boolean {
    const key = `${staffId}_${dayIndex}_${shiftId}`;
    return availability[key] || false;
  }

  // Get requirement for a cell
  function getRequirement(dayIndex: number, shiftId: string): number {
    const key = `${dayIndex}_${shiftId}`;
    return requirements[key] || 0;
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
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Lịch Thông Minh</h1>
            <p className="text-sm text-gray-600 mt-1">
              Đánh dấu ca rảnh và số lượng nhân viên cần thiết, sau đó nhấn "Tạo Lịch"
            </p>
          </div>
          <button
            onClick={goToToday}
            className="text-sm text-blue-600 hover:text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-50 transition-all"
          >
            Tuần Này
          </button>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="text-center">
            <div className="text-sm font-semibold text-gray-700">
              {(() => {
                const formatDayMonth = (date: string) => {
                  const d = new Date(date);
                  const day = d.getDate().toString().padStart(2, '0');
                  const month = (d.getMonth() + 1).toString().padStart(2, '0');
                  return `${day}/${month}`;
                };
                return `${formatDayMonth(weekDates[0])} - ${formatDayMonth(weekDates[6])}`;
              })()}
            </div>
          </div>
          <button
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {saving ? 'Đang Lưu...' : 'Lưu Thay Đổi'}
          </button>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-all disabled:opacity-50"
          >
            {generating ? 'Đang Tạo...' : '🤖 Tạo Lịch Tự Động'}
          </button>
        </div>
      </div>

      {/* No data state */}
      {staff.length === 0 || shifts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          <p className="text-lg text-gray-600 mb-2">
            {staff.length === 0 ? 'Chưa có nhân viên' : 'Chưa có ca làm việc'}
          </p>
          <p className="text-sm text-gray-500">
            Vui lòng thêm {staff.length === 0 ? 'nhân viên' : 'ca làm việc'} trước
          </p>
        </div>
      ) : (
        <>
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex gap-3">
              <div className="text-blue-600 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm text-gray-700">
                <div className="font-semibold mb-1">Hướng dẫn:</div>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Nhấp vào ô để đánh dấu nhân viên có thể làm ca đó (màu xanh = rảnh)</li>
                  <li>Nhập số lượng nhân viên cần thiết cho mỗi ca ở hàng đầu tiên</li>
                  <li>Nhấn "Lưu Thay Đổi" để lưu lại</li>
                  <li>Nhấn "Tạo Lịch Tự Động" để hệ thống tự động xếp lịch công bằng</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Availability Grid */}
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left p-3 text-gray-700 font-bold text-sm border-r border-gray-200 sticky left-0 bg-white z-20">
                    Nhân Viên / Ca
                  </th>
                  {shifts.map((shift) => (
                    <th
                      key={shift.id}
                      colSpan={7}
                      className="p-2 text-center border-r border-gray-200 last:border-r-0"
                    >
                      <div
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg"
                        style={{ backgroundColor: shift.color + '20', border: `2px solid ${shift.color}` }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: shift.color }}
                        />
                        <div>
                          <div className="font-bold text-gray-800 text-sm">{shift.name}</div>
                          <div className="text-xs text-gray-600">
                            {shift.start_time.substring(0, 5)} - {shift.end_time.substring(0, 5)}
                          </div>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left p-3 text-gray-700 font-bold text-xs border-r border-gray-200 sticky left-0 bg-gray-50 z-20">
                    Yêu Cầu
                  </th>
                  {shifts.map((shift) => (
                    weekDates.map((date, dayIndex) => (
                      <th key={`${shift.id}_${dayIndex}`} className="p-1 border-r border-gray-200">
                        <input
                          type="number"
                          min="0"
                          max="10"
                          value={getRequirement(dayIndex, shift.id)}
                          onChange={(e) => updateRequirement(dayIndex, shift.id, parseInt(e.target.value) || 0)}
                          className="w-12 h-8 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="0"
                        />
                      </th>
                    ))
                  ))}
                </tr>
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <th className="text-left p-3 text-gray-600 font-semibold text-xs border-r border-gray-200 sticky left-0 bg-gray-50 z-20">
                    Ngày
                  </th>
                  {shifts.map((shift) => (
                    weekDates.map((date, dayIndex) => (
                      <th key={`${shift.id}_day_${dayIndex}`} className="p-2 text-center text-xs font-semibold text-gray-600 border-r border-gray-200">
                        {dayNames[dayIndex]}
                      </th>
                    ))
                  ))}
                </tr>
              </thead>
              <tbody>
                {staff.map((staffMember, staffIndex) => (
                  <tr
                    key={staffMember.id}
                    className={`border-b border-gray-200 last:border-b-0 ${
                      staffIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="p-3 border-r border-gray-200 sticky left-0 bg-white z-10">
                      <div className="font-semibold text-gray-800 text-sm">
                        {staffMember.name || staffMember.full_name}
                      </div>
                    </td>
                    {shifts.map((shift) => (
                      weekDates.map((date, dayIndex) => {
                        const available = isAvailable(staffMember.id, dayIndex, shift.id);
                        return (
                          <td
                            key={`${staffMember.id}_${shift.id}_${dayIndex}`}
                            className="p-1 border-r border-gray-200 cursor-pointer hover:bg-gray-100"
                            onClick={() => toggleAvailability(staffMember.id, dayIndex, shift.id)}
                          >
                            <div
                              className={`w-full h-10 rounded flex items-center justify-center transition-all ${
                                available
                                  ? 'bg-green-500 hover:bg-green-600'
                                  : 'bg-gray-200 hover:bg-gray-300'
                              }`}
                            >
                              {available && (
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          </td>
                        );
                      })
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
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
