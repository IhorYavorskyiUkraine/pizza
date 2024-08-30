"use client";

import { cn } from "@lib";

type Variant = {
   name: string;
   value: string;
   disabled?: boolean;
};

interface Props {
   items: readonly Variant[];
   onClick?: (value: Variant["value"]) => void;
   className?: string;
   selectedValue?: Variant["value"];
}

interface Props {
   className?: string;
}

export const SelectorVar: React.FC<Props> = ({
   items,
   onClick,
   selectedValue,
   className,
}) => {
   return (
      <div
         className={cn(
            className,
            "flex select-none justify-between rounded-3xl bg-[#F7F6F5] p-1",
         )}
      >
         {items.map(item => (
            <button
               key={item.name}
               onClick={() => onClick?.(item.value)}
               className={cn(
                  "duration-400 flex h-[30px] flex-1 items-center justify-center rounded-3xl px-5 text-sm transition-all",
                  {
                     "bg-white shadow": item.value === selectedValue,
                     "pointer-events-none text-gray-500 opacity-50":
                        item.disabled,
                  },
               )}
            >
               {item.name}
            </button>
         ))}
      </div>
   );
};
