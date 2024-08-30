"use client";

import { useState } from "react";
import { Input, Skeleton } from "@ui";
import { FilterCheckbox } from "@components";
import { FilterCheckboxProps } from "./FilterCheckbox";

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
            <p className="mb-3 font-bold">{title}</p>
            {...Array(limit)
               .fill(0)
               .map((_, i) => (
                  <Skeleton key={i} className="mb-4 h-6 rounded-[8px]" />
               ))}
            <Skeleton className="mb-4 h-6 w-28 rounded-[8px]" />
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
            <p className="mb-3 font-bold">{title}</p>
         </div>
         {showAll && (
            <div className="mb-5">
               <Input
                  placeholder={searchInputPlaceholder}
                  className="border-none bg-gray-50"
                  onChange={onChangeSearch}
                  value={search}
               />
            </div>
         )}
         <div className="scrollbar flex max-h-96 flex-col gap-4 overflow-auto pr-2">
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
               className={showAll ? "mt-4 border-t border-t-neutral-100" : ""}
            >
               <button
                  onClick={() => setShowAll(!showAll)}
                  className="mt-3 text-primary"
               >
                  {showAll ? "Скрыть" : "+ Показать все"}
               </button>
            </div>
         )}
      </>
   );
};
