import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // rewrites: async () => {
  //   console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  //   return [
  //     {
  //       source: "/api/leads/:path*",
  //       destination: "http://localhost:8080/api/leads/", // Proxy to Backend  Server  (http://localhost:8080)
  //     },
  //   ];
  // },
};

export default nextConfig;
