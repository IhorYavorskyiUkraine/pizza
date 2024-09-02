import { ProductVar } from "@prisma/client";
import { pizzaSizes, PizzaType } from "../constants/pizza";
import { Variant } from "../components/shared/SelectorVariants";

export const getAvailablePizzaSizes = (
   variants: ProductVar[],
   selectedType: PizzaType,
): Variant[] => {
   const availablePizzas = variants.filter(
      variant => variant.pizzaType === selectedType,
   );

   return pizzaSizes.map(pizzaSize => ({
      name: pizzaSize.name,
      value: pizzaSize.value,
      disabled: !availablePizzas.some(
         variant => Number(variant.size) === Number(pizzaSize.value),
      ),
   }));
};
