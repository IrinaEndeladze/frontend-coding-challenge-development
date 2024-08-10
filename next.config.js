/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: [],
  },
  distDir: 'dist',
  env: {
    baseUrl: 'http://localhost:3001',
  },
};

module.exports = nextConfig;
