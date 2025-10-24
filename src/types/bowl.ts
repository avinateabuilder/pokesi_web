export interface Protein {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Base {
  id: string;
  name: string;
  price: number;
  image: string;
}

export interface Topping {
  id: string;
  name: string;
  image: string;
}

export interface Sauce {
  id: string;
  name: string;
}

export interface BowlOrder {
  protein: Protein | null;
  bases: Base[];
  toppings: Topping[];
  sauce: Sauce | null;
}
