'use client';

import Link from 'next/link';

export default function MarketingHeader() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="font-bold text-xl text-gray-900">DiemDanh.net</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Bảng Giá
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Giới Thiệu
            </Link>
            <Link href="/help" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Trợ Giúp
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <a
              href={`${appUrl}/auth/login`}
              className="hidden sm:inline-flex px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Đăng Nhập
            </a>
            <a
              href={`${appUrl}/auth/signup`}
              className="inline-flex px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Dùng Thử Miễn Phí
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-gray-600 hover:text-blue-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
