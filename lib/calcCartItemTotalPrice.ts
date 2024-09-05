import { CartItemDTO } from "@servicesdto/CartDTO";

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
   const ingredientsPrice =
      item.ingredients.reduce((acc, curr) => acc + curr.price, 0) +
      item.productVar.price;
   return (ingredientsPrice + item.productVar.price) * item.quantity;
};
