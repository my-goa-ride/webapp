import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // One address for the whole site: mygoaride.com/<anything> goes to www.mygoaride.com/<anything>,
      // so search engines don't index two copies.
      {
        source: "/:path*",
        has: [{ type: "host", value: "mygoaride.com" }],
        destination: "https://www.mygoaride.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
