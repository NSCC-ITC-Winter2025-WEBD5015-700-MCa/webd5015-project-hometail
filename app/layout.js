import "./globals.css";
import { auth } from "@/auth";
import SessionProvider from "@/utils/SessionProvider";
import { Theme } from "../utils/ThemeProvider";
import NextTopLoader from "nextjs-toploader";

export const metadata = {
  title: "HomeTail",
  description: "description",
};

export default async function RootLayout({ children }) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-[#1D232A]">
        <NextTopLoader />
        <SessionProvider session={session}>
          <Theme>{children}</Theme>
        </SessionProvider>
      </body>
    </html>
  );
}
