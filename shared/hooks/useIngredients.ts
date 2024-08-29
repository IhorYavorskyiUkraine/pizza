import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "../services/apiClient";

export const useIngredients = () => {
   const [ingredients, setIngredients] = useState<Ingredient[]>([]);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function getAllIngredients() {
         try {
            const ingredients = await Api.ingredients.getAll();
            setIngredients(ingredients);
         } catch (error) {
            console.log(error);
            setLoading(false);
         } finally {
            setLoading(false);
         }
      }
      getAllIngredients();
   }, []);

   return {
      ingredients,
      loading,
   };
};
