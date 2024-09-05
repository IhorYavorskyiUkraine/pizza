"use client";

import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
   SheetFooter,
} from "../ui/sheet";
import { Button } from "@ui";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CartDrawerItem } from "./CartDrawerItem";
import { getCartItemDetails } from "@lib";
import { useEffect } from "react";
import { PizzaSize, PizzaType } from "../../constants/pizza";
import { useCartStore } from "../../store";

interface Props {
   className?: string;
   children: React.ReactNode;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
   className,
   children,
}) => {
   const [
      items,
      totalAmount,
      fetchCartItems,
      updateItemQuantity,
      removeCartItem,
   ] = useCartStore(state => [
      state.items,
      state.totalAmount,
      state.fetchCartItems,
      state.updateItemQuantity,
      state.removeCartItem,
   ]);

   useEffect(() => {
      fetchCartItems();
   }, []);

   const onClickCountButton = (
      type: "plus" | "minus",
      id: number,
      quantity: number,
   ) => {
      const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
      updateItemQuantity(id, newQuantity);
   };

   return (
      <Sheet>
         <SheetTrigger asChild>{children}</SheetTrigger>
         <SheetContent className="flex flex-col justify-between bg-[#F4F1EE] pb-0">
            <SheetHeader>
               <SheetTitle>
                  В корзине
                  <span className="font-bold">{items.length} товара</span>
               </SheetTitle>
            </SheetHeader>
            <div className="scrollbar -mx-6 mt-5 flex-1 overflow-auto">
               {items.map(item => (
                  <div className="mb-2">
                     <CartDrawerItem
                        key={item.id}
                        id={item.id}
                        imageUrl={item.imageUrl}
                        details={
                           item.pizzaSize && item.pizzaType
                              ? getCartItemDetails(
                                   item.ingredients,
                                   item.pizzaType as PizzaType,
                                   item.pizzaSize as PizzaSize,
                                )
                              : ""
                        }
                        name={item.name}
                        price={item.price}
                        quantity={item.quantity}
                        onClickCountButton={type =>
                           onClickCountButton(type, item.id, item.quantity)
                        }
                        onClickRemove={() => removeCartItem(item.id)}
                     />
                  </div>
               ))}
            </div>

            <SheetFooter className="-mx-6 bg-white p-8">
               <div className="w-full">
                  <div className="mb-4 flex">
                     <span className="flex flex-1 text-lg text-neutral-500">
                        Итого
                        <div className="relative -top-1 mx-2 flex-1 border-b border-dashed border-b-neutral-200" />
                     </span>
                     <span className="text-lg font-bold">
                        {totalAmount} UAH
                     </span>
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
