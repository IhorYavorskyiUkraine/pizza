import type { Ingredient, Product, ProductVar } from "@prisma/client";

export type ProductWithRelations = Product & {
   variants: ProductVar[];
   ingredients: Ingredient[];
};
