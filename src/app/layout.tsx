'use client';
import { ReactNode } from 'react';
import Image from 'next/image';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-white">
        <div className="relative min-h-screen h-auto">
          <main className="mx-auto lg:px-120 px-24 max-w-1440 h-full z-1">
            {children}
          </main>
          <footer className="absolute bottom-0 w-full h-auto z-0">
            <Image
              src="/images/footer.png"
              alt="Footer Image"
              width={100}
              height={100}
              sizes="(100vw, auto)"
              objectFit="cover"
              className="h-full w-full md:block hidden z-0"
            />
            <Image
              src="/images/footer-mobile.png"
              alt="Footer Image"
              width={100}
              height={100}
              sizes="(100vw, auto)"
              objectFit="cover"
              className="h-full w-full md:hidden block z-0"
            />
          </footer>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
