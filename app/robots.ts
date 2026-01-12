import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://diemdanh.net';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/auth/', '/owner/', '/checkin/', '/history/', '/settings/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
