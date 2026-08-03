import './globals.css';
import LanguageProvider from '@/components/LanguageProvider';

export const metadata = {
  title: 'Deshatan — Ghoomo Poora Bharat · 28 States · 8 Territories · Nepal & Bhutan',
  description:
    'Plan and book a trip anywhere in India, Nepal or Bhutan: verified guides, trusted drivers, real stays, live tracking and a calculator that turns your dream trip into a real number.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Rozha+One&family=Mukta:wght@400;500;600;700&family=Yatra+One&family=Noto+Sans+Bengali:wght@400;600;700&family=Noto+Sans+Telugu:wght@400;600;700&family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans+Gujarati:wght@400;600;700&family=Noto+Sans+Kannada:wght@400;600;700&family=Noto+Sans+Oriya:wght@400;600;700&family=Noto+Nastaliq+Urdu:wght@400;600;700&display=swap"
        />
      </head>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
