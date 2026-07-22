import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = `${process.env.FRONTEND_URL!}`;

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: [
                '/_next/',
                '/admin/',
                '/private/',
                '/public/assets',
                '/public',
                '/assets'
            ],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}