import {
   Cart,
   CartItem,
   Ingredient,
   Product,
   ProductVar,
} from "@prisma/client";

export type CartItemDTO = CartItem & {
   productVar: ProductVar & {
      product: Product;
   };
   ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
   items: CartItemDTO[];
}

export interface CreateCartItemValues {
   productVarId: number;
   ingredients?: number[];
}
