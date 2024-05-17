import "./globals.css";
import Container from "@/components/Container";
import Footer from "@/components/Footer";
import NavigationHandler from "@/components/navigation/NavigationHandler";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Let's Wichtel",
  description:
    "Die ultimative Plattform für die Organisation und Durchführung von Wichtelaktionen.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="bg-background flex min-h-screen flex-col">
        <NavigationHandler />
        <Container>{children}</Container>
        <Footer />
        <Toaster position="top-right" expand={true} richColors />
      </body>
    </html>
  );
}
