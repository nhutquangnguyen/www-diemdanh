interface StaffSearchBoxProps {
  staffSearch: string;
  setStaffSearch: (search: string) => void;
}

export default function StaffSearchBox({ staffSearch, setStaffSearch }: StaffSearchBoxProps) {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Tìm tên..."
        value={staffSearch}
        onChange={(e) => setStaffSearch(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
      />
    </div>
  );
}
