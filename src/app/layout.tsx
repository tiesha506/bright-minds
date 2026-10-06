import type { Metadata, Viewport } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BrightMinds — Learn, Play & Grow",
  description:
    "A friendly learning platform for ages 6–15. Lessons, quizzes and worksheets that adapt to every student's age and level.",
  keywords: [
    "learning",
    "education",
    "kids",
    "students",
    "adaptive learning",
    "quizzes",
    "worksheets",
  ],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "BrightMinds — Learn, Play & Grow",
    description:
      "A friendly learning platform for ages 6–15 that adapts to every student.",
    siteName: "BrightMinds",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f472b6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${nunito.variable} ${fredoka.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          themes={["light", "dark", "eye-friendly"]}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
