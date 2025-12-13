import mdx from "@next/mdx";

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  transpilePackages: ["next-mdx-remote"],
  outputFileTracingIncludes: {
    '/api/music': [
      './node_modules/cheerio/**/*',
      './node_modules/yt-search/**/*',
      './node_modules/domutils/**/*',
      './node_modules/domhandler/**/*',
      './node_modules/htmlparser2/**/*',
      './node_modules/cheerio-select/**/*',
      './node_modules/dom-serializer/**/*',
      './node_modules/parse5/**/*',
      './node_modules/parse5-htmlparser2-tree-adapter/**/*',
      './node_modules/parse5-parser-stream/**/*',
      './node_modules/undici/**/*',
      './node_modules/whatwg-mimetype/**/*',
      './node_modules/encoding-sniffer/**/*',
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Ensure cheerio and yt-search are bundled for serverless
      config.externals = config.externals || [];
      const externals = Array.isArray(config.externals)
        ? config.externals
        : [config.externals];

      config.externals = externals.map((external) => {
        if (typeof external === 'function') {
          return (context, request, callback) => {
            // Don't externalize cheerio or yt-search
            if (request === 'cheerio' || request === 'yt-search') {
              return callback();
            }
            return external(context, request, callback);
          };
        }
        return external;
      });
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "*.mzstatic.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "**",
      },
    ],
  },
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default withMDX(nextConfig);
