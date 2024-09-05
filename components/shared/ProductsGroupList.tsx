"use client";

import { useIntersection } from "react-use";
import { useEffect, useRef } from "react";

import { cn } from "@lib";
import { ProductCard, Title } from "@components";
import { useCategoryStore } from "../../store/category";

interface Props {
   title: string;
   products: any[];
   className?: string;
   categoryId: number;
   listClassName?: string;
}

export const ProductsGroupList: React.FC<Props> = ({
   title,
   products,
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
         <Title text={title} size="lg" className="mb-5 font-extrabold" />
         <div className={cn(listClassName, "grid grid-cols-3 gap-[50px]")}>
            {products.map((product, i) => (
               <ProductCard
                  id={product.id}
                  key={product.id}
                  name={product.name}
                  imageUrl={product.imageUrl}
                  price={product.variants[0].price}
                  count={i % 2}
               />
            ))}
         </div>
      </div>
   );
};
