import type { Metadata } from "next";
import { Geist, Geist_Mono,Inter,Poppins,Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import ThemeProvider from "./context/ThemeContext";
import Header from "../components/Header";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


// Define fonts
const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Specify weights you need
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  weight: ['400', '700'],
});



export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: "GetImage - AI-Powered Image Generation",
    template: "%s | GetImage",
  },
  description:
    "Create stunning AI-generated images with GetImage. Enter a prompt and watch your ideas come to life in seconds. Developed by Sai Kumar.",
  keywords: ["AI image generation", "GetImage", "text to image", "AI art", "Sai Kumar", "image creation"],
  authors: [{ name: "Sai Kumar" }],
  creator: "Sai Kumar",
  publisher: "Sai Kumar",

  // Favicon and icons (visible in browser tab)
  icons: {
    icon: "/web.png", // Path to your favicon
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  // Open Graph metadata (for social media sharing)
  openGraph: {
    title: "GetImage - AI-Powered Image Generation",
    description:
      "Generate beautiful images from text prompts with GetImage, an AI-powered tool by Sai Kumar. Try it now!",
    url: "https://get-image-mu.vercel.app", // Replace with your actual site URL
    siteName: "GetImage",
    images: [
      {
        url: "/og-image.jpg", // Path to an Open Graph image (e.g., 1200x630px)
        width: 1200,
        height: 630,
        alt: "GetImage - AI Image Generation",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Twitter metadata (for Twitter cards)
  twitter: {
    card: "summary_large_image",
    title: "GetImage - AI-Powered Image Generation",
    description:
      "Generate stunning images with GetImage, an AI-powered tool by Sai Kumar. Enter a prompt and create in seconds!",
    creator: "@Devaa_Sai", // Replace with your Twitter handle
    images: ["/twitter-image.jpg"], // Path to a Twitter card image (e.g., 1200x600px)
  },

  // Additional metadata
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  alternates: {
    canonical: "https://get-image-mu.vercel.app", // Replace with your actual site URL
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
<ThemeProvider>
<html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${poppins.variable} ${playfair.variable} antialiased`}
      >
    <Header/>
        {children}
      </body>
    </html>
</ThemeProvider>
   
    

    </ClerkProvider>
  );
}
