/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "platform-lookaside.fbsbx.com",
      "image-cdn-ak.spotifycdn.com",
      "image-cdn-fa.spotifycdn.com",
      "i.scdn.co",
      "mosaic.scdn.co",
      "charts-images.scdn.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
