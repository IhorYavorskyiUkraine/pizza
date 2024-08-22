import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";
import { Api } from "../services/apiClient";
import { useSet } from "react-use";

interface Props {
   ingredients: Ingredient[];
   loading: boolean;
   selectedIngredients: Set<string>;
   onAddId: (id: string) => void;
}

export const useFilterIngredients = (): Props => {
   const [ingredients, setIngredients] = useState<Ingredient[]>([]);
   const [loading, setLoading] = useState(true);

   const [selectedIngredients, { toggle }] = useSet(new Set<string>([]));

   useEffect(() => {
      async function getAllIngredients() {
         try {
            setLoading(true);
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

   return { ingredients, loading, onAddId: toggle, selectedIngredients };
};
