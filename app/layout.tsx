import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Diemdanh.net - Hệ Thống Điểm Danh Thông Minh",
  description: "Giải pháp chấm công hiện đại với QR code, selfie và xác thực vị trí GPS",
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
