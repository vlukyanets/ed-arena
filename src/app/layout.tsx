import type { Metadata } from 'next';
import './globals.css';
import AppProviders from '@/components/providers/AppProviders';
import Navbar from '@/components/Navbar';
import { Inter } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Ed Arena',
  description: 'Training platform for school subjects',
};

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
        style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <AppProviders>
          <Navbar />
          <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
