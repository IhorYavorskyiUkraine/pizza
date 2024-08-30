import { cn } from "../../lib/utils";
import { Title } from "./Title";
import { Button } from "../ui";
import { ProductWithRelations } from "../../@types/product";
import { PizzaImage } from "./PizzaImage";
import { SelectorVar } from "./SelectorVar";
import { pizzaSizes } from "../../constants/pizza";

interface Props {
   imageUrl: string;
   name: string;
   className?: string;
   ingredients: ProductWithRelations["ingredients"];
   variants?: ProductWithRelations["variants"];
   onClickAdd?: VoidFunction;
}

export const ChoosePizzaModal: React.FC<Props> = ({
   name,
   variants,
   imageUrl,
   ingredients,
   onClickAdd,
   className,
}) => {
   const textDetaills = "1";

   const totalPrice = 123;

   return (
      <div className={cn(className, "flex flex-1")}>
         <PizzaImage imageUrl={imageUrl} alt={name} size={30} />
         <div className="w-[490px] bg-[#F7F6F5] p-7">
            <Title text={name} size="md" className="mb-1 font-extrabold" />
            <p className="text-gray-400">{textDetaills}</p>

            <SelectorVar items={pizzaSizes} />
            <Button
               // loading={loading}
               // onClick={handleClickAdd}
               className="mt-10 h-[55px] w-full rounded-[18px] px-10 text-base"
            >
               Добавить в корзину за {totalPrice} ₽
            </Button>
         </div>
      </div>
   );
};
