import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Make `@use 'abstracts' as *;` resolvable from any .module.scss file.
  // We deliberately do NOT use `prependData` because it would create a
  // circular import inside the abstracts partials themselves.
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    // Disable the /_next/image optimizer. Two reasons:
    //   1. The project path contains spaces ("/Volumes/Extreme SSD/...") and
    //      large source files which can make the optimizer 400 in dev.
    //   2. We're serving original-quality editorial photography — no need to
    //      proxy through the optimizer for transcoding.
    // With this on, <Image> still gives responsive sizing + lazy loading,
    // it just fetches the original file from /public directly.
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.houseofaliens.com' },
    ],
  },
};

export default nextConfig;
