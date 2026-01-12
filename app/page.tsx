'use client';

import Link from 'next/link';
import MarketingHeader from '@/components/MarketingHeader';
import FeatureContent from '@/components/FeatureContent';

export default function Home() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return (
    <div className="min-h-screen">
      <MarketingHeader />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10"></div>
        <div className="relative container mx-auto px-4 py-20 sm:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
              Hệ Thống Điểm Danh Thông Minh
              <br />
              <span className="text-blue-200">Cho Doanh Nghiệp</span>
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Quản lý nhân viên, lịch làm việc và điểm danh GPS chính xác.
              Tiết kiệm thời gian, tăng hiệu quả với AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`${appUrl}/auth/signup`}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
              >
                Dùng Thử Miễn Phí 14 Ngày
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <Link
                href="/help"
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
              >
                Xem Hướng Dẫn
              </Link>
            </div>
            <p className="mt-6 text-sm text-blue-200">
              ✓ Không cần thẻ tín dụng  ✓ Cài đặt trong 5 phút  ✓ Hỗ trợ 24/7
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <FeatureContent />

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Doanh nghiệp tin dùng</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Độ chính xác GPS</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <div className="text-gray-600">Hỗ trợ khách hàng</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tham gia hàng ngàn doanh nghiệp đang sử dụng DiemDanh để quản lý nhân viên hiệu quả
          </p>
          <a
            href={`${appUrl}/auth/signup`}
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
          >
            Bắt Đầu Ngay - Miễn Phí
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">DiemDanh.net</h3>
              <p className="text-gray-400 text-sm">
                Hệ thống điểm danh và quản lý lịch làm việc thông minh cho doanh nghiệp
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Sản Phẩm</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/pricing" className="text-gray-400 hover:text-white">Bảng Giá</Link></li>
                <li><Link href="/help" className="text-gray-400 hover:text-white">Trợ Giúp</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Công Ty</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-gray-400 hover:text-white">Giới Thiệu</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Liên Hệ</h3>
              <p className="text-gray-400 text-sm">support@diemdanh.net</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} DiemDanh.net. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
