'use client';

import HelpLayout from '@/components/HelpLayout';
import Link from 'next/link';

export default function SepLichAIPage() {
  return (
    <HelpLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-6 animate-bounce">🤖</div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Sếp Lịch AI
            </h1>
            <p className="text-xl text-purple-100 mb-8">
              Để AI tự động sắp xếp lịch làm việc công bằng, tối ưu cho toàn bộ nhân viên chỉ trong 1 click
            </p>
            <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 7H7v6h6V7z" />
                  <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
                </svg>
                <span>Tự Động 100%</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Công Bằng</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Siêu Nhanh</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What is Sếp Lịch AI */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sếp Lịch AI Là Gì?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Tính năng độc quyền sử dụng trí tuệ nhân tạo để tự động sắp xếp ca làm việc cho toàn bộ nhân viên
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border-2 border-red-200">
              <div className="text-4xl mb-4">😩</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Trước Đây (Thủ Công)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 flex-shrink-0">✗</span>
                  <span>Tốn 2-3 giờ sắp lịch cho 10 người</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 flex-shrink-0">✗</span>
                  <span>Dễ thiên vị hoặc không công bằng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 flex-shrink-0">✗</span>
                  <span>Nhân viên phàn nàn về số ca không đều</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 flex-shrink-0">✗</span>
                  <span>Khó cân bằng giữa nhu cầu và nguồn lực</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 flex-shrink-0">✗</span>
                  <span>Phải sửa đổi nhiều lần</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bây Giờ (AI)</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span><strong>Chỉ 1 click</strong> - 5 giây hoàn tất</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span><strong>100% công bằng</strong> - AI phân ca đều</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span><strong>Tự động tối ưu</strong> - Cân bằng nhu cầu</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span><strong>Tôn trọng ràng buộc</strong> - Nghỉ phép, off...</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span><strong>Linh hoạt</strong> - Có thể chỉnh sửa sau</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">95%</div>
              <p className="text-blue-100">Tiết kiệm thời gian</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <p className="text-purple-100">Công bằng</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold mb-2">5s</div>
              <p className="text-pink-100">Hoàn thành</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Cách Hoạt Động
            </h2>
            <p className="text-lg text-gray-600">
              AI phân tích và sắp xếp lịch theo 3 bước
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Thu Thập Dữ Liệu</h3>
                  <p className="text-gray-700 mb-4">
                    AI phân tích thông tin từ hệ thống:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-2">📋 Danh sách nhân viên</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Số lượng nhân viên</li>
                        <li>• Kỹ năng của từng người</li>
                        <li>• Lịch sử làm việc</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-2">⏰ Các ca làm việc</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Số ca có sẵn</li>
                        <li>• Giờ bắt đầu/kết thúc</li>
                        <li>• Yêu cầu số người/ca</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-2">🚫 Ràng buộc</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Ngày nghỉ phép</li>
                        <li>• Ngày OFF</li>
                        <li>• Yêu cầu đặc biệt</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 mb-2">📊 Lịch sử</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Số ca đã làm</li>
                        <li>• Thời gian nghỉ</li>
                        <li>• Hiệu suất làm việc</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Tính Toán Tối Ưu</h3>
                  <p className="text-gray-700 mb-4">
                    AI áp dụng thuật toán thông minh với nhiều tiêu chí:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">⚖️</span>
                        <div>
                          <p className="font-bold text-gray-900">Cân Bằng Công Bằng</p>
                          <p className="text-sm text-gray-700">Mọi nhân viên nhận số ca gần bằng nhau (±1 ca)</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🎯</span>
                        <div>
                          <p className="font-bold text-gray-900">Đáp Ứng Nhu Cầu</p>
                          <p className="text-sm text-gray-700">Đảm bảo đủ nhân sự cho mỗi ca, ưu tiên ca bận rộn</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🔄</span>
                        <div>
                          <p className="font-bold text-gray-900">Luân Phiên Ca</p>
                          <p className="text-sm text-gray-700">Tránh ai đó luôn làm ca tối hoặc ca khó</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">💤</span>
                        <div>
                          <p className="font-bold text-gray-900">Nghỉ Ngơi Hợp Lý</p>
                          <p className="text-sm text-gray-700">Không xếp quá nhiều ca liên tiếp, đảm bảo có ngày nghỉ</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">⭐</span>
                        <div>
                          <p className="font-bold text-gray-900">Ưu Tiên Kỹ Năng</p>
                          <p className="text-sm text-gray-700">Phân ca phù hợp với năng lực và kinh nghiệm</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 sm:p-12">
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Tạo Lịch Hoàn Chỉnh</h3>
                  <p className="text-gray-700 mb-4">
                    AI xuất ra lịch làm việc hoàn chỉnh cho cả tuần/tháng:
                  </p>
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📅</span>
                        <p className="text-gray-700">Lịch được điền đầy đủ cho tất cả ngày</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">👥</span>
                        <p className="text-gray-700">Mỗi nhân viên biết chính xác ca của mình</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">📊</span>
                        <p className="text-gray-700">Thống kê tổng ca cho từng người</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">✏️</span>
                        <p className="text-gray-700">Có thể xem trước và chỉnh sửa nếu cần</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How to Use */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Hướng Dẫn Sử Dụng
            </h2>
            <p className="text-lg text-gray-600">
              Chỉ 4 bước đơn giản để có lịch hoàn hảo
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Vào Trang Lịch Làm Việc</h3>
                  <p className="text-gray-700">
                    Menu bên trái → <strong>"Lịch Làm"</strong> → Chọn tuần/tháng cần sắp xếp
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nhấn "Sếp Lịch AI"</h3>
                  <p className="text-gray-700 mb-3">
                    Tìm nút <strong className="text-purple-600">"🤖 Sếp Lịch AI"</strong> ở góc trên bên phải
                  </p>
                  <div className="bg-white rounded-lg p-4 inline-block border border-purple-200">
                    <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-bold flex items-center gap-2 shadow-lg">
                      <span className="text-xl">🤖</span>
                      <span>Sếp Lịch AI</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-50 to-pink-100 rounded-2xl p-8 border-2 border-pink-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Cấu Hình Tùy Chọn</h3>
                  <p className="text-gray-700 mb-3">
                    Điều chỉnh các tham số theo nhu cầu (hoặc để mặc định):
                  </p>
                  <div className="bg-white rounded-lg p-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">Số người tối thiểu mỗi ca:</span>
                      <span className="font-semibold text-gray-900">2 người</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">Số ca tối đa mỗi người/tuần:</span>
                      <span className="font-semibold text-gray-900">5 ca</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200">
                      <span className="text-gray-700">Cho phép ca liên tiếp:</span>
                      <span className="font-semibold text-gray-900">Có (tối đa 3 ngày)</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-700">Tôn trọng ngày nghỉ:</span>
                      <span className="font-semibold text-gray-900">Bật</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-8 border-2 border-green-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Nhấn "Tạo Lịch" & Xong!</h3>
                  <p className="text-gray-700 mb-3">
                    AI sẽ xử lý trong vài giây và hiển thị lịch hoàn chỉnh
                  </p>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-semibold text-green-700">Lịch đã được tạo thành công!</p>
                    </div>
                    <p className="text-sm text-gray-600 ml-11">
                      • Xem trước lịch trên giao diện<br />
                      • Kiểm tra số ca cho từng nhân viên<br />
                      • Chỉnh sửa nếu cần thiết<br />
                      • Nhấn "Lưu" để áp dụng
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-xl shadow-lg">
              <span className="text-3xl">🎉</span>
              <div className="text-left">
                <p className="font-bold text-lg">Xong rồi!</p>
                <p className="text-sm text-blue-100">Lịch đã được sắp xếp hoàn hảo cho cả tháng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Tricks */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mẹo Sử Dụng Hiệu Quả
            </h2>
            <p className="text-lg text-gray-600">
              Tận dụng tối đa sức mạnh của Sếp Lịch AI
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cập Nhật Thông Tin Đầy Đủ</h3>
              <p className="text-gray-700 mb-3">
                Để AI hoạt động tốt nhất, đảm bảo:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 flex-shrink-0">✓</span>
                  <span>Cập nhật đầy đủ danh sách nhân viên</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 flex-shrink-0">✓</span>
                  <span>Tạo đủ số ca làm việc cần thiết</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 flex-shrink-0">✓</span>
                  <span>Đánh dấu ngày nghỉ phép trước</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 flex-shrink-0">✓</span>
                  <span>Ghi chú yêu cầu đặc biệt của nhân viên</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tạo Lại Nếu Không Hài Lòng</h3>
              <p className="text-gray-700 mb-3">
                Không thích lịch lần đầu? Đơn giản!
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 flex-shrink-0">✓</span>
                  <span>Nhấn "Tạo Lại" để AI sắp xếp phiên bản khác</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 flex-shrink-0">✓</span>
                  <span>AI sẽ cho ra kết quả khác nhưng vẫn công bằng</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 flex-shrink-0">✓</span>
                  <span>Tạo nhiều lần để chọn phiên bản ưng ý nhất</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 flex-shrink-0">✓</span>
                  <span>Không giới hạn số lần tạo lại</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">✏️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Chỉnh Sửa Linh Hoạt</h3>
              <p className="text-gray-700 mb-3">
                Lịch AI là nền tảng, bạn vẫn có thể:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>Đổi ca cho nhân viên cụ thể</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>Thêm/bớt người trong ca</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>Chuyển ai đó sang OFF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 flex-shrink-0">✓</span>
                  <span>Chỉnh sửa không làm mất cân bằng quá nhiều</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Xem Thống Kê</h3>
              <p className="text-gray-700 mb-3">
                Sau khi tạo lịch, kiểm tra:
              </p>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 flex-shrink-0">✓</span>
                  <span>Tổng ca của từng nhân viên (nên chênh lệch ≤ 1)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 flex-shrink-0">✓</span>
                  <span>Phân bố ca sáng/trưa/tối</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 flex-shrink-0">✓</span>
                  <span>Số ngày OFF của mỗi người</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-500 flex-shrink-0">✓</span>
                  <span>Có ai làm quá nhiều ca liên tiếp không</span>
                </li>
              </ul>
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
                <span>AI có thực sự công bằng không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  <strong>Có.</strong> AI sử dụng thuật toán tối ưu hóa toán học để đảm bảo mọi người nhận số ca gần bằng nhau (chênh lệch tối đa 1 ca). Không có thiên vị hay cảm tính như sắp xếp thủ công.
                </p>
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <span>AI có xét đến ngày nghỉ phép không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  <strong>Có.</strong> AI tự động bỏ qua các ngày bạn đã đánh dấu nghỉ phép hoặc OFF. Những ngày này sẽ không được gán ca cho nhân viên đó.
                </p>
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <span>Tôi có thể sửa lịch sau khi AI tạo không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  <strong>Hoàn toàn được!</strong> Lịch AI là gợi ý tối ưu. Bạn vẫn có thể chỉnh sửa bất kỳ ca nào, đổi người, thêm/bớt nhân viên theo ý muốn.
                </p>
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <span>AI có tính phí không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  Sếp Lịch AI là tính năng <strong>miễn phí</strong> cho gói Chuyên Nghiệp trở lên. Gói Cơ Bản có giới hạn 5 lần tạo lịch/tháng.
                </p>
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-between">
                <span>Tôi có thể tạo lại nhiều lần không?</span>
                <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-gray-700">
                  <strong>Có.</strong> Bạn có thể tạo lại không giới hạn cho đến khi hài lòng. Mỗi lần AI sẽ cho ra phiên bản khác nhau nhưng vẫn đảm bảo công bằng.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="text-6xl mb-6">🤖</div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Trải Nghiệm Sếp Lịch AI Ngay
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Tiết kiệm 95% thời gian sắp xếp lịch. Công bằng 100%
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all"
            >
              Dùng Thử Miễn Phí
            </a>
            <Link
              href="/help/bat-dau"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all"
            >
              Hướng Dẫn Bắt Đầu
            </Link>
          </div>
        </div>
      </div>
    </HelpLayout>
  );
}
