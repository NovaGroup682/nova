import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['framer-motion'],
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/ // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack']
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    // Optimize cache for large assets
    // config.cache = {
    //   ...config.cache,
    //   type: process.env.NODE_ENV === 'development' ? 'memory' : 'filesystem',
    //   compression: 'gzip',
    //   maxMemoryGenerations: 1
    // };

    // Suppress webpack cache warnings
    config.infrastructureLogging = {
      ...config.infrastructureLogging,
      level: 'error'
    };

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com'
      }
    ]
  }
};

export default nextConfig;
