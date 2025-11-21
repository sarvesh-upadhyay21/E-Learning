/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  // remove basePath/assetPrefix if you serve at domain root on Vercel
  // basePath: isProd ? "/E-learning" : "",
  // assetPrefix: isProd ? "/E-learning/" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
