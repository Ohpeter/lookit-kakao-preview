// next.config.js
const repo = 'lookit-kakao-preview'
const isProd = process.env.NODE_ENV === 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',         // 정적 내보내기
  trailingSlash: true,      // /simulator/ 로 내보냄
  images: { unoptimized: true },
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',
}

module.exports = nextConfig
