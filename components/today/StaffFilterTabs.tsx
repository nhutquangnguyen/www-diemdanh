import { Staff, CheckIn, StaffFilter } from '@/types';

interface StaffFilterTabsProps {
  staffFilter: StaffFilter;
  staffCount: number;
  currentlyWorkingCount: number;
  lateCount: number;
  notCheckedInCount: number;
  setStaffFilter: (filter: StaffFilter) => void;
}

export default function StaffFilterTabs({
  staffFilter,
  staffCount,
  currentlyWorkingCount,
  lateCount,
  notCheckedInCount,
  setStaffFilter,
}: StaffFilterTabsProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <button
        onClick={() => setStaffFilter('all')}
        className={`px-3 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all min-h-[64px] ${
          staffFilter === 'all'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <div className="text-sm sm:text-base">Tất cả</div>
        <div className={`text-xs mt-0.5 ${staffFilter === 'all' ? 'text-blue-100' : 'text-gray-500'}`}>
          ({staffCount})
        </div>
      </button>
      <button
        onClick={() => setStaffFilter('working')}
        className={`px-3 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all min-h-[64px] ${
          staffFilter === 'working'
            ? 'bg-green-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <div className="text-sm sm:text-base">Đang làm</div>
        <div className={`text-xs mt-0.5 ${staffFilter === 'working' ? 'text-green-100' : 'text-gray-500'}`}>
          ({currentlyWorkingCount})
        </div>
      </button>
      <button
        onClick={() => setStaffFilter('late')}
        className={`px-3 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all min-h-[64px] ${
          staffFilter === 'late'
            ? 'bg-yellow-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <div className="text-sm sm:text-base">Muộn</div>
        <div className={`text-xs mt-0.5 ${staffFilter === 'late' ? 'text-yellow-100' : 'text-gray-500'}`}>
          ({lateCount})
        </div>
      </button>
      <button
        onClick={() => setStaffFilter('not_checked')}
        className={`px-3 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all min-h-[64px] ${
          staffFilter === 'not_checked'
            ? 'bg-orange-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        <div className="text-sm sm:text-base">Chưa check</div>
        <div className={`text-xs mt-0.5 ${staffFilter === 'not_checked' ? 'text-orange-100' : 'text-gray-500'}`}>
          ({notCheckedInCount})
        </div>
      </button>
    </div>
  );
}
