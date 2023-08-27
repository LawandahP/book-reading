/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      BACKEND_URL: "http://localhost:8000"
    },
    output: "standalone",

  }
  
module.exports = nextConfig
  