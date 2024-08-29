import type { Metadata } from "next";
import { Header } from "../../shared/components/shared";

export const metadata: Metadata = {
   title: "Create Next App",
   description: "Generated by create next app",
};

export default function MainLayout({
   children,
   modal,
}: Readonly<{
   children: React.ReactNode;
   modal: React.ReactNode;
}>) {
   return (
      <main className="min-h-screen">
         <Header />
         {children}
         {modal}
      </main>
   );
}
