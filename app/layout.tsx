import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "diemdanh.net - Hệ Thống Điểm Danh Thông Minh",
  description: "Giải pháp chấm công hiện đại với QR code, selfie và xác thực vị trí GPS. Quản lý nhân viên, lịch làm việc thông minh. Dùng thử miễn phí 7 ngày.",
  keywords: "điểm danh, chấm công, quản lý nhân viên, GPS, lịch làm việc, AI, chấm công thông minh, QR code điểm danh",
  authors: [{ name: "diemdanh.net" }],
  creator: "diemdanh.net",
  publisher: "diemdanh.net",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://diemdanh.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: '/',
    title: 'diemdanh.net - Hệ Thống Điểm Danh Thông Minh',
    description: 'Giải pháp chấm công hiện đại với GPS, QR code và AI. Dùng thử miễn phí 7 ngày.',
    siteName: 'diemdanh.net',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'diemdanh.net - Hệ Thống Điểm Danh Thông Minh',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'diemdanh.net - Hệ Thống Điểm Danh Thông Minh',
    description: 'Giải pháp chấm công hiện đại với GPS, QR code và AI. Dùng thử miễn phí 7 ngày.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Removed 'force-dynamic' to enable static generation for marketing pages
// Only dynamic routes (like /s/[id]) will be server-rendered
// This dramatically improves performance by enabling caching

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'diemdanh.net',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'VND',
      lowPrice: '79000',
      highPrice: '279000',
      offerCount: '3',
      priceSpecification: [
        {
          '@type': 'UnitPriceSpecification',
          price: '79000',
          priceCurrency: 'VND',
          name: 'Gói Cửa Hàng',
          billingIncrement: 'month',
        },
        {
          '@type': 'UnitPriceSpecification',
          price: '179000',
          priceCurrency: 'VND',
          name: 'Gói Doanh Nghiệp',
          billingIncrement: 'month',
        },
        {
          '@type': 'UnitPriceSpecification',
          price: '279000',
          priceCurrency: 'VND',
          name: 'Gói Chuỗi Hệ Thống',
          billingIncrement: 'month',
        },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '500',
    },
    description: 'Hệ thống điểm danh và quản lý nhân viên thông minh với GPS, QR code và AI',
    softwareVersion: '1.0',
    provider: {
      '@type': 'Organization',
      name: 'Công ty Cổ Phần Thương Mại OBN',
      legalName: 'Công ty Cổ Phần Thương Mại OBN',
      taxID: '0317247895',
      url: 'https://diemdanh.net',
      logo: 'https://diemdanh.net/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '39/7 đường 23, P.Hiệp Bình Chánh',
        addressLocality: 'TP. Thủ Đức',
        addressRegion: 'TP. Hồ Chí Minh',
        addressCountry: 'VN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'office.obn@gmail.com',
        telephone: '+84787774949',
        contactType: 'Customer Service',
        availableLanguage: 'Vietnamese',
      },
    },
  };

  return (
    <html lang="vi">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
