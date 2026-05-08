import type { Metadata } from 'next';
import localFont from 'next/font/local';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CartProvider } from '@/store/cart-context';
import { UfoCompanion } from '@/components/effects/UfoCompanion';
import { CustomCursor } from '@/components/effects/CustomCursor';

import '@/styles/globals.scss';

/**
 * Glancyr — primary brand typeface.
 * Drop the .woff2 files into `public/fonts/glancyr/` (see README in that folder).
 */
const glancyr = localFont({
  src: [
    { path: '../public/fonts/glancyr/Glancyr-Regular.otf',  weight: '400', style: 'normal' },
    { path: '../public/fonts/glancyr/Glancyr-Medium.otf',   weight: '500', style: 'normal' },
    { path: '../public/fonts/glancyr/Glancyr-SemiBold.otf', weight: '600', style: 'normal' },
    { path: '../public/fonts/glancyr/Glancyr-Bold.otf',     weight: '700', style: 'normal' },
  ],
  variable: '--font-glancyr',
  display: 'swap',
  fallback: ['Space Grotesk', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
});

/* NOTE: previously imported Space_Mono via `next/font/google` — that runs a
   network fetch to fonts.gstatic.com at build time, which fails inside CI
   build containers (Vercel) when the network is restricted. We now use the
   OS monospace stack via the SCSS `$font-mono` variable. If you want a
   custom mono later, drop the .woff2 files into `public/fonts/mono/` and
   add another `localFont(...)` block here. */

export const metadata: Metadata = {
  metadataBase: new URL('https://houseofaliens.com'),
  title: {
    default: 'House of Aliens | Futuristic Streetwear',
    template: '%s | House of Aliens',
  },
  description:
    'Discover bold, futuristic clothing from another dimension. Limited edition streetwear for those who dare to be different.',
  keywords: ['streetwear', 'futuristic fashion', 'house of aliens', 'limited edition clothing'],
  authors: [{ name: 'House of Aliens' }],
  creator: 'House of Aliens',
  openGraph: {
    type: 'website',
    siteName: 'House of Aliens',
    title: 'House of Aliens | Futuristic Streetwear',
    description: 'Discover bold, futuristic clothing from another dimension.',
    images: [{ url: '/brand/og.jpg', width: 1200, height: 630, alt: 'House of Aliens' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'House of Aliens | Futuristic Streetwear',
    description: 'Discover bold, futuristic clothing from another dimension.',
    images: ['/brand/og.jpg'],
  },
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={glancyr.variable}>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <UfoCompanion />
          <CustomCursor />
        </CartProvider>
      </body>
    </html>
  );
}
