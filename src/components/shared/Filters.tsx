"use client";

import { Ingredient } from "@prisma/client";
import { useFilterIngredients } from "../../../hooks/useFilterIngredients";
import { Input } from "../ui";
import { CheckBoxFiltersGroup } from "./CheckBoxFiltersGroup";
import { FilterCheckbox } from "./FilterCheckbox";
import { RangeSlider } from "./RangeSlider";
import { Title } from "./Title";
import { useState } from "react";
import { useSet } from "react-use";

export type IngredientItem = Pick<Ingredient, "id" | "name">;

interface Props {
   className?: string;
}

interface PriceRange {
   priceFrom: number;
   priceTo: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingredients, loading, onAddId, selectedIngredients } =
      useFilterIngredients();

   const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>([]));
   const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
      new Set<string>([]),
   );

   const [prices, setPrice] = useState<PriceRange>({
      priceFrom: 0,
      priceTo: 1000,
   });

   const items = ingredients.map(item => ({
      value: String(item.id),
      text: item.name,
   }));

   const onChangePrice = (name: keyof PriceRange, value: number) => {
      setPrice({ ...prices, [name]: value });
   };

   return (
      <div className={className}>
         <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

         <CheckBoxFiltersGroup
            title="Тип теста"
            name="pizzaTypes"
            className="mb-5"
            onClickCheckbox={togglePizzaTypes}
            selected={pizzaTypes}
            items={[
               { text: "Тонкое", value: "1" },
               { text: "Традиционное", value: "2" },
            ]}
         />

         <CheckBoxFiltersGroup
            title="Размеры"
            name="sizes"
            className="mb-5"
            onClickCheckbox={toggleSizes}
            selected={sizes}
            items={[
               { text: "20 см", value: "20" },
               { text: "30 см", value: "30" },
               { text: "40 см", value: "40" },
            ]}
         />
         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="font-bold mb-3">Цена от и до:</p>
            <div className="flex gap-3 mb-5">
               <Input
                  type="number"
                  placeholder="0"
                  min={0}
                  max={1000}
                  value={String(prices.priceFrom)}
                  onChange={e =>
                     onChangePrice("priceFrom", Number(e.target.value))
                  }
               />
               <Input
                  type="number"
                  min={100}
                  max={1000}
                  placeholder="1000"
                  value={String(prices.priceTo)}
                  onChange={e =>
                     onChangePrice("priceTo", Number(e.target.value))
                  }
               />
            </div>
            <RangeSlider
               min={0}
               max={1000}
               step={10}
               value={[prices.priceFrom, prices.priceTo]}
               onValueChange={([priceFrom, priceTo]) =>
                  setPrice({ priceFrom, priceTo })
               }
            />
         </div>
         <CheckBoxFiltersGroup
            title="Ингредиенты"
            className="mt-5"
            limit={6}
            loading={loading}
            defaultItems={items.slice(0, 6)}
            items={items}
            onClickCheckbox={onAddId}
            selectedIngredients={selectedIngredients}
            name="ingredients"
         />
      </div>
   );
};
