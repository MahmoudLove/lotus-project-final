import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { Header, Footer } from '@/components';
import { Oswald } from 'next/font/google';
import { CartProvider } from 'react-use-cart';

import '@/styles/globals.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const oswald = Oswald({ subsets: ['latin'], display: 'swap', weight: ['400', '700'] });

export default function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <CartProvider>
      <div className={`${oswald.className}`}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </CartProvider>
  );
}
