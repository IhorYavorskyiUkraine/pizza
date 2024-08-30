import { notFound } from "next/navigation";
import { prisma } from "../../../../../../prisma/client";
import { ChooseProduct } from "../../../../../../components/shared";

export default async function ProductModalPage({
   params: { id },
}: {
   params: { id: string };
}) {
   const product = await prisma.product.findFirst({
      where: { id: Number(id) },
      include: {
         ingredients: true,
         variants: true,
      },
   });

   if (!product) notFound();

   return <ChooseProduct product={product} />;
}
