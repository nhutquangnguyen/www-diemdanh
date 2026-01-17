'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import type { ShiftTemplate } from '@/types';

interface ScheduleData {
  staff: Array<{ id: string; display_name: string }>;
  shifts: ShiftTemplate[];
  assignments: any;
  stats: any;
  warnings: any[];
  weekStart: string;
}

export default function SharedSchedulePage() {
  const params = useParams();
  const shareId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
  const [viewCount, setViewCount] = useState(0);
  const [expiresAt, setExpiresAt] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function fetchSchedule() {
      try {
        const response = await fetch(`/api/share/${shareId}`);

        if (!response.ok) {
          if (response.status === 404) {
            setError('Không tìm thấy lịch này. Link có thể đã hết hạn hoặc không tồn tại.');
          } else if (response.status === 410) {
            setError('Link này đã hết hạn (quá 14 ngày).');
          } else {
            setError('Có lỗi khi tải lịch. Vui lòng thử lại.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setScheduleData(data.scheduleData);
        setViewCount(data.viewCount);
        setExpiresAt(data.expiresAt);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching schedule:', error);
        setError('Có lỗi khi tải lịch. Vui lòng thử lại.');
        setLoading(false);
      }
    }

    if (shareId) {
      fetchSchedule();
    }
  }, [shareId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-blue-600 leading-tight">diemdanh.net</span>
                  <span className="text-xs text-gray-500 leading-tight">Chấm công thông minh</span>
                </div>
              </a>
            </div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <div className="text-lg text-gray-600">Đang tải lịch làm việc...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scheduleData) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <a href="/" className="flex items-center gap-3 group">
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-blue-600 leading-tight">diemdanh.net</span>
                  <span className="text-xs text-gray-500 leading-tight">Chấm công thông minh</span>
                </div>
              </a>
            </div>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
            <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Không tìm thấy lịch</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <a
              href="/tools/xep-lich-mien-phi"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Tạo lịch của bạn
            </a>
          </div>
        </div>
      </div>
    );
  }

  const { staff, shifts, assignments, stats, warnings, weekStart } = scheduleData;

  // Generate week dates
  const getWeekDates = (weekStartDate: string): string[] => {
    const dates: string[] = [];
    const start = new Date(weekStartDate + 'T00:00:00');

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
    }

    return dates;
  };

  const weekDates = getWeekDates(weekStart);
  const dayNames = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

  const getDaysUntilExpiration = (expiresAtStr: string): number => {
    const expires = new Date(expiresAtStr);
    const now = new Date();
    const diff = expires.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-blue-600 leading-tight">diemdanh.net</span>
                <span className="text-xs text-gray-500 leading-tight">Chấm công thông minh</span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              <a href="/pricing" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                Bảng Giá
              </a>
              <a href="/tools/xep-lich-mien-phi" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium flex items-center gap-1">
                <span>Xếp lịch AI</span>
                <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full font-semibold">NEW</span>
              </a>
              <a href="/help" className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all font-medium">
                Trợ Giúp
              </a>
            </nav>

            {/* Auth Button - Desktop */}
            <div className="hidden md:flex items-center">
              <a
                href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/login`}
                className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all"
              >
                Đăng Nhập
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100 bg-white/95 backdrop-blur-sm">
              <nav className="flex flex-col space-y-1">
                <a
                  href="/pricing"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Bảng Giá
                </a>
                <a
                  href="/tools/xep-lich-mien-phi"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>Xếp lịch AI</span>
                  <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full font-semibold">NEW</span>
                </a>
                <a
                  href="/help"
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trợ Giúp
                </a>
                <div className="pt-4 mt-2 border-t border-gray-100">
                  <a
                    href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth/login`}
                    className="block text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Đăng Nhập
                  </a>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Schedule Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-3">Lịch Làm Việc</h1>
            <p className="text-xl text-blue-100">Tuần {new Date(weekStart).getDate()}/{new Date(weekStart).getMonth() + 1} - {new Date(weekDates[6]).getDate()}/{new Date(weekDates[6]).getMonth() + 1}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Shift Legend */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Chú Thích Ca Làm Việc:</h3>
            <div className="flex flex-wrap gap-4 items-center">
              {shifts.map((shift) => (
                <div key={shift.id} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: shift.color }}
                  ></div>
                  <span className="text-sm text-gray-700">
                    <span className="font-medium">{shift.name}</span>
                    <span className="text-gray-500 ml-1">
                      ({shift.start_time.substring(0, 5)} - {shift.end_time.substring(0, 5)})
                    </span>
                  </span>
                </div>
              ))}
              <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-300">
                <span className="text-sm font-medium text-red-500">OFF</span>
                <span className="text-xs text-gray-500">Nghỉ</span>
              </div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
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
                  return (
                    <tr
                      key={date}
                      className={`border-b ${isToday ? 'bg-yellow-50' : dayIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                    >
                      <td className={`sticky left-0 z-10 p-3 border-r-2 border-gray-300 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] ${isToday ? 'bg-yellow-50' : dayIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="font-semibold text-gray-800 text-sm">{dayNames[dayIndex]}</div>
                        <div className="text-xs text-gray-500">
                          {new Date(date).getDate()}/{new Date(date).getMonth() + 1}
                        </div>
                      </td>
                      {staff.map((staffMember) => {
                        const shiftIds = assignments[staffMember.id]?.[date] || [];
                        const assignedShifts = shiftIds.map((id: string) => shifts.find(s => s.id === id)).filter(Boolean) as ShiftTemplate[];

                        return (
                          <td key={staffMember.id} className="p-2 border-l border-gray-200 text-center align-middle">
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

          {/* Humble CTA */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
            <p className="text-gray-600 mb-4">
              Bạn cũng muốn tạo lịch làm việc tự động cho đội ngũ của mình?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
              <a
                href="/tools/xep-lich-mien-phi"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                Tạo lịch miễn phí
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <span className="text-gray-400">hoặc</span>
              <a
                href="/auth/signup"
                className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
              >
                Đăng ký tài khoản
              </a>
            </div>
            <p className="text-sm text-gray-500">
              Được tạo bởi <a href="/" className="font-semibold text-gray-700 hover:text-blue-600">diemdanh.net</a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h3 className="font-bold text-lg mb-4">diemdanh.net</h3>
              <p className="text-gray-400 text-sm">
                Hệ thống điểm danh và quản lý lịch làm việc thông minh cho doanh nghiệp
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Liên Kết</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-gray-400 hover:text-white transition-colors">
                    Trang Chủ
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Bảng Giá
                  </a>
                </li>
                <li>
                  <a href="/tools/xep-lich-mien-phi" className="text-gray-400 hover:text-white transition-colors">
                    Xếp lịch AI
                  </a>
                </li>
                <li>
                  <a href="/help" className="text-gray-400 hover:text-white transition-colors">
                    Trợ Giúp
                  </a>
                </li>
              </ul>
            </div>

            {/* Help Center */}
            <div>
              <h3 className="font-bold text-lg mb-4">Trợ Giúp</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/help/bat-dau" className="text-gray-400 hover:text-white transition-colors">
                    Bắt Đầu
                  </a>
                </li>
                <li>
                  <a href="/help/diem-danh" className="text-gray-400 hover:text-white transition-colors">
                    Điểm Danh
                  </a>
                </li>
                <li>
                  <a href="/tools/xep-lich-mien-phi" className="text-gray-400 hover:text-white transition-colors">
                    Xếp lịch AI
                  </a>
                </li>
                <li>
                  <a href="/help/cai-dat-app" className="text-gray-400 hover:text-white transition-colors">
                    Cài Đặt App
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-bold text-lg mb-4">Liên Hệ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  office.obn@gmail.com
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© 2024 diemdanh.net. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
