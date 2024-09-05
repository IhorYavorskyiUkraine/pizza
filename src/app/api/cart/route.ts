import { prisma } from "@client";
import { NextResponse, NextRequest } from "next/server";
import crypto from "crypto";
import { findOrCreateCart } from "../../../../lib/findOrCreateCart";
import { CreateCartItemValues } from "@servicesdto/CartDTO";
import { updateCartTotalPrice } from "../../../../lib/updateCartTotalPrice";

export async function GET(req: NextRequest) {
   try {
      const token = req.cookies.get("cartToken")?.value;

      if (!token) {
         return NextResponse.json({ totalAmount: 0, items: {} });
      }

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

      return NextResponse.json(userCart);
   } catch (error) {
      console.log("[CART_GET]", error);
      return NextResponse.json(
         { message: "Не удалось получить корзину" },
         { status: 500 },
      );
   }
}

export async function POST(req: NextRequest) {
   try {
      let token = req.cookies.get("cartToken")?.value;

      if (!token) {
         token = crypto.randomUUID();
      }

      const userCart = await findOrCreateCart(token);

      const data = (await req.json()) as CreateCartItemValues;

      const findCartItem = await prisma.cartItem.findFirst({
         where: {
            cartId: userCart.id,
            productVarId: data.productVarId,
            ingredients: { every: { id: { in: data.ingredients } } },
         },
      });

      if (findCartItem) {
         await prisma.cartItem.update({
            where: {
               id: findCartItem.id,
            },
            data: {
               quantity: findCartItem.quantity + 1,
            },
         });
      }

      await prisma.cartItem.create({
         data: {
            cartId: userCart.id,
            productVarId: data.productVarId,
            quantity: 1,
            ingredients: { connect: data.ingredients?.map(id => ({ id })) },
         },
      });

      const updatedUserCart = await updateCartTotalPrice(token);
      const response = NextResponse.json(updatedUserCart);

      response.cookies.set("cartToken", token);

      return response;
   } catch (error) {
      console.log("[CART_POST]", error);
      return NextResponse.json(
         { message: "Не удалось получить корзину" },
         { status: 500 },
      );
   }
}
