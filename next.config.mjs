/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ["i.imgur.com", "i.stack.imgur.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    reactStrictMode: false
};

export default nextConfig;
