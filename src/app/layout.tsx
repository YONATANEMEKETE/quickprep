import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Anek_Devanagari, Copse } from 'next/font/google';
import Nav from '@/components/Nav';
import { BgShapeOne } from '@/components/ui/bg-shapes';
import { Toaster } from '@/components/ui/sonner';
import Footer from '@/components/Footer';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const anek = Anek_Devanagari({
  subsets: ['latin'],
  variable: '--main-font',
});

const copse = Copse({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--normal-font',
});

export const metadata: Metadata = {
  title: 'QuickPrep | Generate Notes and Sample Questions',
  description:
    'A web application that lets users upload PDF files to generate summarized notes and sample questions.',
  keywords: [
    'PDF uploader',
    'note generator',
    'question generator',
    'study helper',
    'automated summarization',
    'AI-driven questions',
  ],
  openGraph: {
    type: 'website',
    title: 'QuickPrep | Generate Notes and Sample Questions',
    description:
      'Easily upload your PDF documents to create summarized notes and sample questions with AI assistance.',
    images: 'https://ik.imagekit.io/6qizpphtd1/OgImages/QuickPrep1.png',
    url: 'https://quickprepp.vercel.app',
    locale: 'en_US',
    siteName: 'QuickPrep',
  },
  authors: [
    {
      name: 'YONATANE MEKETE',
      url: 'https://www.linkedin.com/in/yonatanemekete',
    },
  ],
  creator: 'YONATANE MEKETE',
  applicationName: 'QuickPrep',
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anek.variable} ${copse.variable} antialiased min-h-screen bg-myaccent05 bg-opacity-80`}
      >
        <Toaster closeButton richColors />
        <BgShapeOne />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
