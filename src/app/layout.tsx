import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {NextUIProvider} from '@nextui-org/react'
import {ThemeProvider as NextThemesProvider} from "next-themes";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute : "",
    default : "BestGoogleSites",
    template : "%s | BestGoogleSites"
  },
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className={inter.className}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <ThemeSwitcher/>
        {children}
      </NextThemesProvider>
    </NextUIProvider>
    </body>
    </html>
  );
}
