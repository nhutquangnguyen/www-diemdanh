'use client';

import HelpLayout from '@/components/HelpLayout';
import { useState } from 'react';

export default function DiemDanhPage() {
  const [selectedScenario, setSelectedScenario] = useState<'normal' | 'late' | 'forgot' | 'wrong-location'>('normal');

  return (
    <HelpLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6">📱</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Hướng Dẫn Điểm Danh
            </h1>
            <p className="text-xl text-green-100 mb-8">
              Check-in/Check-out nhanh chóng, chính xác với công nghệ GPS
            </p>
            <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>GPS Chính Xác</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Thời Gian Thực</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Chính Xác</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Điểm Danh Cơ Bản
            </h2>
            <p className="text-lg text-gray-600">
              Chỉ 3 bước đơn giản để check-in/check-out
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mở App</h3>
              <p className="text-gray-600">
                Mở DiemDanh.net trên điện thoại khi đến nơi làm việc
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cho Phép GPS</h3>
              <p className="text-gray-600">
                Bật GPS và cho phép app truy cập vị trí của bạn
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Nhấn Check-in</h3>
              <p className="text-gray-600">
                Nhấn nút "Check-in" lớn để xác nhận điểm danh
              </p>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8 border-2 border-green-200">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 text-4xl">✅</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thành Công!</h3>
                <p className="text-gray-700 mb-3">
                  Bạn sẽ thấy thông báo xác nhận và thời gian check-in được ghi lại
                </p>
                <div className="bg-white rounded-lg p-4 inline-block">
                  <p className="text-sm text-gray-600">Ví dụ thông báo:</p>
                  <p className="font-bold text-green-600 mt-1">"Check-in thành công lúc 08:05 AM"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Instructions */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hướng Dẫn Chi Tiết
            </h2>
            <p className="text-lg text-gray-600">
              Mọi thứ bạn cần biết về điểm danh
            </p>
          </div>

          {/* Check-in Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0 text-5xl">📥</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Check-in (Điểm Danh Vào)
                </h3>
                <p className="text-gray-600">
                  Thực hiện khi bạn đến nơi làm việc và bắt đầu ca
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Đảm bảo GPS được bật
                </h4>
                <div className="ml-8 space-y-2 text-gray-700">
                  <p><strong>iOS:</strong> Cài đặt → Quyền riêng tư → Định vị → Bật "Luôn bật" hoặc "Khi dùng app"</p>
                  <p><strong>Android:</strong> Cài đặt → Vị trí → Bật định vị → Chọn "Độ chính xác cao"</p>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                  Đứng trong bán kính cho phép
                </h4>
                <div className="ml-8 text-gray-700">
                  <p className="mb-2">
                    Bạn phải ở trong bán kính được cài đặt (thường là 50-100m từ cửa hàng)
                  </p>
                  <div className="bg-white rounded-lg p-4 border border-blue-200">
                    <p className="text-sm font-semibold text-gray-900 mb-2">💡 Mẹo:</p>
                    <ul className="text-sm space-y-1">
                      <li>• Đứng ngoài trời để GPS chính xác hơn</li>
                      <li>• Tránh check-in trong tòa nhà cao tầng</li>
                      <li>• Chờ vài giây để GPS ổn định</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                  Nhấn nút "Check-in"
                </h4>
                <div className="ml-8 text-gray-700">
                  <p className="mb-3">
                    Nhấn nút lớn màu xanh lá với biểu tượng ✓ trên trang chủ
                  </p>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-6 text-center">
                    <div className="text-4xl mb-2">✓</div>
                    <p className="font-bold text-xl">CHECK-IN</p>
                    <p className="text-sm text-green-100 mt-1">Nhấn để điểm danh vào</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                  Xác nhận thông tin
                </h4>
                <div className="ml-8 text-gray-700">
                  <p className="mb-2">Hệ thống sẽ hiển thị:</p>
                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <p>✓ Thời gian check-in</p>
                    <p>✓ Vị trí của bạn</p>
                    <p>✓ Ca làm việc</p>
                    <p>✓ Cửa hàng</p>
                  </div>
                  <p className="mt-3 text-sm">Kiểm tra kỹ trước khi nhấn "Xác nhận"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Check-out Section */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
            <div className="flex items-start gap-6 mb-6">
              <div className="flex-shrink-0 text-5xl">📤</div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Check-out (Điểm Danh Ra)
                </h3>
                <p className="text-gray-600">
                  Thực hiện khi kết thúc ca làm việc
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Quy trình tương tự Check-in</h4>
                <div className="text-gray-700 space-y-2">
                  <p>1. Đảm bảo GPS đang bật</p>
                  <p>2. Ở trong bán kính cho phép</p>
                  <p>3. Nhấn nút "Check-out" (màu đỏ)</p>
                  <p>4. Xác nhận thông tin</p>
                </div>
              </div>

              <div className="bg-orange-50 border-l-4 border-orange-500 rounded-r-lg p-6">
                <h4 className="font-bold text-gray-900 mb-3">Lưu ý quan trọng</h4>
                <div className="text-gray-700 space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500">⚠️</span>
                    <p><strong>Nhớ check-out:</strong> Nếu quên check-out, giờ làm sẽ không được tính chính xác</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-orange-500">⏰</span>
                    <p><strong>Thời gian:</strong> Check-out phải sau check-in ít nhất 30 phút</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-green-500">✓</span>
                    <p><strong>Tự động check-out:</strong> Một số cửa hàng bật tính năng tự động check-out vào cuối ca</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Special Scenarios */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tình Huống Đặc Biệt
            </h2>
            <p className="text-lg text-gray-600">
              Cách xử lý các trường hợp không như dự kiến
            </p>
          </div>

          {/* Scenario Selector */}
          <div className="flex gap-3 mb-8 flex-wrap justify-center">
            {[
              { key: 'normal', label: 'Điểm danh bình thường', icon: '✅' },
              { key: 'late', label: 'Đi muộn', icon: '⏰' },
              { key: 'forgot', label: 'Quên check-in/out', icon: '😅' },
              { key: 'wrong-location', label: 'Sai vị trí', icon: '📍' }
            ].map((scenario) => (
              <button
                key={scenario.key}
                onClick={() => setSelectedScenario(scenario.key as any)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all flex items-center gap-2 ${
                  selectedScenario === scenario.key
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{scenario.icon}</span>
                <span>{scenario.label}</span>
              </button>
            ))}
          </div>

          {/* Scenario Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 animate-fadeIn">
            {selectedScenario === 'normal' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-4xl">✅</span>
                  Điểm Danh Bình Thường
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Quy trình chuẩn</h4>
                    <div className="space-y-2 text-gray-700">
                      <p>✓ Check-in đúng giờ (trong khung thời gian cho phép)</p>
                      <p>✓ Ở đúng vị trí (trong bán kính cửa hàng)</p>
                      <p>✓ Làm việc đầy đủ theo ca</p>
                      <p>✓ Check-out khi kết thúc ca</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Kết quả</h4>
                    <p className="text-gray-700">
                      • Giờ công được tính đầy đủ<br />
                      • Không có ghi chú đặc biệt<br />
                      • Hiển thị trạng thái "Hoàn thành" trên lịch
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedScenario === 'late' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-4xl">⏰</span>
                  Xử Lý Khi Đi Muộn
                </h3>
                <div className="space-y-4">
                  <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                    <h4 className="font-bold text-gray-900 mb-3">Khi bạn đến muộn</h4>
                    <ol className="space-y-2 text-gray-700 list-decimal list-inside">
                      <li>Vẫn thực hiện check-in bình thường</li>
                      <li>Hệ thống tự động ghi nhận "Muộn X phút"</li>
                      <li>Thông báo cho quản lý (nếu có cấu hình)</li>
                    </ol>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Giải thích lý do (nếu cần)</h4>
                    <p className="text-gray-700 mb-3">
                      Sau khi check-in muộn, bạn có thể thêm ghi chú giải thích:
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-blue-200">
                      <p className="text-sm text-gray-600 mb-2">Ví dụ ghi chú:</p>
                      <p className="text-sm text-gray-800 italic">
                        "Tắc đường do mưa lớn" <br />
                        "Xe hỏng trên đường đi làm"
                      </p>
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Hậu quả</h4>
                    <p className="text-gray-700">
                      • Được ghi nhận là "Đi muộn"<br />
                      • Có thể ảnh hưởng đến lương (tùy quy định công ty)<br />
                      • Quản lý sẽ nhận thông báo
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">💡 Mẹo tránh đi muộn</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Bật thông báo nhắc ca làm việc trước 30 phút</li>
                      <li>• Kiểm tra lịch vào tối hôm trước</li>
                      <li>• Xuất phát sớm hơn 15 phút</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedScenario === 'forgot' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-4xl">😅</span>
                  Quên Check-in hoặc Check-out
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                    <h4 className="font-bold text-gray-900 mb-3">Tình huống 1: Quên check-in</h4>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Vấn đề:</strong> Bạn đã đến làm việc nhưng quên check-in</p>
                      <p><strong>Giải pháp:</strong></p>
                      <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Check-in ngay khi nhớ ra (dù đã muộn)</li>
                        <li>Liên hệ quản lý để điều chỉnh giờ check-in thực tế</li>
                        <li>Quản lý có thể chỉnh sửa giờ check-in trong hệ thống</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-orange-50 rounded-lg p-6 border-l-4 border-orange-500">
                    <h4 className="font-bold text-gray-900 mb-3">Tình huống 2: Quên check-out</h4>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Vấn đề:</strong> Bạn đã về nhà mà quên check-out</p>
                      <p><strong>Giải pháp:</strong></p>
                      <div className="bg-white rounded-lg p-4 space-y-2">
                        <p><strong>Cách 1 (Tự động):</strong> Nếu cửa hàng bật tự động check-out, hệ thống sẽ tự động checkout vào cuối ca</p>
                        <p><strong>Cách 2 (Thủ công):</strong> Liên hệ quản lý để điều chỉnh giờ check-out</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Quyền của quản lý</h4>
                    <p className="text-gray-700 mb-3">
                      Quản lý có thể điều chỉnh thời gian check-in/check-out cho nhân viên:
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <p className="text-sm">1. Vào trang Lịch Sử Điểm Danh</p>
                      <p className="text-sm">2. Tìm ngày cần điều chỉnh</p>
                      <p className="text-sm">3. Nhấn "Chỉnh sửa"</p>
                      <p className="text-sm">4. Nhập thời gian chính xác</p>
                      <p className="text-sm">5. Thêm ghi chú lý do</p>
                      <p className="text-sm">6. Lưu thay đổi</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">🔔 Tránh quên với thông báo</h4>
                    <p className="text-gray-700 mb-2">
                      Bật thông báo tự động để nhận nhắc nhở:
                    </p>
                    <ul className="space-y-1 text-gray-700 text-sm">
                      <li>• Nhắc check-in trước ca 15 phút</li>
                      <li>• Nhắc check-out khi gần hết ca</li>
                      <li>• Cảnh báo nếu quên check-out sau 1 giờ</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {selectedScenario === 'wrong-location' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="text-4xl">📍</span>
                  GPS Không Chính Xác / Sai Vị Trí
                </h3>
                <div className="space-y-4">
                  <div className="bg-red-50 rounded-lg p-6 border-l-4 border-red-500">
                    <h4 className="font-bold text-gray-900 mb-3">Không thể check-in: "Ngoài bán kính"</h4>
                    <p className="text-gray-700 mb-3">
                      <strong>Nguyên nhân:</strong> GPS không chính xác hoặc bạn thực sự ở ngoài vùng cho phép
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-2">Giải pháp:</p>
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Đi ra ngoài trời (tránh trong tòa nhà)</li>
                        <li>Tắt và bật lại GPS</li>
                        <li>Chờ 10-20 giây để GPS ổn định</li>
                        <li>Thử check-in lại</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-6 border-l-4 border-yellow-500">
                    <h4 className="font-bold text-gray-900 mb-3">GPS vẫn không chính xác</h4>
                    <div className="space-y-3 text-gray-700">
                      <p><strong>Kiểm tra cài đặt GPS:</strong></p>
                      <div className="bg-white rounded-lg p-4 space-y-3">
                        <div>
                          <p className="font-semibold mb-1">📱 iPhone:</p>
                          <p className="text-sm">Cài đặt → Quyền riêng tư → Định vị → DiemDanh → Chọn "Luôn bật" hoặc "Khi dùng app"</p>
                        </div>
                        <div>
                          <p className="font-semibold mb-1">🤖 Android:</p>
                          <p className="text-sm">Cài đặt → Vị trí → Chế độ → Chọn "Độ chính xác cao"</p>
                          <p className="text-sm">Cài đặt → Ứng dụng → DiemDanh → Quyền → Vị trí → "Cho phép mọi lúc"</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Yêu cầu check-in thủ công</h4>
                    <p className="text-gray-700 mb-3">
                      Nếu GPS luôn lỗi dù đã thử tất cả:
                    </p>
                    <div className="bg-white rounded-lg p-4">
                      <ol className="list-decimal list-inside space-y-2 text-gray-700">
                        <li>Chụp ảnh màn hình lỗi GPS</li>
                        <li>Liên hệ quản lý qua chat/điện thoại</li>
                        <li>Quản lý sẽ check-in thủ công cho bạn</li>
                        <li>Báo bộ phận IT để khắc phục vấn đề GPS</li>
                      </ol>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">Check-in từ xa (Remote)</h4>
                    <p className="text-gray-700 mb-3">
                      Nếu cửa hàng cho phép làm việc từ xa:
                    </p>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Quản lý có thể tắt yêu cầu GPS cho nhân viên remote</li>
                      <li>• Bạn có thể check-in từ bất kỳ đâu</li>
                      <li>• Vẫn ghi nhận vị trí để quản lý biết bạn ở đâu</li>
                    </ul>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-900 mb-3">⚙️ Điều chỉnh bán kính (Quản lý)</h4>
                    <p className="text-gray-700 mb-2">
                      Nếu bán kính quá hẹp, quản lý có thể tăng lên:
                    </p>
                    <p className="text-sm text-gray-600">
                      Cài đặt Cửa Hàng → Bán kính cho phép → Tăng lên 100m hoặc 150m
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* History & Reports */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Xem Lịch Sử & Báo Cáo
            </h2>
            <p className="text-lg text-gray-600">
              Theo dõi giờ công và hiệu suất làm việc
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Lịch Sử Điểm Danh</h3>
              <p className="text-gray-700 mb-4">
                Xem lại tất cả các lần check-in/check-out của bạn
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                <p>✓ Lọc theo ngày/tuần/tháng</p>
                <p>✓ Xem tổng giờ làm việc</p>
                <p>✓ Chi tiết từng lần điểm danh</p>
                <p>✓ Vị trí GPS được ghi nhận</p>
                <p>✓ Ghi chú và trạng thái</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Báo Cáo Lương</h3>
              <p className="text-gray-700 mb-4">
                Tự động tính toán lương dựa trên giờ công
              </p>
              <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-700">
                <p>✓ Tổng giờ làm trong tháng</p>
                <p>✓ Số ngày đi làm / nghỉ</p>
                <p>✓ Số lần đi muộn / về sớm</p>
                <p>✓ Tính lương tạm tính</p>
                <p>✓ Xuất báo cáo PDF/Excel</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="space-y-4">
            <details className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <span>Có thể check-in thay người khác không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  <strong>Không.</strong> Mỗi người chỉ có thể check-in bằng tài khoản của mình. Hệ thống ghi nhận GPS, thời gian và thiết bị để đảm bảo chính xác.
                </p>
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <span>Có thể check-in từ xa không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  Tùy thuộc vào cài đặt của quản lý. Mặc định phải ở trong bán kính cửa hàng. Nếu làm việc từ xa, quản lý có thể tắt yêu cầu GPS.
                </p>
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <span>GPS có tốn pin không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  GPS chỉ hoạt động khi bạn check-in/check-out (vài giây), nên hầu như không ảnh hưởng đến pin. Ứng dụng không theo dõi vị trí liên tục.
                </p>
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <span>Có thể sửa thời gian check-in không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  Nhân viên không thể tự sửa. Chỉ quản lý mới có quyền điều chỉnh thời gian check-in/check-out khi có sự cố hoặc nhân viên quên check.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Bắt Đầu Điểm Danh Ngay Hôm Nay
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Dùng thử miễn phí 14 ngày - Không cần thẻ tín dụng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-white text-green-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Đăng Ký Miễn Phí
            </a>
            <a
              href="/help/bat-dau"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-green-600 transition-all"
            >
              Hướng Dẫn Bắt Đầu
            </a>
          </div>
        </div>
      </div>

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
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </HelpLayout>
  );
}
