import { cn } from "@lib";

import * as CartItem from "./cartItemDetails";
import { CartItemProps } from "./cartItemDetails/CartItemDetails.types";
import { CountButton } from "./CountButton";
import { CartItemDetailsPrice } from "./cartItemDetails/CartItemDetailsPrice";
import { Trash2Icon } from "lucide-react";

interface Props extends CartItemProps {
   onClickCountButton: (type: "plus" | "minus") => void;
   className?: string;
   details: string;
   onClickRemove: () => void;
}

export const CartDrawerItem: React.FC<Props> = ({
   id,
   imageUrl,
   name,
   price,
   quantity,
   className,
   details,
   onClickCountButton,
   onClickRemove,
}) => {
   return (
      <div className={cn("flex gap-6 bg-white p-5", className)}>
         <CartItem.Image src={imageUrl} />{" "}
         <div className="flex-1">
            <CartItem.Info details={details} name={name} />

            <hr className="my-3" />

            <div className="flex items-center justify-between">
               <CountButton onClick={onClickCountButton} value={quantity} />

               <div className="flex items-center gap-3">
                  <CartItemDetailsPrice value={price} />
                  <Trash2Icon
                     onClick={() => onClickRemove()}
                     className="cursor-pointer text-gray-400 hover:text-gray-600"
                     size={16}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
