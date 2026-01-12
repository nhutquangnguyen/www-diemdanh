'use client';

import HelpLayout from '@/components/HelpLayout';
import { useState } from 'react';

export default function BatDauPage() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <HelpLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6 animate-bounce">🚀</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Bắt Đầu Với DiemDanh.net
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Hướng dẫn đầy đủ từ A-Z để bạn bắt đầu sử dụng hệ thống điểm danh thông minh trong 5 phút
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
                </svg>
                <span>5 phút</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                </svg>
                <span>Dễ dàng</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              DiemDanh.net Là Gì?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hệ thống quản lý điểm danh và lịch làm việc thông minh, giúp doanh nghiệp theo dõi nhân viên hiệu quả
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Điểm Danh GPS</h3>
              <p className="text-gray-700">
                Xác thực vị trí chính xác, chống gian lận điểm danh
              </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 border-2 border-indigo-200">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Sếp Lịch AI</h3>
              <p className="text-gray-700">
                Tự động sắp xếp ca làm việc thông minh dựa trên AI
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Báo Cáo Chi Tiết</h3>
              <p className="text-gray-700">
                Thống kê giờ công, lương, và hiệu suất làm việc
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hướng Dẫn Từng Bước
            </h2>
            <p className="text-lg text-gray-600">
              Làm theo 4 bước đơn giản này để bắt đầu sử dụng
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            {[1, 2, 3, 4].map((step) => (
              <button
                key={step}
                onClick={() => setActiveStep(step)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeStep === step
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                Bước {step}
              </button>
            ))}
          </div>

          {/* Step 1: Sign Up */}
          {activeStep === 1 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 animate-fadeIn">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  1
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Tạo Tài Khoản
                  </h3>
                  <p className="text-gray-600">
                    Đăng ký miễn phí và tạo cửa hàng đầu tiên của bạn
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      1.1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Truy cập trang chủ</h4>
                      <p className="text-gray-700 mb-3">
                        Mở trình duyệt và truy cập <code className="bg-blue-100 px-2 py-1 rounded text-blue-700 font-mono">diemdanh.net</code>
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <p className="text-sm text-gray-600 mb-2">💡 <strong>Mẹo:</strong> Khuyến nghị sử dụng Chrome hoặc Safari</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      1.2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Nhấn "Đăng Ký"</h4>
                      <p className="text-gray-700 mb-3">
                        Tìm nút <strong className="text-blue-600">"Đăng Ký"</strong> ở góc trên bên phải màn hình
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      1.3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Điền thông tin</h4>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Email (sẽ dùng để đăng nhập)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Mật khẩu (tối thiểu 8 ký tự)
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Tên doanh nghiệp
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-green-500">✓</span>
                          Số điện thoại
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      1.4
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Xác thực email</h4>
                      <p className="text-gray-700 mb-3">
                        Kiểm tra email và nhấn vào link xác thực để kích hoạt tài khoản
                      </p>
                      <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                        <p className="text-sm text-gray-700">
                          ⚠️ <strong>Chú ý:</strong> Kiểm tra cả thư mục Spam nếu không thấy email
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Create Store */}
          {activeStep === 2 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 animate-fadeIn">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  2
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Tạo Cửa Hàng & Thêm Nhân Viên
                  </h3>
                  <p className="text-gray-600">
                    Thiết lập thông tin cửa hàng và mời nhân viên tham gia
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
                      2.1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Tạo cửa hàng mới</h4>
                      <p className="text-gray-700 mb-3">
                        Sau khi đăng nhập, nhấn <strong>"+ Tạo Cửa Hàng"</strong>
                      </p>
                      <div className="bg-white rounded-lg p-4 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-500">📝</span>
                          <span className="text-gray-700">Tên cửa hàng (VD: Chi nhánh Quận 1)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-500">📍</span>
                          <span className="text-gray-700">Địa chỉ chi tiết</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-500">🗺️</span>
                          <span className="text-gray-700">Tọa độ GPS (tự động lấy hoặc chọn trên bản đồ)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-indigo-500">📏</span>
                          <span className="text-gray-700">Bán kính cho phép (VD: 100m)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold">
                      2.2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Thêm nhân viên</h4>
                      <p className="text-gray-700 mb-3">
                        Vào phần <strong>"Nhân Viên"</strong> → <strong>"+ Thêm Nhân Viên"</strong>
                      </p>
                      <div className="bg-white rounded-lg p-4">
                        <p className="text-sm font-semibold text-gray-900 mb-2">Có 2 cách thêm nhân viên:</p>
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                            <div>
                              <p className="font-semibold text-gray-900">Mời qua email/điện thoại</p>
                              <p className="text-sm text-gray-600">Nhân viên nhận link, tự đăng ký và tham gia</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                            <div>
                              <p className="font-semibold text-gray-900">Tạo thủ công</p>
                              <p className="text-sm text-gray-600">Nhập thông tin: Họ tên, SĐT, Vị trí công việc</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-3xl">💡</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Mẹo hữu ích</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0">✓</span>
                          <span>Bật vị trí GPS chính xác trên điện thoại để lấy tọa độ cửa hàng</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0">✓</span>
                          <span>Bán kính 50-100m là phù hợp cho cửa hàng nhỏ</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-500 flex-shrink-0">✓</span>
                          <span>Có thể tạo nhiều cửa hàng nếu bạn có nhiều chi nhánh</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Create Shifts */}
          {activeStep === 3 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 animate-fadeIn">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  3
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Tạo Ca Làm Việc
                  </h3>
                  <p className="text-gray-600">
                    Thiết lập các ca làm việc phù hợp với doanh nghiệp
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      3.1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Vào trang Ca Làm Việc</h4>
                      <p className="text-gray-700 mb-3">
                        Menu bên trái → <strong>"Ca Làm"</strong> → <strong>"+ Tạo Ca Mới"</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      3.2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-3">Thiết lập thông tin ca</h4>
                      <div className="bg-white rounded-lg p-4 space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <div className="bg-purple-50 rounded-lg p-3">
                            <p className="font-semibold text-gray-900 mb-1">Tên ca</p>
                            <p className="text-sm text-gray-600">VD: Ca Sáng, Ca Chiều, Ca Tối</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <p className="font-semibold text-gray-900 mb-1">Màu sắc</p>
                            <p className="text-sm text-gray-600">Chọn màu để phân biệt trên lịch</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <p className="font-semibold text-gray-900 mb-1">Giờ bắt đầu</p>
                            <p className="text-sm text-gray-600">VD: 08:00</p>
                          </div>
                          <div className="bg-purple-50 rounded-lg p-3">
                            <p className="font-semibold text-gray-900 mb-1">Giờ kết thúc</p>
                            <p className="text-sm text-gray-600">VD: 17:00</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                      3.3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-3">Ví dụ thiết lập thông dụng</h4>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border-l-4 border-orange-400">
                          <p className="font-semibold text-gray-900 mb-2">🌅 Ca Sáng: 08:00 - 12:00</p>
                          <p className="text-sm text-gray-600">Phù hợp với cửa hàng mở cửa sớm</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-l-4 border-yellow-400">
                          <p className="font-semibold text-gray-900 mb-2">☀️ Ca Trưa: 12:00 - 17:00</p>
                          <p className="text-sm text-gray-600">Ca làm giữa ngày</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-l-4 border-indigo-400">
                          <p className="font-semibold text-gray-900 mb-2">🌙 Ca Tối: 17:00 - 22:00</p>
                          <p className="text-sm text-gray-600">Ca làm buổi tối</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 text-3xl">⚙️</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Tùy chọn nâng cao</h4>
                      <ul className="space-y-2 text-gray-700 text-sm">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 flex-shrink-0">•</span>
                          <span><strong>Giờ check-in linh hoạt:</strong> Cho phép nhân viên check-in sớm/muộn 15 phút</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 flex-shrink-0">•</span>
                          <span><strong>Tự động check-out:</strong> Tự động checkout nếu nhân viên quên</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 flex-shrink-0">•</span>
                          <span><strong>Lương theo giờ:</strong> Nhập mức lương/giờ để tính tự động</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Assign Schedule */}
          {activeStep === 4 && (
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 animate-fadeIn">
              <div className="flex items-start gap-6 mb-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  4
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Sắp Xếp Lịch Làm Việc
                  </h3>
                  <p className="text-gray-600">
                    Gán ca làm việc cho nhân viên theo lịch
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      4.1
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-2">Chọn cách sắp xếp</h4>
                      <p className="text-gray-700 mb-4">
                        Vào trang <strong>"Lịch Làm"</strong>, bạn có 2 cách sắp xếp:
                      </p>
                      <div className="space-y-3">
                        <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">🤖</span>
                            <p className="font-bold text-gray-900">Cách 1: Dùng Sếp Lịch AI (Khuyến nghị)</p>
                          </div>
                          <p className="text-sm text-gray-600 ml-11">
                            AI tự động sắp xếp ca công bằng, tối ưu cho tất cả nhân viên
                          </p>
                          <button className="ml-11 mt-3 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                            Xem hướng dẫn Sếp Lịch AI →
                          </button>
                        </div>
                        <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="text-2xl">✍️</span>
                            <p className="font-bold text-gray-900">Cách 2: Sắp xếp thủ công</p>
                          </div>
                          <p className="text-sm text-gray-600 ml-11">
                            Bạn tự chọn nhân viên và gán ca cho từng ngày
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      4.2
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-3">Sắp xếp thủ công</h4>
                      <div className="bg-white rounded-lg p-4 space-y-3">
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                          <div>
                            <p className="font-semibold text-gray-900">Chọn ngày trên lịch</p>
                            <p className="text-sm text-gray-600">Click vào ô ngày bạn muốn sắp ca</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                          <div>
                            <p className="font-semibold text-gray-900">Chọn nhân viên</p>
                            <p className="text-sm text-gray-600">Tích chọn các nhân viên làm việc trong ngày đó</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                          <div>
                            <p className="font-semibold text-gray-900">Gán ca</p>
                            <p className="text-sm text-gray-600">Chọn ca làm việc (Sáng, Trưa, Tối...)</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                          <div>
                            <p className="font-semibold text-gray-900">Lưu lại</p>
                            <p className="text-sm text-gray-600">Nhấn "Lưu" để hoàn tất</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 rounded-r-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                      4.3
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900 mb-3">Mẹo sắp xếp lịch hiệu quả</h4>
                      <div className="space-y-2">
                        <div className="bg-white rounded-lg p-3 flex items-start gap-3">
                          <span className="text-xl">💡</span>
                          <div>
                            <p className="text-sm text-gray-700">Sắp xếp lịch cho cả tuần/tháng một lúc để tiết kiệm thời gian</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 flex items-start gap-3">
                          <span className="text-xl">📋</span>
                          <div>
                            <p className="text-sm text-gray-700">Sao chép lịch tuần trước nếu lịch lặp lại hàng tuần</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 flex items-start gap-3">
                          <span className="text-xl">⚖️</span>
                          <div>
                            <p className="text-sm text-gray-700">Cân bằng số ca cho các nhân viên để đảm bảo công bằng</p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3 flex items-start gap-3">
                          <span className="text-xl">🔔</span>
                          <div>
                            <p className="text-sm text-gray-700">Nhân viên sẽ nhận thông báo khi có lịch mới</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl">🎉</span>
                    <div>
                      <h4 className="font-bold text-xl mb-1">Hoàn Thành!</h4>
                      <p className="text-green-100">Giờ nhân viên có thể bắt đầu điểm danh</p>
                    </div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
                    <p className="text-sm mb-2">✅ Tài khoản đã tạo</p>
                    <p className="text-sm mb-2">✅ Cửa hàng và nhân viên đã thiết lập</p>
                    <p className="text-sm mb-2">✅ Ca làm việc đã cấu hình</p>
                    <p className="text-sm">✅ Lịch làm việc đã sắp xếp</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Bước Tiếp Theo
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="/help/diem-danh"
              className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                Hướng Dẫn Điểm Danh
              </h3>
              <p className="text-gray-700 mb-4">
                Học cách điểm danh check-in/out, xem lịch sử và xử lý các tình huống đặc biệt
              </p>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <span>Xem hướng dẫn</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>

            <a
              href="/help/sep-lich-ai"
              className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:border-purple-400 hover:shadow-xl transition-all"
            >
              <div className="text-5xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                Sếp Lịch AI
              </h3>
              <p className="text-gray-700 mb-4">
                Để AI tự động sắp xếp lịch làm việc công bằng và tối ưu cho toàn bộ nhân viên
              </p>
              <div className="flex items-center gap-2 text-purple-600 font-semibold">
                <span>Khám phá tính năng</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span>Tôi có thể dùng thử miễn phí không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">
                  Có! Bạn được dùng thử MIỄN PHÍ 14 ngày với đầy đủ tính năng, không cần thẻ tín dụng. Sau 14 ngày, chọn gói phù hợp để tiếp tục sử dụng.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span>Tôi có thể thêm bao nhiêu nhân viên?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">
                  Tùy thuộc vào gói dịch vụ bạn chọn. Gói Cơ Bản: 10 nhân viên, Gói Chuyên Nghiệp: 50 nhân viên, Gói Doanh Nghiệp: Không giới hạn.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span>Tôi có thể quản lý nhiều cửa hàng không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">
                  Có! Bạn có thể tạo nhiều cửa hàng/chi nhánh trong một tài khoản. Mỗi cửa hàng có thể có nhân viên và cài đặt riêng.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span>Dữ liệu có được bảo mật không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">
                  Tất cả dữ liệu được mã hóa SSL/TLS, lưu trữ trên server bảo mật và backup hàng ngày. Chúng tôi tuân thủ các tiêu chuẩn bảo mật quốc tế.
                </p>
              </div>
            </details>

            <details className="bg-white rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <span>Nhân viên có cần cài app không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">
                  DiemDanh.net là PWA - chạy ngay trên trình duyệt. Nhân viên có thể cài đặt nhanh như app thật mà không cần tải từ App Store/CH Play. <a href="/help/cai-dat-app" className="text-blue-600 font-semibold hover:underline">Xem hướng dẫn →</a>
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Dùng thử miễn phí 14 ngày - Không cần thẻ tín dụng
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Đăng Ký Ngay
            </a>
            <a
              href="/help"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Xem Thêm Hướng Dẫn
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
