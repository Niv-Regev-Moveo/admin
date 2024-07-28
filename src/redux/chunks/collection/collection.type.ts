// collection.type.ts
export interface ICommonItem {
  _id: string;
  id: string;
  name?: string;
  image?: string;
  description?: string;
  chefOfTheWeek?: boolean;
  restaurants?: string[];
  rating?: number;
  chef?: string;
  dishes?: string[];
  type?: string | null;
  price?: number;
  tags?: string[];
  ingredients?: string[];
  restaurant?: string;
  status?: string;
  __v?: number;
}

export interface IChef extends ICommonItem {
  name: string;
  image: string;
  description: string;
  chefOfTheWeek: boolean;
  restaurants: string[];
}

export interface IRestaurant extends ICommonItem {
  name: string;
  image: string;
  description: string;
  rating: number;
  chef: string;
  dishes: string[];
}

export interface IDish extends ICommonItem {
  name: string;
  image: string;
  type: string | null;
  price: number;
  tags: string[];
  ingredients: string[];
  restaurant: string;
  status: string;
}

export type FormValues = Partial<IChef & IRestaurant & IDish> & {
  rating?: number;
  price?: number;
  tags?: string[];
  ingredients?: string[];
};

export type FormFields = keyof IChef | keyof IRestaurant | keyof IDish;

export type NewItem = Omit<ICommonItem, "_id" | "id">;

export type Collection = "chefs" | "restaurants" | "dishes";

export type CollectionDataType = IChef | IRestaurant | IDish;
