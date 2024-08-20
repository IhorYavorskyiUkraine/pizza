import { Container, Filters } from "@/components/shared";
import { Title } from "@/components/shared";
import { TopBar } from "@/components/shared";
import { ProductsGroupList } from "@/components/shared";

export default function Home() {
   return (
      <>
         <Container className="mt-10">
            <Title text="Все пиццы" size="lg" className="font-extrabold" />
         </Container>
         <TopBar />
         <Container className="mt-10 pb-14">
            <div className="flex gap-[80px]">
               <div className="w-[250px]">
                  <Filters />
               </div>
               <div className="flex-1">
                  <div className="flex flex-col gap-16">
                     <ProductsGroupList
                        title="Пиццы"
                        items={[
                           {
                              id: 1,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 2,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 3,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 4,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 6,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 7,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 8,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                        ]}
                        categoryId={1}
                     />
                     <ProductsGroupList
                        title="Комбо"
                        items={[
                           {
                              id: 8,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 9,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 10,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 11,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 12,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 13,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                           {
                              id: 14,
                              name: "Маргарита",
                              price: 390,
                              imageUrl:
                                 "https://media.dodostatic.net/image/r:292x292/11EE7D610BBEB562BD4D48786AD87270.webp",
                              count: 1,
                           },
                        ]}
                        categoryId={2}
                     />
                  </div>
               </div>
            </div>
         </Container>
      </>
   );
}
