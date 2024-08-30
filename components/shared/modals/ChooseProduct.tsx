"use client";

import { Dialog } from "../../ui";
import { DialogContent } from "../../ui/dialog";
import { cn } from "../../../lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductModal } from "../ChooseProductModal";
import { ProductWithRelations } from "../../../@types/product";
import { ChoosePizzaModal } from "../ChoosePizzaModal";

interface Props {
   product: ProductWithRelations;
   className?: string;
}

export const ChooseProduct: React.FC<Props> = ({ product, className }) => {
   const router = useRouter();
   const isPizzaForm = Boolean(product.variants[0].pizzaType);

   return (
      <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
         <DialogContent
            className={cn(
               className,
               "min-h-[500px] w-[1060px] max-w-[1060px] overflow-hidden bg-white p-0",
            )}
         >
            {isPizzaForm ? (
               <ChoosePizzaModal
                  imageUrl={product.imageUrl}
                  name={product.name}
                  ingredients={[]}
               />
            ) : (
               <ChooseProductModal
                  imageUrl={product.imageUrl}
                  name={product.name}
               />
            )}
         </DialogContent>
      </Dialog>
   );
};
