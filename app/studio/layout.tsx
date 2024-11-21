import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Studio for SecondLife',
  description: 'E-shop Studio Sanity',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
