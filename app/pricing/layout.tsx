import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bảng Giá - diemdanh.net | Gói Chấm Công Phù Hợp Với Mọi Quy Mô",
  description: "Xem bảng giá diemdanh.net: Gói Cửa Hàng 79K/tháng (9 nhân viên), Gói Doanh Nghiệp 179K/tháng (30 nhân viên), Gói Chuỗi 279K/tháng (không giới hạn). Dùng thử miễn phí 7 ngày.",
  keywords: "bảng giá điểm danh, giá chấm công, chi phí quản lý nhân viên, gói dịch vụ điểm danh, pricing",
  openGraph: {
    title: 'Bảng Giá - diemdanh.net',
    description: 'Gói từ 79K/tháng. Dùng thử miễn phí 7 ngày. Không ràng buộc dài hạn.',
    url: '/pricing',
    type: 'website',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
