"use client";

import { cn } from "@lib";
import { Button } from "@ui";
import { ProductWithRelations } from "../../@types/product";
import {
   IngredientItem,
   PizzaImage,
   SelectorVariants,
   Title,
} from "@components";
import { PizzaSize, PizzaType, pizzaTypes } from "../../constants/pizza";
import { Ingredient } from "@prisma/client";
import { usePizzaOptions } from "@hooks/usePizzaOptions";
import { getPizzaDetails } from "@lib/getPizzaDetails";

interface Props {
   imageUrl: string;
   name: string;
   className?: string;
   ingredients: Ingredient[];
   variants: ProductWithRelations["variants"];
   onClickAddCart?: VoidFunction;
}

export const ChoosePizzaModal: React.FC<Props> = ({
   name,
   variants,
   imageUrl,
   ingredients,
   onClickAddCart,
   className,
}) => {
   const {
      selectedSize,
      selectedType,
      setSelectedSize,
      setSelectedType,
      availableSizes,
      selectedIngredients,
      addIngredient,
   } = usePizzaOptions(variants);

   const { totalPrice, textDetails } = getPizzaDetails(
      selectedType,
      selectedSize,
      variants,
      ingredients,
      selectedIngredients,
   );

   const handleClickAdd = () => {
      onClickAddCart?.();
   };

   return (
      <div className={cn(className, "flex flex-1")}>
         <PizzaImage imageUrl={imageUrl} alt={name} size={selectedSize} />
         <div className="w-[490px] bg-[#F7F6F5] p-7">
            <Title text={name} size="md" className="mb-1 font-extrabold" />
            <p className="text-gray-400">{textDetails}</p>
            <div className="mt-5 flex flex-col gap-4">
               <SelectorVariants
                  items={availableSizes}
                  selectedValue={String(selectedSize)}
                  onClick={selectedSize =>
                     setSelectedSize(Number(selectedSize) as PizzaSize)
                  }
               />
               <SelectorVariants
                  items={pizzaTypes}
                  selectedValue={String(selectedType)}
                  onClick={selectedType =>
                     setSelectedType(Number(selectedType) as PizzaType)
                  }
               />
            </div>
            <div className="scrollbar mt-5 h-[420px] overflow-auto rounded-md bg-gray-50 p-5">
               <div className="grid grid-cols-3 gap-3">
                  {ingredients.map(ingredient => (
                     <IngredientItem
                        key={ingredient.id}
                        onClick={() => addIngredient(ingredient.id)}
                        imageUrl={ingredient.imageUrl}
                        name={ingredient.name}
                        price={ingredient.price}
                        active={selectedIngredients.has(ingredient.id)}
                     />
                  ))}
               </div>
            </div>
            <Button
               // loading={loading}
               onClick={handleClickAdd}
               className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
            >
               Добавить в корзину за {totalPrice} UAH
            </Button>
         </div>
      </div>
   );
};
