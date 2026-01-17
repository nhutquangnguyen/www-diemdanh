'use client';

import { useState } from 'react';
import HelpLayout from '@/components/HelpLayout';
import Link from 'next/link';

export default function CapQuyenPage() {
  const [activeTab, setActiveTab] = useState<'ios' | 'android'>('ios');
  const [activePermission, setActivePermission] = useState<'location' | 'camera'>('location');

  return (
    <HelpLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-8 md:py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center">
            <div className="text-4xl md:text-6xl mb-3 md:mb-4">🔐</div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
              Cấp Quyền Truy Cập
            </h1>
            <p className="text-base md:text-xl text-green-100">
              Hướng dẫn cấp quyền Vị Trí và Camera cho DiemDanh
            </p>
            <div className="flex items-center justify-center gap-2 mt-3 md:mt-4 text-sm md:text-base text-green-100">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>3 phút đọc</span>
            </div>
          </div>
        </div>
      </div>

      {/* Why Permissions Needed */}
      <div className="container mx-auto px-4 py-6 md:py-12 max-w-6xl">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl md:rounded-2xl p-4 md:p-8 lg:p-12 mb-8 md:mb-12">
          <div className="flex items-start gap-3 md:gap-4 mb-4 md:mb-6">
            <div className="text-3xl md:text-4xl">❓</div>
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 md:mb-4">Tại Sao Cần Cấp Quyền?</h2>
              <p className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed mb-4">
                DiemDanh cần quyền truy cập để hoạt động tốt nhất:
              </p>
            </div>
          </div>

          {/* Permissions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <div className="flex items-start gap-3">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">📍</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Vị Trí (GPS)</h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Xác định vị trí khi điểm danh, đảm bảo nhân viên có mặt đúng địa điểm làm việc
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <div className="flex items-start gap-3">
                <div className="text-2xl md:text-3xl mb-2 md:mb-3">📸</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1 md:mb-2 text-sm md:text-base">Camera</h3>
                  <p className="text-xs md:text-sm text-gray-600">
                    Chụp ảnh khuôn mặt khi điểm danh, quét mã QR để check-in nhanh chóng
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg mt-4 md:mt-6">
            <p className="text-xs md:text-sm lg:text-base text-gray-700">
              <strong className="text-green-700">🔒 Bảo Mật:</strong> Chúng tôi chỉ sử dụng quyền khi bạn điểm danh và cam kết bảo mật thông tin của bạn.
            </p>
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
          </div>
        </div>

        {/* Permission Type Tabs */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-2 md:gap-4 justify-center flex-wrap">
            <button
              onClick={() => setActivePermission('location')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all ${
                activePermission === 'location'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              📍 Vị Trí
            </button>
            <button
              onClick={() => setActivePermission('camera')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-sm md:text-base transition-all ${
                activePermission === 'camera'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              📸 Camera
            </button>
          </div>
        </div>

        {/* iOS Location Instructions */}
        {activeTab === 'ios' && activePermission === 'location' && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-12 animate-fadeIn">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl">🍎📍</span>
              Cấp Quyền Vị Trí Trên iOS
            </h2>

            {/* Method 1: During First Use */}
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">⚡</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-blue-700">Cách 1: Khi Mở App Lần Đầu</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-700">Cách dễ nhất - App tự động hỏi!</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở app DiemDanh lần đầu tiên
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0">
                    Popup xuất hiện: <strong className="bg-yellow-100 px-1 rounded">"DiemDanh muốn truy cập vị trí của bạn"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Chọn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Cho phép khi đang dùng App"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Xong!</strong> <span className="text-xs md:text-sm">App đã có quyền truy cập vị trí 🎉</span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Method 2: Settings */}
            <div className="mb-6 md:mb-8">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">⚙️</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-700">Cách 2: Từ Cài Đặt iPhone</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">Nếu đã từ chối trước đó hoặc muốn thay đổi</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở <strong className="bg-gray-100 px-2 py-1 rounded">Cài Đặt</strong> (Settings)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0">
                    Kéo xuống và tìm <strong className="bg-yellow-100 px-1 rounded">"DiemDanh"</strong> trong danh sách app
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Nhấn vào <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Vị Trí"</strong> (Location)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">4</span>
                  <div className="min-w-0">
                    Chọn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Khi đang dùng App"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">5</span>
                  <div className="min-w-0">
                    Bật <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Vị trí chính xác"</strong> (Precise Location)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Hoàn tất!</strong> <span className="text-xs md:text-sm">Quay lại app và thử điểm danh</span>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 md:p-6 rounded-r-lg">
              <p className="text-xs md:text-sm lg:text-base text-gray-700">
                <strong className="text-blue-700">💡 Mẹo:</strong> Để điểm danh chính xác nhất, hãy bật "Vị trí chính xác" và đảm bảo GPS đang bật trên iPhone.
              </p>
            </div>
          </div>
        )}

        {/* iOS Camera Instructions */}
        {activeTab === 'ios' && activePermission === 'camera' && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-12 animate-fadeIn">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl">🍎📸</span>
              Cấp Quyền Camera Trên iOS
            </h2>

            {/* Method 1: During First Use */}
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">⚡</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-purple-700">Cách 1: Khi Chụp Ảnh Lần Đầu</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-700">App tự động hỏi khi bạn nhấn nút chụp ảnh!</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở app DiemDanh và nhấn nút <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">Điểm Danh</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0">
                    Nhấn nút <strong className="bg-yellow-100 px-1 rounded">Chụp Ảnh</strong> hoặc <strong className="bg-yellow-100 px-1 rounded">Quét QR</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Popup xuất hiện: <strong className="bg-yellow-100 px-1 rounded">"DiemDanh muốn truy cập Camera"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">4</span>
                  <div className="min-w-0">
                    Nhấn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"OK"</strong> hoặc <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Cho phép"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Xong!</strong> <span className="text-xs md:text-sm">Camera đã sẵn sàng để chụp 📸</span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Method 2: Settings */}
            <div className="mb-6 md:mb-8">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">⚙️</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-700">Cách 2: Từ Cài Đặt iPhone</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">Nếu đã từ chối hoặc camera không hoạt động</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở <strong className="bg-gray-100 px-2 py-1 rounded">Cài Đặt</strong> (Settings)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0">
                    Kéo xuống và nhấn vào <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"DiemDanh"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Tìm và nhấn <strong className="bg-yellow-100 px-1 rounded">"Camera"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">4</span>
                  <div className="min-w-0">
                    Bật công tắc để <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">Cho phép</strong> truy cập Camera
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Hoàn tất!</strong> <span className="text-xs md:text-sm">Quay lại app và thử chụp ảnh</span>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 md:p-6 rounded-r-lg">
              <p className="text-xs md:text-sm lg:text-base text-gray-700">
                <strong className="text-purple-700">💡 Lưu ý:</strong> Nếu camera vẫn không hoạt động, hãy thử tắt app hoàn toàn và mở lại.
              </p>
            </div>
          </div>
        )}

        {/* Android Location Instructions */}
        {activeTab === 'android' && activePermission === 'location' && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-12 animate-fadeIn">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl">🤖📍</span>
              Cấp Quyền Vị Trí Trên Android
            </h2>

            {/* Method 1: During First Use */}
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">⚡</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-green-700">Cách 1: Khi Mở App Lần Đầu</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-700">App tự động hỏi quyền!</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở app DiemDanh lần đầu tiên
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0">
                    Popup xuất hiện: <strong className="bg-yellow-100 px-1 rounded">"Cho phép DiemDanh truy cập vị trí thiết bị này?"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Chọn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Cho phép khi sử dụng ứng dụng"</strong> hoặc <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Chỉ lần này"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Xong!</strong> <span className="text-xs md:text-sm">App đã có quyền truy cập vị trí 🎉</span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Method 2: Settings */}
            <div className="mb-6 md:mb-8">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">⚙️</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-700">Cách 2: Từ Cài Đặt Android</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">Nếu đã từ chối hoặc muốn thay đổi</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở <strong className="bg-gray-100 px-2 py-1 rounded">Cài Đặt</strong> (Settings)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0">
                    Nhấn vào <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Ứng dụng"</strong> hoặc <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Apps"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Tìm và chọn <strong className="bg-yellow-100 px-1 rounded">"DiemDanh"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">4</span>
                  <div className="min-w-0">
                    Nhấn <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Quyền"</strong> (Permissions)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">5</span>
                  <div className="min-w-0">
                    Chọn <strong className="bg-yellow-100 px-1 rounded">"Vị trí"</strong> (Location)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">6</span>
                  <div className="min-w-0">
                    Chọn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Cho phép khi sử dụng ứng dụng"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Hoàn tất!</strong> <span className="text-xs md:text-sm">Quay lại app và thử điểm danh</span>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 md:p-6 rounded-r-lg">
              <p className="text-xs md:text-sm lg:text-base text-gray-700 mb-2">
                <strong className="text-green-700">💡 Khuyến nghị:</strong> Chọn "Cho phép khi sử dụng ứng dụng" thay vì "Chỉ lần này" để không phải cấp quyền mỗi lần điểm danh.
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                Đảm bảo GPS/Location đã bật trong thanh thông báo nhanh của Android.
              </p>
            </div>
          </div>
        )}

        {/* Android Camera Instructions */}
        {activeTab === 'android' && activePermission === 'camera' && (
          <div className="bg-white rounded-xl md:rounded-2xl shadow-xl p-4 md:p-8 lg:p-12 animate-fadeIn">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 md:mb-8 flex items-center gap-2 md:gap-3">
              <span className="text-3xl md:text-4xl">🤖📸</span>
              Cấp Quyền Camera Trên Android
            </h2>

            {/* Method 1: During First Use */}
            <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">⚡</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-green-700">Cách 1: Khi Chụp Ảnh Lần Đầu</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-700">App tự động hỏi khi bạn nhấn nút chụp!</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở app DiemDanh và nhấn <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">Điểm Danh</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0">
                    Nhấn nút <strong className="bg-yellow-100 px-1 rounded">Chụp Ảnh</strong> hoặc <strong className="bg-yellow-100 px-1 rounded">Quét QR</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Popup xuất hiện: <strong className="bg-yellow-100 px-1 rounded">"Cho phép DiemDanh chụp ảnh và quay video?"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">4</span>
                  <div className="min-w-0">
                    Nhấn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Cho phép"</strong> hoặc <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Allow"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Xong!</strong> <span className="text-xs md:text-sm">Camera đã sẵn sàng 📸</span>
                  </div>
                </li>
              </ol>
            </div>

            {/* Method 2: Settings */}
            <div className="mb-6 md:mb-8">
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg md:rounded-xl p-4 md:p-6 mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                  <span className="text-xl md:text-2xl">⚙️</span>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-700">Cách 2: Từ Cài Đặt Android</h3>
                </div>
                <p className="text-xs md:text-sm lg:text-base text-gray-600">Nếu đã từ chối hoặc camera không hoạt động</p>
              </div>

              <ol className="space-y-3 md:space-y-4 text-sm md:text-base lg:text-lg text-gray-700">
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">1</span>
                  <div className="min-w-0">
                    Mở <strong className="bg-gray-100 px-2 py-1 rounded">Cài Đặt</strong> (Settings)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">2</span>
                  <div className="min-w-0">
                    Nhấn vào <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Ứng dụng"</strong> hoặc <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Apps"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">3</span>
                  <div className="min-w-0">
                    Tìm và chọn <strong className="bg-yellow-100 px-1 rounded">"DiemDanh"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">4</span>
                  <div className="min-w-0">
                    Nhấn <strong className="bg-blue-100 px-2 py-1 rounded text-sm md:text-base">"Quyền"</strong> (Permissions)
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">5</span>
                  <div className="min-w-0">
                    Chọn <strong className="bg-yellow-100 px-1 rounded">"Camera"</strong>
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">6</span>
                  <div className="min-w-0">
                    Chọn <strong className="bg-green-100 px-2 py-1 rounded text-sm md:text-base">"Cho phép"</strong> hoặc bật công tắc
                  </div>
                </li>
                <li className="flex items-start gap-2 md:gap-3">
                  <span className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm md:text-base">✓</span>
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 md:p-4 rounded-r-lg flex-1 min-w-0">
                    <strong className="text-green-700 text-sm md:text-base">Hoàn tất!</strong> <span className="text-xs md:text-sm">Quay lại app và thử chụp ảnh</span>
                  </div>
                </li>
              </ol>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 md:p-6 rounded-r-lg">
              <p className="text-xs md:text-sm lg:text-base text-gray-700">
                <strong className="text-orange-700">⚠️ Lưu ý:</strong> Một số máy Android yêu cầu cả quyền Camera và Storage để chụp ảnh. Nếu không chụp được, hãy kiểm tra cả hai quyền này.
              </p>
            </div>
          </div>
        )}

        {/* Troubleshooting Section */}
        <div className="mt-8 md:mt-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
            <span className="text-3xl md:text-4xl">🔧</span>
            Khắc Phục Sự Cố
          </h2>

          <div className="space-y-4 md:space-y-6">
            {/* Problem 1 */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base lg:text-lg flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">❌</span>
                <span>App không hỏi quyền</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-700 ml-6 md:ml-7">
                <strong>Giải pháp:</strong> Đã từ chối vĩnh viễn. Vào Cài Đặt → DiemDanh → Quyền và bật thủ công.
              </p>
            </div>

            {/* Problem 2 */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base lg:text-lg flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">❌</span>
                <span>Vị trí không chính xác</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-700 ml-6 md:ml-7 mb-2">
                <strong>Giải pháp:</strong>
              </p>
              <ul className="text-xs md:text-sm text-gray-700 ml-6 md:ml-7 space-y-1 list-disc list-inside">
                <li>Bật "Vị trí chính xác" (iOS) hoặc "Độ chính xác cao" (Android)</li>
                <li>Đảm bảo GPS đang bật</li>
                <li>Ra ngoài trời hoặc gần cửa sổ để tín hiệu GPS tốt hơn</li>
              </ul>
            </div>

            {/* Problem 3 */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base lg:text-lg flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">❌</span>
                <span>Camera màn hình đen</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-700 ml-6 md:ml-7 mb-2">
                <strong>Giải pháp:</strong>
              </p>
              <ul className="text-xs md:text-sm text-gray-700 ml-6 md:ml-7 space-y-1 list-disc list-inside">
                <li>Tắt app hoàn toàn và mở lại</li>
                <li>Kiểm tra không có app khác đang dùng camera</li>
                <li>Khởi động lại điện thoại</li>
                <li>Cấp quyền Storage nếu là Android</li>
              </ul>
            </div>

            {/* Problem 4 */}
            <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md">
              <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base lg:text-lg flex items-start gap-2">
                <span className="text-red-600 flex-shrink-0">❌</span>
                <span>Đã cấp quyền nhưng vẫn lỗi</span>
              </h3>
              <p className="text-xs md:text-sm text-gray-700 ml-6 md:ml-7 mb-2">
                <strong>Giải pháp:</strong>
              </p>
              <ul className="text-xs md:text-sm text-gray-700 ml-6 md:ml-7 space-y-1 list-disc list-inside">
                <li>Xóa app và cài lại</li>
                <li>Xóa cache và data của app</li>
                <li>Cập nhật hệ điều hành lên phiên bản mới nhất</li>
                <li>Liên hệ bộ phận hỗ trợ: 078 777 4949</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 md:mt-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl md:rounded-2xl p-6 md:p-8 lg:p-12 text-center text-white">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">Cần Hỗ Trợ Thêm?</h2>
          <p className="text-sm md:text-base lg:text-xl text-green-100 mb-6 md:mb-8">
            Đội ngũ hỗ trợ của chúng tôi luôn sẵn sàng giúp bạn!
          </p>
          <div className="flex gap-3 md:gap-4 justify-center flex-wrap">
            <a
              href="tel:0787774949"
              className="inline-block bg-white text-green-600 px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg hover:bg-green-50 transition-all shadow-lg hover:scale-105"
            >
              📞 Gọi Ngay
            </a>
            <Link
              href="/help"
              className="inline-block bg-green-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg md:rounded-xl font-bold text-sm md:text-base lg:text-lg hover:bg-green-800 transition-all shadow-lg"
            >
              ← Trung Tâm Trợ Giúp
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
