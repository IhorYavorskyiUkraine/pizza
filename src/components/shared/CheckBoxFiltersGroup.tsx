"use client";

import { useState } from "react";
import { Input, Skeleton } from "../ui";
import { FilterCheckbox, FilterCheckboxProps } from "./FilterCheckbox";

type Item = FilterCheckboxProps;

interface Props {
   items: Item[];
   defaultItems?: Item[];
   limit?: number;
   searchInputPlaceholder?: string;
   onClickCheckbox?: (id: string) => void;
   defaultValue?: string[];
   title: string;
   className?: string;
   selected: Set<string>;
   loading: boolean;
   name: string;
}

export const CheckBoxFiltersGroup: React.FC<Props> = ({
   title,
   items,
   defaultItems,
   limit = 5,
   searchInputPlaceholder = "Поиск...",
   className,
   onClickCheckbox,
   defaultValue,
   selected,
   loading,
   name,
}) => {
   const [showAll, setShowAll] = useState(false);
   const [search, setSearch] = useState("");

   if (loading) {
      return (
         <div className={className}>
            <p className="font-bold mb-3">{title}</p>
            {...Array(limit)
               .fill(0)
               .map((_, i) => (
                  <Skeleton key={i} className="h-6 mb-4 rounded-[8px]" />
               ))}
            <Skeleton className="w-28 h-6 mb-4 rounded-[8px]" />
         </div>
      );
   }

   const list = showAll
      ? items.filter(item =>
           item.text.toLowerCase().includes(search.toLowerCase()),
        )
      : (defaultItems || items).slice(0, limit);

   const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
   };

   return (
      <>
         <div className={className}>
            <p className="font-bold mb-3">{title}</p>
         </div>
         {showAll && (
            <div className="mb-5">
               <Input
                  placeholder={searchInputPlaceholder}
                  className="bg-gray-50 border-none"
                  onChange={onChangeSearch}
                  value={search}
               />
            </div>
         )}
         <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
            {list.map((item, i) => (
               <FilterCheckbox
                  onCheckedChange={() => onClickCheckbox?.(item.value)}
                  checked={selected?.has(item.value)}
                  key={i}
                  value={item.value}
                  text={item.text}
                  endAdornment={item.endAdornment}
                  name={name}
               />
            ))}
         </div>
         {items.length > limit && (
            <div
               className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}
            >
               <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-primary mt-3"
               >
                  {showAll ? "Скрыть" : "+ Показать все"}
               </button>
            </div>
         )}
      </>
   );
};
