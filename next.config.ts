import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/articles',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
