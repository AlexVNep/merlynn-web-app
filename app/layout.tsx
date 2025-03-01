"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // For redirecting
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation"; // Use usePathname to get current path

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Make sure SessionProvider is wrapping the entire layout
    <SessionProvider>
      <SessionWrapper>{children}</SessionWrapper>
    </SessionProvider>
  );
}

// Wraps the content and ensures session is checked
function SessionWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession(); // Get session data and status
  const router = useRouter(); // Router for redirect
  const pathname = usePathname(); // Get the current pathname using usePathname

  useEffect(() => {
    // If session is loading, no action should be taken
    if (status === "loading") return;

    // If no session exists and we're not on the login page, redirect to login
    if (!session && pathname !== "/login") {
      router.push("/login");
    }
  }, [session, status, pathname, router]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="mx-auto max-w-screen-lg h-screen flex flex-col">
          <Navbar />
          <div className="flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
