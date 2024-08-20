"use client";

import { useState } from "react";
import { Input } from "../ui";
import { FilterCheckbox, FilterCheckboxProps } from "./FilterCheckbox";

type Item = FilterCheckboxProps;

interface Props {
   items: Item[];
   defaultItems: Item[];
   limit?: number;
   searchInputPlaceholder?: string;
   onChange?: (value: string[]) => void;
   defaultValue?: string[];
   title: string;
   className?: string;
}

export const CheckBoxFiltersGroup: React.FC<Props> = ({
   title,
   items,
   defaultItems,
   limit = 5,
   searchInputPlaceholder = "Поиск...",
   className,
   onChange,
   defaultValue,
}) => {
   const [showAll, setShowAll] = useState(false);
   const [search, setSearch] = useState("");

   const list = showAll
      ? items.filter(item =>
           item.text.toLowerCase().includes(search.toLowerCase()),
        )
      : defaultItems?.slice(0, limit);

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
                  // onCheckedChange={() => onChange(item.value)}
                  checked={false}
                  key={i}
                  value={item.value}
                  text={item.text}
                  endAdornment={item.endAdornment}
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
