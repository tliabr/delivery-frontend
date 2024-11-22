import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    env: {
        NEXT_PUBLIC_BACKEND_URL: 'http://localhost:3000',
    },
}
export default nextConfig;
