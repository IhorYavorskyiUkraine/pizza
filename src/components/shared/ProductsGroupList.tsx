"use client";

import { useIntersection } from "react-use";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { ProductCard } from "./ProductCard";
import { Title } from "./Title";
import { useCategoryStore } from "@/store/category";

interface Props {
   title: string;
   products: any[];
   items: any[];
   className?: string;
   categoryId: number;
   listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
   title,
   products,
   items,
   className,
   categoryId,
   listClassName,
}) => {
   const setActiveCategoryId = useCategoryStore(state => state.setActiveId);

   const intersectionRef = useRef<HTMLDivElement>(null);

   const intersection = useIntersection(intersectionRef, {
      threshold: 0.4,
   });

   useEffect(() => {
      if (intersection && intersection.isIntersecting) {
         setActiveCategoryId(categoryId);
      }
   }, [categoryId, title, intersection?.isIntersecting]);

   return (
      <div className={className} id={title} ref={intersectionRef}>
         <Title text={title} size="lg" className="font-extrabold mb-5" />
         <div className={cn(listClassName, "grid grid-cols-3 gap-[50px]")}>
            {items.map((item, i) => (
               <ProductCard
                  id={item.id}
                  key={item.id}
                  name="Маргарита"
                  imageUrl="https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp"
                  price={390}
                  count={i % 2}
               />
            ))}
         </div>
      </div>
   );
};
