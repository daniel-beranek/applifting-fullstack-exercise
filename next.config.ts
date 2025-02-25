import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/articles/1',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
