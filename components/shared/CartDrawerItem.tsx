import { cn } from "@lib*";

import * as CartItem from "./cartItemDetails";
import { CartItemProps } from "./cartItemDetails/CartItemDetails.types";
import { Ingredient } from "@prisma/client";

interface Props extends CartItemProps {
   className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
   id,
   imageUrl,
   name,
   price,
   quantity,
   className,
}) => {
   return (
      <div className={cn("flex gap-6 bg-white p-5", className)}>
         <CartItem.Image src={imageUrl} />{" "}
         <div className="flex-1">
            <CartItem.Info
               name={name}
               ingredients={ingredients}
               pizzaSize={pizzaSize}
               type={type}
            />

            <hr className="my-3" />

            <div className="flex items-center justify-between">
               <CountButton onClick={onClickCountButton} value={quantity} />

               <div className="flex items-center gap-3">
                  <CartItemDetailsPrice value={price} />
                  <Trash2Icon
                     onClick={() => removeCartItem(id)}
                     className="cursor-pointer text-gray-400 hover:text-gray-600"
                     size={16}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};
