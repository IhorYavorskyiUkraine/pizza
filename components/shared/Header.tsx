import { cn } from "@lib/utils";
import React from "react";

import { Container } from "./Container";
import { Button } from "../ui";
import { User, ShoppingCart, ArrowRight } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import { SearchInput } from "./SearchInput";

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
                     <h1 className="text-2xl font-black uppercase">
                        Next Pizza
                     </h1>
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
               <div>
                  <Button className="group relative">
                     <p>510 UAH</p>
                     <span className="mx-3 h-full w-[1px] bg-white/30" />
                     <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                        <ShoppingCart
                           size={16}
                           className="relative"
                           strokeWidth={2}
                        />
                        <b>3</b>
                     </div>
                     <ArrowRight
                        size={20}
                        className="absolute right-5 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                     />
                  </Button>
               </div>
            </div>
         </Container>
      </header>
   );
};
