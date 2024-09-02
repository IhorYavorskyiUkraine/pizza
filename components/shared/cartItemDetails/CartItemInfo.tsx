import { Ingredient } from "@prisma/client";
import { mapPizzaType, PizzaSize, PizzaType } from "../../../constants/pizza";

interface Props {
   name: string;
   pizzaSize?: PizzaSize;
   type?: PizzaType;
   ingredients?: Ingredient[];
}

export const CartItemInfo: React.FC<Props> = ({
   name,
   pizzaSize,
   type,
   ingredients,
}) => {
   const details = [];

   if (pizzaSize && type) {
      const typeName = mapPizzaType[type];
      details.push(`${typeName} ${pizzaSize} см`);
   }

   if (ingredients) {
      details.push(...ingredients.map(ingredient => ingredient.name));
   }

   return (
      <div>
         <div className="flex items-center justify-between">
            <h2 className="flex-1 text-lg font-bold leading-6">{name}</h2>
         </div>
         {details.length > 0 && (
            <p className="text-xs text-gray-400">{details.join(", ")}</p>
         )}
      </div>
   );
};
