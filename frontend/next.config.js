// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: ['localhost'],
//     deviceSizes: [320, 420, 768, 1024, 1200],
    
//   },
// }

// module.exports = nextConfig
 /** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,  // Add this line to bypass Next.js image optimization
    domains: ['localhost'],
    deviceSizes: [320, 420, 768, 1024, 1200],
  },
}

module.exports = nextConfig

