import { cn } from "@lib";
import React from "react";

import { CartButton, Container, SearchInput } from "@components";
import { Button } from "@ui";
import { User, ShoppingCart, ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";

interface Props {
   className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
   return (
      <header className={cn(className, "border border-b")}>
         <Container className="flex items-center justify-between py-8">
            <Link href="/">
               <div className="flex items-center gap-4">
                  <Image src="/logo.png" width={35} height={35} alt="logo" />
                  <div>
                     <h1 className="text-2xl font-black uppercase">Pizza</h1>
                     <p className="text-sm leading-3 text-gray-400">
                        вкусней уже некуда
                     </p>
                  </div>
               </div>
            </Link>

            <div className="mx-10 flex-1">
               <SearchInput />
            </div>

            <div className="flex items-center gap-3">
               <Button variant="outline" className="flex items-center gap-1">
                  <User size={16} />
                  Войти
               </Button>
               <CartButton />
            </div>
         </Container>
      </header>
   );
};
