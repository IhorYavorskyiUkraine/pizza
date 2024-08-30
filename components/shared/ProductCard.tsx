import Link from "next/link";
import { Title } from "@components";
import { Plus } from "lucide-react";
import { Button } from "@ui";

interface Props {
   id: number;
   name: string;
   price: number;
   count?: number;
   imageUrl: string;
   className?: string;
}

export const ProductCard: React.FC<Props> = ({
   id,
   name,
   price,
   count,
   imageUrl,
   className,
}) => {
   return (
      <div className={className}>
         <Link href={`/product/${id}`}>
            <div className="flex h-[260px] justify-center rounded-lg bg-secondary p-6">
               <img className="h-[215px] w-[215px]" src={imageUrl} alt={name} />
            </div>
            <Title text={name} size="sm" className="mb-1 mt-3 font-bold" />
            <p className="text-sm text-gray-400">
               Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты,
               соус альфредо, чеснок
            </p>
            <div className="mt-4 flex items-center justify-between">
               <span className="text-[20px]">
                  от <b>{price} UAH</b>
               </span>
               {/* {count ? (
                  <CountButton value={count} size="lg" />
               ) : ( */}
               <Button variant="secondary" className="text-base font-bold">
                  <Plus size={20} className="mr-1" />
                  Добавить
               </Button>
               {/* )} */}
            </div>
         </Link>
      </div>
   );
};
