/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig = {
  basePath: isProd ? "/E-learning" : "",
  assetPrefix: isProd ? "/E-learning/" : "",
  ...(isGhPages ? { output: "export" } : {}), // only use export when DEPLOY_TARGET=gh-pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
