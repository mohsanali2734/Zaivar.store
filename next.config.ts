const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "loremflickr.com" },
      { protocol: "https", hostname: "**.staticflickr.com" },
    ],
  },
};
export default nextConfig;