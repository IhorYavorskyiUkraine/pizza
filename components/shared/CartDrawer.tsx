import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
   SheetFooter,
} from "../ui/sheet";
import { Button } from "@ui*";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Props {
   className?: string;
   children: React.ReactNode;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
   className,
   children,
}) => {
   return (
      <Sheet>
         <SheetTrigger asChild>{children}</SheetTrigger>
         <SheetContent className="flex flex-col justify-between bg-[#F4F1EE] pb-0">
            <SheetHeader>
               <SheetTitle>
                  В корзине <span className="font-bold">{3} товара</span>
               </SheetTitle>
            </SheetHeader>
            =
            <SheetFooter className="-mx-6 bg-white p-8">
               <div className="w-full">
                  <div className="mb-4 flex">
                     <span className="flex flex-1 text-lg text-neutral-500">
                        Итого
                        <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                     </span>

                     <span className="text-lg font-bold">{500} UAH</span>
                  </div>

                  <Link href="/cart">
                     <Button
                        // onClick={() => setRedirecting(true)}
                        // loading={loading || redirecting}
                        type="submit"
                        className="h-12 w-full text-base"
                     >
                        Оформить заказ
                        <ArrowRight className="ml-2 w-5" />
                     </Button>
                  </Link>
               </div>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   );
};
