'use client';

import { useState } from 'react';
import HelpLayout from '@/components/HelpLayout';
import Link from 'next/link';

export default function CaiDatAppPage() {
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'desktop'>('ios');

  return (
    <HelpLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">📱</div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              Cài Đặt Ứng Dụng DiemDanh
            </h1>
            <p className="text-base md:text-xl text-blue-100">
              Biến website thành app chỉ trong 30 giây!
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 md:mt-4 text-sm md:text-base text-blue-100">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>2 phút đọc</span>
            </div>
          </div>
        </div>
      </div>

      {/* What is PWA */}
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-4 md:p-8 lg:p-12 mb-8 md:mb-12">
          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="text-3xl md:text-4xl">🤔</div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4">PWA Là Gì?</h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed">
                <strong>PWA (Progressive Web App)</strong> là ứng dụng web có thể cài đặt vào điện thoại
                như app thật, nhưng <span className="bg-yellow-200 px-1 rounded">không cần tải từ App Store hay Google Play</span>.
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-8">
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Siêu Nhanh</h3>
              <p className="text-xs md:text-sm text-gray-600">Mở nhanh như app native</p>
            </div>
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">💾</div>
              <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Siêu Nhẹ</h3>
              <p className="text-xs md:text-sm text-gray-600">Chỉ ~5MB, không chiếm dung lượng</p>
            </div>
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <div className="text-2xl md:text-3xl mb-2 md:mb-3">🔄</div>
              <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Tự Động</h3>
              <p className="text-xs md:text-sm text-gray-600">Cập nhật tự động, không cần làm gì</p>
            </div>
          </div>
        </div>

        {/* Device Tabs */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">Chọn Thiết Bị Của Bạn</h2>
          <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
            <button
              onClick={() => setActiveTab('ios')}
              className={`px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg transition-all ${
                activeTab === 'ios'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <div className="text-2xl md:text-3xl mb-0.5 md:mb-1">🍎</div>
              <span className="text-xs md:text-base">iPhone / iPad</span>
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg transition-all ${
                activeTab === 'android'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <div className="text-2xl md:text-3xl mb-0.5 md:mb-1">🤖</div>
              <span className="text-xs md:text-base">Android</span>
            </button>
            <button
              onClick={() => setActiveTab('desktop')}
              className={`px-4 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-lg transition-all ${
                activeTab === 'desktop'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <div className="text-2xl md:text-3xl mb-0.5 md:mb-1">💻</div>
              <span className="text-xs md:text-base">Máy Tính</span>
            </button>
          </div>
        </div>

        {/* iOS Instructions */}
        {activeTab === 'ios' && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-12 animate-fadeIn">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl">🍎</span>
              Cài Đặt Trên iPhone / iPad
            </h2>

            {/* Step 1 */}
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold">
                  1
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Mở Safari</h3>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-3 md:p-4 rounded-r-lg mb-3 md:mb-4">
                    <p className="text-xs md:text-sm lg:text-base text-gray-700">
                      ⚠️ <strong>Quan trọng:</strong> Phải dùng Safari, không dùng Chrome!
                    </p>
                  </div>
                  <ol className="space-y-2 md:space-y-3 text-sm md:text-base lg:text-lg text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                      <span>Mở trình duyệt <strong className="bg-yellow-100 px-1 rounded">Safari</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                      <span className="break-all">Truy cập: <code className="bg-gray-100 px-2 md:px-3 py-1 rounded text-blue-700 font-mono text-xs md:text-sm">app.diemdanh.net</code></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                      <span>Đăng nhập tài khoản</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold">
                  2
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Thêm Vào Màn Hình Chính</h3>
                  <ol className="space-y-2 md:space-y-3 text-sm md:text-base lg:text-lg text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                      <span>Nhấn nút <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">Chia sẻ ⬆️</strong> ở thanh dưới</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                      <span>Kéo xuống và chọn <strong className="bg-yellow-100 px-1 rounded">"Thêm vào Màn Hình Chính"</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                      <span>Đặt tên: "DiemDanh"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                      <span>Nhấn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">Thêm</strong></span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-6 md:mb-8">
              <div className="flex items-start gap-3 md:gap-4">
                <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-lg md:text-xl font-bold">
                  ✓
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-3 md:mb-4">Hoàn Tất!</h3>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 md:p-6 rounded-r-lg">
                    <p className="text-sm md:text-base lg:text-lg text-gray-700 mb-2">
                      <strong className="text-green-700">🎉 Xong rồi!</strong> Bây giờ bạn có icon DiemDanh trên màn hình chính.
                    </p>
                    <p className="text-xs md:text-sm lg:text-base text-gray-600">
                      Nhấn vào icon để mở app như bình thường!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Android Instructions */}
        {activeTab === 'android' && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-12 animate-fadeIn">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl">🤖</span>
              Cài Đặt Trên Android
            </h2>

            {/* Method 1 */}
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">🥇</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-green-700">Cách 1: Tự Động (Khuyến nghị)</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-700">Chrome sẽ tự động hiện popup cài đặt!</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở <strong className="bg-yellow-100 px-1 rounded">Chrome</strong> trên điện thoại
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0 break-all">
                    Truy cập: <code className="bg-gray-100 px-2 md:px-3 py-1 rounded text-blue-700 font-mono text-xs md:text-sm">app.diemdanh.net</code>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Popup xuất hiện: <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Cài đặt DiemDanh?"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">4</span>
                  <div className="min-w-0">
                    Nhấn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">Cài đặt</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Xong!</strong> <span className="text-xs md:text-sm">Icon tự động xuất hiện trên màn hình chính 🎉</span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Method 2 */}
            <div className="mb-6 md:mb-8">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">🔧</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-700">Cách 2: Thủ Công</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">Nếu không thấy popup tự động</p>
              </div>

              <ol className="space-y-2 md:space-y-3 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                  <span className="min-w-0">Nhấn menu <strong className="bg-gray-100 px-2 py-1 rounded font-mono text-sm md:text-base">⋮</strong> ở góc trên</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                  <span className="min-w-0">Chọn <strong className="bg-yellow-100 px-1 rounded">"Thêm vào màn hình chính"</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold flex-shrink-0">→</span>
                  <span className="min-w-0">Nhấn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">Thêm</strong></span>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Desktop Instructions */}
        {activeTab === 'desktop' && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-12 animate-fadeIn">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl">💻</span>
              Cài Đặt Trên Máy Tính
            </h2>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-6 md:mb-8">
              <p className="text-sm md:text-base lg:text-lg text-gray-700">
                <strong className="text-purple-700">Chỉ hỗ trợ Chrome!</strong> Safari trên Mac không hỗ trợ PWA.
              </p>
            </div>

            <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
              <li className="flex items-start gap-2 md:gap-3">
                <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                <div className="flex-1 min-w-0">
                  <strong className="text-lg md:text-xl text-gray-900">Mở Chrome</strong>
                  <p className="text-gray-600 mt-1 break-all">Truy cập: <code className="bg-gray-100 px-2 md:px-3 py-1 rounded text-blue-700 font-mono text-xs md:text-sm">app.diemdanh.net</code></p>
                </div>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                <div className="flex-1 min-w-0">
                  <strong className="text-lg md:text-xl text-gray-900">Nhấn Icon Cài Đặt</strong>
                  <p className="text-gray-600 mt-1">Biểu tượng <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">⊕</strong> trên thanh địa chỉ</p>
                  <p className="text-xs md:text-sm text-gray-500 mt-2">Hoặc: Menu → "Cài đặt DiemDanh"</p>
                </div>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                <div className="flex-1 min-w-0">
                  <strong className="text-lg md:text-xl text-gray-900">Xác Nhận</strong>
                  <p className="text-gray-600 mt-1">Nhấn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">Cài đặt</strong></p>
                </div>
              </li>
              <li className="flex items-start gap-2 md:gap-3">
                <span className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-lg md:text-xl">✓</span>
                <div className="flex-1 bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg min-w-0">
                  <strong className="text-green-700 text-base md:text-lg lg:text-xl">Hoàn thành!</strong>
                  <p className="text-gray-700 mt-1 md:mt-2 text-xs md:text-sm lg:text-base">App mở trong cửa sổ riêng, không có thanh địa chỉ 🚀</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-8 md:mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 text-center text-white">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Bạn Đã Sẵn Sàng?</h2>
          <p className="text-sm md:text-base lg:text-xl text-blue-100 mb-6 md:mb-8">
            Cài đặt ngay và trải nghiệm DiemDanh như một ứng dụng thực thụ!
          </p>
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg hover:bg-blue-50 transition-all shadow-lg hover:scale-105"
            >
              Bắt Đầu Ngay →
            </Link>
            <Link
              href="/help"
              className="inline-block bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg hover:bg-blue-800 transition-all shadow-lg"
            >
              ← Quay Lại Trợ Giúp
            </Link>
          </div>
        </div>
      </div>

      {/* Add fadeIn animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </HelpLayout>
  );
}
