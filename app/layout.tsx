import './globals.css';
import type { Metadata } from 'next';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Smart Hospital - AI-Powered Healthcare Management',
  description: 'Digital queue management, AI chatbot assistant, telemedicine, and comprehensive healthcare solutions',
  keywords: 'hospital, healthcare, AI chatbot, telemedicine, appointment booking, queue management',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
