import { cn } from "@lib";
import { CircleCheck } from "lucide-react";
import React from "react";

interface Props {
   className?: string;
   imageUrl: string;
   name: string;
   price: number;
   active?: boolean;
   onClick?: () => void;
}

export const IngredientItem: React.FC<Props> = ({
   className,
   active,
   price,
   name,
   imageUrl,
   onClick,
}) => {
   return (
      <div
         onClick={onClick}
         className={cn(
            "relative flex w-32 cursor-pointer flex-col items-center rounded-md bg-white p-1 text-center shadow-md",
            { "border border-primary": active },
            className,
         )}
      >
         {active && (
            <CircleCheck className="absolute right-2 top-2 text-primary" />
         )}
         <img width={110} height={110} src={imageUrl} />
         <span className="mb-1 text-xs">{name}</span>
         <span className="font-bold">{price} ₽</span>
      </div>
   );
};
