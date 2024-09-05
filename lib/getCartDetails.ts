import { CartDTO } from "../services/dto/CartDTO";
import { Ingredient } from "@prisma/client";
import { calcCartItemTotalPrice } from "@lib";

export type CartStateItem = {
   id: number;
   quantity: number;
   name: string;
   imageUrl: string;
   price: number;
   pizzaSize?: number | null;
   pizzaType?: number | null;
   ingredients: Array<{ name: string; price: number }>;
};

interface ReturnProps {
   items: CartStateItem[];
   totalAmount: number;
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
   const items = data.items.map(item => ({
      id: item.id,
      quantity: item.quantity,
      name: item.productVar.product.name,
      imageUrl: item.productVar.product.imageUrl,
      price: calcCartItemTotalPrice(item),
      pizzaSize: item.productVar.size,
      pizzaType: item.productVar.pizzaType,
      ingredients: item.ingredients.map((ingredient: Ingredient) => ({
         name: ingredient.name,
         price: ingredient.price,
      })),
   }));

   return {
      totalAmount: data.totalAmount,
      items,
   };
};
