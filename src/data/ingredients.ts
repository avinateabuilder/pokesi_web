import proteinChicken from "@/assets/protein-chicken.png";
import proteinSalmon from "@/assets/protein-salmon.png";
import baseRice from "@/assets/base-rice.png";
import baseLettuce from "@/assets/base-lettuce.png";
import baseQuinoa from "@/assets/base-quinoa.png";
import toppingCarrot from "@/assets/topping-carrot.png";
import toppingTomato from "@/assets/topping-tomato.png";
import toppingCamote from "@/assets/topping-camote.png";
import toppingWonton from "@/assets/topping-wonton.png";
import toppingBroccoli from "@/assets/topping-broccoli.png";
import toppingCorn from "@/assets/topping-corn.png";
import toppingAvocado from "@/assets/topping-avocado.png";
import toppingPeach from "@/assets/topping-peach.png";
import { Protein, Base, Topping, Sauce } from "@/types/bowl";

export const proteins: Protein[] = [
  { id: "chicken", name: "Pollo", price: 18, image: proteinChicken },
  { id: "salmon", name: "Salmón", price: 23, image: proteinSalmon },
];

export const bases: Base[] = [
  { id: "rice", name: "Arroz", price: 0, image: baseRice },
  { id: "lettuce", name: "Lechuga", price: 0, image: baseLettuce },
  { id: "quinoa", name: "Quinua", price: 2.5, image: baseQuinoa },
];

export const toppings: Topping[] = [
  { id: "carrot", name: "Zanahoria", image: toppingCarrot },
  { id: "tomato", name: "Tomate", image: toppingTomato },
  { id: "camote", name: "Camotito frito", image: toppingCamote },
  { id: "wonton", name: "Wantán frito", image: toppingWonton },
  { id: "broccoli", name: "Brócoli", image: toppingBroccoli },
  { id: "corn", name: "Maíz americano", image: toppingCorn },
  { id: "avocado", name: "Palta", image: toppingAvocado },
  { id: "peach", name: "Durazno", image: toppingPeach },
];

export const sauces: Sauce[] = [
  { id: "acevichada", name: "Acevichada" },
  { id: "honey-mustard", name: "Honey Mustard" },
];
