"use client";

import { Dialog } from "@ui";
import { DialogContent } from "../../ui/dialog";
import { cn } from "@lib";
import { useRouter } from "next/navigation";
import { ChooseProductModal, ChoosePizzaModal } from "@components";
import { ProductWithRelations } from "../../../@types/product";
import { useCartStore } from "../../../store";

interface Props {
   product: ProductWithRelations;
   className?: string;
}

export const ChooseProduct: React.FC<Props> = ({ product, className }) => {
   const router = useRouter();
   const firstItem = product.variants[0];
   const isPizzaForm = Boolean(firstItem.pizzaType);
   const addCartItem = useCartStore(state => state.addCartItem);

   const onAddProduct = () => {
      addCartItem({ productVarId: firstItem.id });
   };

   const onAddPizza = async (productVarId: number, ingredients: number[]) => {
      try {
         await addCartItem({ productVarId, ingredients });
      } catch (error) {
         console.log(error);
      }
   };

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
                  ingredients={product.ingredients}
                  variants={product.variants}
                  onSubmit={onAddPizza}
               />
            ) : (
               <ChooseProductModal
                  imageUrl={product.imageUrl}
                  name={product.name}
                  onSubmit={onAddProduct}
                  price={firstItem.price}
               />
            )}
         </DialogContent>
      </Dialog>
   );
};
