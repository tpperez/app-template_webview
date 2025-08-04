import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${process.env.BASE_URL}/sitemap.xml`,
  }
}

// check the documentation for more options:
// https://nextjs.org/docs/app/api-reference/functions/metadata-route#robots
