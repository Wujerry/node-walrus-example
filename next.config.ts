import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  outputFileTracingIncludes: {
    '/api/walrus': ['./node_modules/node-walrus/bin/walrusjs'],
  },
}

export default nextConfig
