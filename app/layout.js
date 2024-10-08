import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SessionWrapper from "./components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BuyMeACoffee",
  description: "A CrowdFunding Website for People's Favourate Person",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <SessionWrapper>
          <Navbar />
          <div className="min-h-full bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
            {children}
          </div>
          <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}
