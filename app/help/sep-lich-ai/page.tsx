'use client';

import HelpLayout from '@/components/HelpLayout';
import Link from 'next/link';

export default function SepLichAIPage() {
  return (
    <HelpLayout>
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-4">🤖</div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Xếp lịch AI
            </h1>
            <p className="text-lg md:text-xl text-purple-100">
              AI tự động sắp xếp lịch công bằng, tối ưu cho toàn bộ nhân viên
            </p>
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold mb-1">95%</div>
              <p className="text-sm text-blue-100">Tiết kiệm thời gian</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold mb-1">100%</div>
              <p className="text-sm text-purple-100">Công bằng</p>
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 text-white rounded-xl p-5 text-center">
              <div className="text-3xl font-bold mb-1">5s</div>
              <p className="text-sm text-pink-100">Hoàn thành</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="text-3xl mb-3">✓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Lợi Ích</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Tự động phân ca đều cho mọi nhân viên</li>
                <li>• Tôn trọng lịch rảnh và ngày nghỉ</li>
                <li>• Đảm bảo đủ người cho mỗi ca</li>
                <li>• Có thể chỉnh sửa sau khi tạo</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">AI Thông Minh</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Thuật toán tối ưu hóa toán học</li>
                <li>• Cân bằng số ca cho từng người</li>
                <li>• Luân phiên ca sáng/trưa/tối</li>
                <li>• Xử lý trong vài giây</li>
              </ul>
            </div>
          </div>
        </div>
      </div>


      {/* How to Use */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Hướng Dẫn Sử Dụng
            </h2>
            <p className="text-gray-600">
              3 bước đơn giản để tạo lịch tự động
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border-2 border-blue-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Nhập Số Lượng Nhân Viên Cần</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Menu <strong>"Mở rộng"</strong> → <strong>"Xếp lịch AI"</strong> → Nhập số người cần cho mỗi ca (Ca sáng, Ca trưa, Ca tối)
                  </p>
                  <p className="text-xs text-gray-500">💡 Có nút "Áp dụng cho tất cả" để nhanh hơn</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-purple-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Chọn Lịch Rảnh Cho Nhân Viên</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Chọn ca mà mỗi nhân viên có thể làm việc. Dùng các nút nhanh: <strong>Tất cả tuần</strong>, <strong>T2-T6</strong>, <strong>T7-CN</strong>
                  </p>
                  <p className="text-xs text-gray-500">💡 Ca xanh = có thể làm, xám = không thể</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border-2 border-green-200 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Xem Thống Kê & Lưu</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    AI tính toán và hiển thị thống kê: <strong>Độ phủ</strong>, <strong>Công bằng</strong>, <strong>Giờ TB</strong>, và <strong>Cảnh báo</strong>
                  </p>
                  <p className="text-xs text-gray-500">💡 Kiểm tra cảnh báo (nếu có) và nhấn "Lưu & Tiếp"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* FAQ */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Câu Hỏi Thường Gặp
          </h2>
          <div className="space-y-3">
            <details className="bg-gray-50 rounded-lg overflow-hidden">
              <summary className="px-5 py-3 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100">
                AI có thực sự công bằng không?
              </summary>
              <div className="px-5 py-3 bg-white text-sm text-gray-700">
                <strong>Có.</strong> AI đảm bảo mọi người nhận số ca gần bằng nhau (chênh lệch tối đa 1 ca).
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg overflow-hidden">
              <summary className="px-5 py-3 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100">
                Tôi có thể sửa lịch sau khi AI tạo không?
              </summary>
              <div className="px-5 py-3 bg-white text-sm text-gray-700">
                <strong>Hoàn toàn được!</strong> Bạn vẫn có thể chỉnh sửa bất kỳ ca nào theo ý muốn.
              </div>
            </details>

            <details className="bg-gray-50 rounded-lg overflow-hidden">
              <summary className="px-5 py-3 cursor-pointer font-semibold text-gray-900 hover:bg-gray-100">
                Xếp lịch AI có tính phí không?
              </summary>
              <div className="px-5 py-3 bg-white text-sm text-gray-700">
                <strong>Miễn phí</strong> cho gói Chuyên Nghiệp. Gói Cơ Bản có giới hạn 5 lần/tháng.
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-600 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🤖</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Trải Nghiệm Xếp lịch AI Ngay
          </h2>
          <p className="text-lg text-purple-100 mb-6">
            Tiết kiệm 95% thời gian. Công bằng 100%
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/"
              className="px-6 py-3 bg-white text-purple-600 rounded-lg font-bold hover:shadow-xl transition"
            >
              Dùng Thử Miễn Phí
            </a>
            <Link
              href="/help/bat-dau"
              className="px-6 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-purple-600 transition"
            >
              Hướng Dẫn Bắt Đầu
            </Link>
          </div>
        </div>
      </div>
    </HelpLayout>
  );
}
