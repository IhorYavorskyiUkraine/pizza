import { useEffect, useState } from "react";
import { Variant } from "../components/shared/SelectorVariants";
import { PizzaSize, PizzaType } from "../constants/pizza";
import { useSet } from "react-use";
import { getAvailablePizzaSizes } from "@lib/getAvailablePizzaSizes*";
import { ProductVar } from "@prisma/client";

interface ReturnProps {
   selectedSize: PizzaSize;
   selectedType: PizzaType;
   availableSizes: Variant[];
   setSelectedSize: (selectedSize: PizzaSize) => void;
   setSelectedType: (selectedType: PizzaType) => void;
   selectedIngredients: Set<number>;
   addIngredient: (id: number) => void;
}

export const usePizzaOptions = (variants: ProductVar[]): ReturnProps => {
   const [selectedSize, setSelectedSize] = useState<PizzaSize>(20);
   const [selectedType, setSelectedType] = useState<PizzaType>(1);
   const [selectedIngredients, { toggle: addIngredient }] = useSet(
      new Set<number>([]),
   );

   const availableSizes = getAvailablePizzaSizes(variants, selectedType);

   useEffect(() => {
      const isSizeAvailable = availableSizes?.find(
         item => Number(item.value) === Number(selectedSize) && !item.disabled,
      );
      const filteredTypes = availableSizes?.find(item => !item.disabled);
      if (!isSizeAvailable && filteredTypes) {
         setSelectedSize(Number(filteredTypes.value) as PizzaSize);
      }
   }, [selectedType]);

   return {
      selectedSize,
      selectedType,
      setSelectedSize,
      availableSizes,
      setSelectedType,
      selectedIngredients,
      addIngredient,
   };
};
