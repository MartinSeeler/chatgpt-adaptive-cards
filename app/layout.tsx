import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import "./globals.css";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ChatGPT-like Interface",
  description: "A ChatGPT-like interface built with Next.js and Material-UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          src="https://unpkg.com/markdown-it/dist/markdown-it.min.js"
          async
        ></script>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </head>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <Navbar />
            {children}
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
