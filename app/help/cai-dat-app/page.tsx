'use client';

import { useState } from 'react';
import HelpLayout from '@/components/HelpLayout';
import Link from 'next/link';

export default function CaiDatAppPage() {
  const [activeTab, setActiveTab] = useState<'ios' | 'android' | 'desktop'>('ios');

  return (
    <HelpLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="text-6xl mb-4">📱</div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Cài Đặt Ứng Dụng DiemDanh
            </h1>
            <p className="text-xl text-blue-100">
              Biến website thành app chỉ trong 30 giây!
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-blue-100">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>2 phút đọc</span>
            </div>
          </div>
        </div>
      </div>

      {/* What is PWA */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-12 mb-12">
          <div className="flex items-start gap-4 mb-6">
            <div className="text-4xl">🤔</div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">PWA Là Gì?</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>PWA (Progressive Web App)</strong> là ứng dụng web có thể cài đặt vào điện thoại
                như app thật, nhưng <span className="bg-yellow-200 px-1 rounded">không cần tải từ App Store hay Google Play</span>.
              </p>
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-900 mb-2">Siêu Nhanh</h3>
              <p className="text-sm text-gray-600">Mở nhanh như app native</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">💾</div>
              <h3 className="font-bold text-gray-900 mb-2">Siêu Nhẹ</h3>
              <p className="text-sm text-gray-600">Chỉ ~5MB, không chiếm dung lượng</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🔄</div>
              <h3 className="font-bold text-gray-900 mb-2">Tự Động</h3>
              <p className="text-sm text-gray-600">Cập nhật tự động, không cần làm gì</p>
            </div>
          </div>
        </div>

        {/* Device Tabs */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Chọn Thiết Bị Của Bạn</h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <button
              onClick={() => setActiveTab('ios')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'ios'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <div className="text-3xl mb-1">🍎</div>
              iPhone / iPad
            </button>
            <button
              onClick={() => setActiveTab('android')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'android'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <div className="text-3xl mb-1">🤖</div>
              Android
            </button>
            <button
              onClick={() => setActiveTab('desktop')}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                activeTab === 'desktop'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              <div className="text-3xl mb-1">💻</div>
              Máy Tính
            </button>
          </div>
        </div>

        {/* iOS Instructions */}
        {activeTab === 'ios' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-4xl">🍎</span>
              Cài Đặt Trên iPhone / iPad
            </h2>

            {/* Step 1 */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Mở Safari</h3>
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-4">
                    <p className="text-gray-700">
                      ⚠️ <strong>Quan trọng:</strong> Phải dùng Safari, không dùng Chrome!
                    </p>
                  </div>
                  <ol className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      Mở trình duyệt <strong className="bg-yellow-100 px-1 rounded">Safari</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      Truy cập: <code className="bg-gray-100 px-3 py-1 rounded text-blue-700 font-mono">diemdanh.net</code>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      Đăng nhập tài khoản
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Thêm Vào Màn Hình Chính</h3>
                  <ol className="space-y-3 text-lg text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      Nhấn nút <strong className="bg-blue-100 px-2 py-1 rounded">Chia sẻ ⬆️</strong> ở thanh dưới
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      Kéo xuống và chọn <strong className="bg-yellow-100 px-1 rounded">"Thêm vào Màn Hình Chính"</strong>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      Đặt tên: "DiemDanh"
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">→</span>
                      Nhấn <strong className="bg-green-100 px-2 py-1 rounded">Thêm</strong>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  ✓
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Hoàn Tất!</h3>
                  <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                    <p className="text-lg text-gray-700 mb-2">
                      <strong className="text-green-700">🎉 Xong rồi!</strong> Bây giờ bạn có icon DiemDanh trên màn hình chính.
                    </p>
                    <p className="text-gray-600">
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
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-4xl">🤖</span>
              Cài Đặt Trên Android
            </h2>

            {/* Method 1 */}
            <div className="mb-8 pb-8 border-b border-gray-200">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🥇</span>
                  <h3 className="text-xl font-bold text-green-700">Cách 1: Tự Động (Khuyến nghị)</h3>
                </div>
                <p className="text-gray-700">Chrome sẽ tự động hiện popup cài đặt!</p>
              </div>

              <ol className="space-y-4 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                  <div>
                    Mở <strong className="bg-yellow-100 px-1 rounded">Chrome</strong> trên điện thoại
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                  <div>
                    Truy cập: <code className="bg-gray-100 px-3 py-1 rounded text-blue-700 font-mono">diemdanh.net</code>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                  <div>
                    Popup xuất hiện: <strong className="bg-blue-100 px-2 py-1 rounded">"Cài đặt DiemDanh?"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                  <div>
                    Nhấn <strong className="bg-green-100 px-2 py-1 rounded">Cài đặt</strong>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg flex-1">
                    <strong className="text-green-700">Xong!</strong> Icon tự động xuất hiện trên màn hình chính 🎉
                  </div>
                </li>
              </ol>
            </div>

            {/* Method 2 */}
            <div className="mb-8">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔧</span>
                  <h3 className="text-xl font-bold text-gray-700">Cách 2: Thủ Công</h3>
                </div>
                <p className="text-gray-600">Nếu không thấy popup tự động</p>
              </div>

              <ol className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  Nhấn menu <strong className="bg-gray-100 px-2 py-1 rounded font-mono">⋮</strong> ở góc trên
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  Chọn <strong className="bg-yellow-100 px-1 rounded">"Thêm vào màn hình chính"</strong>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">→</span>
                  Nhấn <strong className="bg-green-100 px-2 py-1 rounded">Thêm</strong>
                </li>
              </ol>
            </div>
          </div>
        )}

        {/* Desktop Instructions */}
        {activeTab === 'desktop' && (
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 animate-fadeIn">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <span className="text-4xl">💻</span>
              Cài Đặt Trên Máy Tính
            </h2>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 mb-8">
              <p className="text-lg text-gray-700">
                <strong className="text-purple-700">Chỉ hỗ trợ Chrome!</strong> Safari trên Mac không hỗ trợ PWA.
              </p>
            </div>

            <ol className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                <div className="flex-1">
                  <strong className="text-xl text-gray-900">Mở Chrome</strong>
                  <p className="text-gray-600 mt-1">Truy cập: <code className="bg-gray-100 px-3 py-1 rounded text-blue-700 font-mono">diemdanh.net</code></p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                <div className="flex-1">
                  <strong className="text-xl text-gray-900">Nhấn Icon Cài Đặt</strong>
                  <p className="text-gray-600 mt-1">Biểu tượng <strong className="bg-blue-100 px-2 py-1 rounded">⊕</strong> trên thanh địa chỉ</p>
                  <p className="text-sm text-gray-500 mt-2">Hoặc: Menu → "Cài đặt DiemDanh"</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                <div className="flex-1">
                  <strong className="text-xl text-gray-900">Xác Nhận</strong>
                  <p className="text-gray-600 mt-1">Nhấn <strong className="bg-green-100 px-2 py-1 rounded">Cài đặt</strong></p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">✓</span>
                <div className="flex-1 bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                  <strong className="text-green-700 text-xl">Hoàn thành!</strong>
                  <p className="text-gray-700 mt-2">App mở trong cửa sổ riêng, không có thanh địa chỉ 🚀</p>
                </div>
              </li>
            </ol>
          </div>
        )}

        {/* Comparison Table */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
            <span className="text-4xl">⚡</span>
            So Sánh: PWA vs App Native
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <th className="px-6 py-4 text-left font-bold text-lg rounded-tl-xl">Tính Năng</th>
                  <th className="px-6 py-4 text-center font-bold text-lg">PWA 🌐</th>
                  <th className="px-6 py-4 text-center font-bold text-lg rounded-tr-xl">App Native 📱</th>
                </tr>
              </thead>
              <tbody className="text-lg">
                <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold">Cài đặt</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      ✅ Không cần store
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold">
                      ❌ Cần store
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold">Dung lượng</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      ✅ ~5MB
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">
                      ⚠️ 20-50MB
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold">Cập nhật</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      ✅ Tự động
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold">
                      ⚠️ Thủ công
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 font-semibold">Tốc độ</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      ✅ Nhanh
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold">
                      ✅ Rất nhanh
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
            <div className="flex items-start gap-3">
              <span className="text-3xl">🎯</span>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-2">Kết Luận</h3>
                <p className="text-lg text-gray-700 mb-3">
                  <strong className="bg-yellow-100 px-1 rounded">PWA là lựa chọn tối ưu</strong> cho DiemDanh vì:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Nhẹ và nhanh
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Không cần cài đặt phức tạp
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Tự động cập nhật
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Hoạt động trên mọi thiết bị
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Bạn Đã Sẵn Sàng?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Cài đặt ngay và trải nghiệm DiemDanh như một ứng dụng thực thụ!
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:scale-105"
            >
              Bắt Đầu Ngay →
            </Link>
            <Link
              href="/help"
              className="inline-block bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all shadow-lg"
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
