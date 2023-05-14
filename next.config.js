/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: "https://blogapp-server.netlify.app/.netlify/functions/",
    JWT_SECRET:"blogApp10986$3Test725625"

  },
  reactStrictMode: true,
}

module.exports = nextConfig