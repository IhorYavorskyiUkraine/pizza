import { cn } from "@lib";
import { ArrowUpDown } from "lucide-react";

interface Props {
   className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
   return (
      <div
         className={cn(
            "inline-flex h-[52px] cursor-pointer items-center gap-1 rounded-2xl bg-gray-50 px-5",
            className,
         )}
      >
         <ArrowUpDown className="h-4 w-4" />
         <b>Сортировка:</b>
         <b className="text-primary">популярное</b>
      </div>
   );
};
