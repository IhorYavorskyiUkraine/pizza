import { prisma } from "@client*";
import { NextRequest, NextResponse } from "next/server";
import { calcCartItemTotalPrice } from "../../../../../lib/calcCartItemTotalPrice";

async function updateCartTotalAmount(token: string) {
   const userCart = await prisma.cart.findFirst({
      where: {
         token,
      },
      include: {
         items: {
            orderBy: {
               createdAt: "desc",
            },
            include: {
               productVar: {
                  include: {
                     product: true,
                  },
               },
               ingredients: true,
            },
         },
      },
   });

   const totalAmount = userCart?.items.reduce((acc, item) => {
      return acc + calcCartItemTotalPrice(item);
   }, 0);

   return await prisma.cart.update({
      where: {
         id: userCart?.id,
      },
      data: {
         totalAmount,
      },
      include: {
         items: {
            orderBy: {
               createdAt: "desc",
            },
            include: {
               productVar: {
                  include: {
                     product: true,
                  },
               },
               ingredients: true,
            },
         },
      },
   });
}

export async function PATCH(
   req: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const id = Number(params.id);
      const token = req.cookies.get("cartToken")?.value;
      const data = (await req.json()) as { quantity: number };

      if (!token) {
         return NextResponse.json({ error: "Cart token not found" });
      }

      const cartItem = await prisma.cartItem.findFirst({
         where: {
            id,
         },
      });

      if (!cartItem) {
         return NextResponse.json({ error: "Cart item not found" });
      }

      await prisma.cartItem.update({
         where: {
            id,
         },
         data: {
            quantity: data.quantity,
         },
      });

      const updatedUserCart = await updateCartTotalAmount(token);

      return NextResponse.json(updatedUserCart);
   } catch (err) {
      console.log(err);
      return NextResponse.json(
         { message: "[CART_PATCH] Server error" },
         { status: 500 },
      );
   }
}

export async function DELETE(
   req: NextRequest,
   { params }: { params: { id: string } },
) {
   try {
      const id = Number(params.id);
      const token = req.cookies.get("cartToken")?.value;

      if (!token) {
         return NextResponse.json({ error: "Cart token not found" });
      }

      const cartItem = await prisma.cartItem.findFirst({
         where: {
            id,
         },
      });

      if (!cartItem) {
         return NextResponse.json({ error: "Cart item not found" });
      }

      await prisma.cartItem.delete({
         where: {
            id: cartItem.id,
         },
      });

      const updatedUserCart = await updateCartTotalAmount(token);
      return NextResponse.json(updatedUserCart);
   } catch (err) {
      console.log(err);
      return NextResponse.json(
         { message: "[CART_DELETE] Server error" },
         { status: 500 },
      );
   }
}
