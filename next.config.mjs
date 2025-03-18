/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.externals = [
      ...(config.externals || []),
      {
        "utf-8-validate": "commonjs utf-8-validate",
        bufferutil: "commonjs bufferutil",
      },
    ];

    return config;
  },
  images: {
    domains: ["uploadthing.com", "utfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.uploadthing.com",
      },
      {
        protocol: "https",
        hostname: "**.utfs.io",
      },
      {
        protocol: "https",
        hostname: "**.discordapp.com",
      },
    ],
  },
  experimental: {
    esmExternals: "loose",
  },
};

export default nextConfig;
