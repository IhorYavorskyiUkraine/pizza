import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useSet } from "react-use";

interface PriceRange {
   priceFrom?: number;
   priceTo?: number;
}

interface QueryFilters extends PriceRange {
   pizzaTypes: string;
   sizes: string;
   ingredients: string;
}

export interface Filters {
   sizes: Set<string>;
   pizzaTypes: Set<string>;
   selectedIngredients: Set<string>;
   prices: PriceRange;
}

interface ReturnProps extends Filters {
   setPrices: (name: keyof PriceRange, value: number) => void;
   setPizzaTypes: (value: string) => void;
   setSelectedIngredients: (value: string) => void;
   setSizes: (value: string) => void;
}

export const useFilters = (): ReturnProps => {
   const searchParams = useSearchParams();
   const router = useRouter();

   const params = searchParams.get("ingredietns")?.split(",");

   const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
      new Set<string>(params),
   );

   const [sizes, { toggle: toggleSizes }] = useSet(
      new Set<string>(
         searchParams?.has("sizes")
            ? searchParams.get("sizes")?.split(",")
            : [],
      ),
   );

   const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
      new Set<string>(
         searchParams?.has("pizzaTypes")
            ? searchParams.get("pizzaTypes")?.split(",")
            : [],
      ),
   );

   const [prices, setPrices] = useState<PriceRange>({
      priceFrom: Number(searchParams.get("priceFrom")) || undefined,
      priceTo: Number(searchParams.get("priceTo")) || undefined,
   });

   const onChangePrice = (name: keyof PriceRange, value: number) => {
      setPrices(prev => ({ ...prev, [name]: value }));
   };

   const filters = {
      ...prices,
      pizzaTypes: Array.from(pizzaTypes),
      sizes: Array.from(sizes),
      ingredients: Array.from(selectedIngredients),
   };

   return {
      sizes,
      pizzaTypes,
      selectedIngredients,
      prices,
      setPrices: onChangePrice,
      setPizzaTypes: togglePizzaTypes,
      setSizes: toggleSizes,
      setSelectedIngredients: toggleIngredients,
   };
};
