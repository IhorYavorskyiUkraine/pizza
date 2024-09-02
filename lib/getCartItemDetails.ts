import { Ingredient } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const getCartItemDetails = (
   pizzaTypes: PizzaType,
   pizzaSize: PizzaSize,
   ingredients: Ingredient[],
) => {};
