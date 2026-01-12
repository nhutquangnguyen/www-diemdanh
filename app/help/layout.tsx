import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trung Tâm Trợ Giúp - DiemDanh.net | Hướng Dẫn Sử Dụng Điểm Danh",
  description: "Hướng dẫn chi tiết cách sử dụng DiemDanh.net: Điểm danh GPS, Sếp lịch AI, quản lý nhân viên. Dùng thử miễn phí 7 ngày. Hỗ trợ 24/7.",
  keywords: "hướng dẫn điểm danh, cách sử dụng chấm công, trợ giúp diemdanh, tài liệu hướng dẫn",
  openGraph: {
    title: 'Trung Tâm Trợ Giúp - DiemDanh.net',
    description: 'Hướng dẫn đầy đủ để bắt đầu sử dụng hệ thống điểm danh thông minh',
    url: '/help',
    type: 'website',
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
