import type { NextConfig } from "next";

const secretUrl = process.env.Secret || "";
let wpHost = "localhost";

if (secretUrl) {
  try {
    const urlString = secretUrl.startsWith("http") ? secretUrl : `http://${secretUrl}`;
    const parsed = new URL(urlString);
    wpHost = parsed.hostname;
  } catch (e) {
    console.warn("Failed to parse Secret environment variable for next-image configurations:", e);
  }
}

const isLocalHost = wpHost === "localhost" || 
                    wpHost === "127.0.0.1" || 
                    wpHost.startsWith("192.168.") || 
                    wpHost.startsWith("10.") || 
                    wpHost.startsWith("172.");

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: isLocalHost,
    remotePatterns: [
      {
        protocol: "http",
        hostname: wpHost,
      },
      {
        protocol: "https",
        hostname: wpHost,
      },
    ],
  },
};

export default nextConfig;
