import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import Header from '@/components/Header';
import { SanityLive } from '@/sanity/lib/live';
import { draftMode } from 'next/headers';
import DisableDraftModeButton from '@/components/DisableDraftModeButton';
import { VisualEditing } from 'next-sanity';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: '../fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'SecondLife',
  description: 'Quality shopping has never been so easy',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {(await draftMode()).isEnabled && (
            <>
              <DisableDraftModeButton />
              <VisualEditing />
            </>
          )}
          <main>
            <Header />
            {children}
          </main>

          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
