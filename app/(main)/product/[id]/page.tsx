import { notFound } from "next/navigation";
import { prisma } from "../../../../prisma/client";
import {
   Container,
   PizzaImage,
   Title,
} from "../../../../shared/components/shared";
import { SelectorVar } from "../../../../shared/components/shared/SelectorVar";

export default async function ProductPage({
   params: { id },
}: {
   params: { id: string };
}) {
   const product = await prisma.product.findFirst({
      where: { id: Number(id) },
   });

   if (!product) notFound();

   return (
      <Container className="my-10 flex flex-col">
         <div className="flex flex-1">
            <PizzaImage
               imageUrl={product.imageUrl}
               size={40}
               alt={product.name}
               className=""
            />
            <div className="w-[490px] bg-[#F7F6F5] p-7">
               <Title
                  text={product.name}
                  size="md"
                  className="mb-1 font-extrabold"
               />
               <p className="text-gray-400">
                  Lorem, ipsum dolor sit amet consectetur adipisicing eli
               </p>
               <SelectorVar
                  selectedValue="2"
                  items={[
                     { name: "s", value: "1" },
                     { name: "m", value: "2" },
                     { name: "l", value: "3" },
                  ]}
               />
            </div>
         </div>
      </Container>
   );
}
