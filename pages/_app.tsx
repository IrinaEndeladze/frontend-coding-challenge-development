import React from 'react';
import { Providers } from 'components/ui/providers';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className={`${inter.variable} font-inter antialiased bg-slate-100 text-slate-600`}>
      <React.StrictMode>
        <Component {...pageProps} />
      </React.StrictMode>
    </div>
  );
}
