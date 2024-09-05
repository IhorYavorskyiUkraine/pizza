import { calcTotalPizzaPrice } from "@lib";
import { mapPizzaType, PizzaSize, PizzaType } from "../constants/pizza";
import { Ingredient, ProductVar } from "@prisma/client";

export const getPizzaDetails = (
   selectedType: PizzaType,
   selectedSize: PizzaSize,
   variants: ProductVar[],
   ingredients: Ingredient[],
   selectedIngredients: Set<number>,
) => {
   const totalPrice = calcTotalPizzaPrice(
      selectedType,
      selectedSize,
      variants,
      ingredients,
      selectedIngredients,
   );

   const textDetails = `${selectedSize} см, ${mapPizzaType[selectedType]} пицца`;

   return { totalPrice, textDetails };
};
