import { Ingredient, ProductVar } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";
/**
 *	функция для подсчёта общей цены
 *
 * @example calcTotalPizzaPrice(1, 20, variants, ingredients, selectedIngredients)
 *
 * @param selectedType тип выбранной пиццы
 * @param selectedSize тип выбранного размера
 * @param variants список вариаций
 * @param ingredients список ингредиентов
 * @param selectedIngredients выбранные ингредиенты
 * @returns общая цена
 */
export const calcTotalPizzaPrice = (
   selectedType: PizzaType,
   selectedSize: PizzaSize,
   variants: ProductVar[],
   ingredients: Ingredient[],
   selectedIngredients: Set<number>,
) => {
   const pizzaPrice =
      variants.find(
         variant =>
            variant.pizzaType === selectedType && variant.size === selectedSize,
      )?.price || 0;

   const totalIngredientsPrice = ingredients
      .filter(ingredient => selectedIngredients.has(ingredient.id))
      .reduce((acc, ingredient) => acc + ingredient.price, 0);

   return pizzaPrice + totalIngredientsPrice;
};
