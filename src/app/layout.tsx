import type { Metadata } from "next";
import clsx from "clsx";
import { Onest, Montserrat } from "next/font/google";
import "./css/globals.scss";

const OnestFont = Onest({
  variable: "--font-onest-sans",
  subsets: ["latin"],
});
const MontserratFont = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EcoBit",
  description: "P2P маркет",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(OnestFont.variable, MontserratFont.variable)}>
        {children}
      </body>
    </html>
  );
}
