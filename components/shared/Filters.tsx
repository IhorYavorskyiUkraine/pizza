"use client";

import { Ingredient } from "@prisma/client";
import { Input } from "@ui";
import { CheckBoxFiltersGroup, RangeSlider, Title } from "@components";
import { useQueryFilters, useFilters, useIngredients } from "../../hooks";

export type IngredientItem = Pick<Ingredient, "id" | "name">;

interface Props {
   className?: string;
}

interface PriceRange {
   priceFrom?: number;
   priceTo?: number;
}

interface Filters extends PriceRange {
   pizzaTypes: string;
   sizes: string;
   ingredients: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
   const { ingredients, loading } = useIngredients();

   const filters = useFilters();

   useQueryFilters(filters);

   const items = ingredients.map(item => ({
      value: String(item.id),
      text: item.name,
   }));

   const updatePrices = (prices: number[]) => {
      filters.setPrices("priceFrom", prices[0]);
      filters.setPrices("priceTo", prices[1]);
   };

   return (
      <div className={className}>
         <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />
         <CheckBoxFiltersGroup
            title="Тип теста"
            name="pizzaTypes"
            className="mb-5"
            loading={loading}
            onClickCheckbox={filters.setPizzaTypes}
            selected={filters.pizzaTypes}
            items={[
               { text: "Тонкое", value: "1" },
               { text: "Традиционное", value: "2" },
            ]}
         />
         <CheckBoxFiltersGroup
            title="Размеры"
            name="sizes"
            className="mb-5"
            onClickCheckbox={filters.setSizes}
            selected={filters.sizes}
            loading={loading}
            items={[
               { text: "20 см", value: "20" },
               { text: "30 см", value: "30" },
               { text: "40 см", value: "40" },
            ]}
         />
         <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
            <p className="mb-3 font-bold">Цена от и до:</p>
            <div className="mb-5 flex gap-3">
               <Input
                  type="number"
                  placeholder="0"
                  min={0}
                  max={1000}
                  value={String(filters.prices.priceFrom)}
                  onChange={e =>
                     filters.setPrices("priceFrom", Number(e.target.value))
                  }
               />
               <Input
                  type="number"
                  min={100}
                  max={1000}
                  placeholder="1000"
                  value={String(filters.prices.priceTo)}
                  onChange={e =>
                     filters.setPrices("priceTo", Number(e.target.value))
                  }
               />
            </div>
            <RangeSlider
               min={0}
               max={1000}
               step={10}
               value={[
                  filters.prices.priceFrom || 0,
                  filters.prices.priceTo || 1000,
               ]}
               onValueChange={updatePrices}
            />
         </div>
         <CheckBoxFiltersGroup
            title="Ингредиенты"
            className="mt-5"
            limit={6}
            loading={loading}
            defaultItems={items.slice(0, 6)}
            items={items}
            onClickCheckbox={filters.setSelectedIngredients}
            selectedIngredients={filters.selectedIngredients}
            name="ingredients"
         />
      </div>
   );
};
