export interface ICommonItem {
  _id: string;
  id: string;
  name: string;
  image: string;
  description: string;
  rating?: number;
  chef?: string | IChef;
  dishes?: string[] | IDish[];
  type?: string | null;
  price?: number;
  tags?: string[];
  ingredients?: string[];
  restaurant?: string | IRestaurant;
  status: string;
  __v?: number;
  chefName?: string;
  restaurantName?: string;
  chefOfTheWeek?: boolean;
  restaurants?: string[];
}

export interface IChef extends ICommonItem {
  chefOfTheWeek: boolean;
}

export interface IRestaurant extends ICommonItem {
  rating: number;
}

export interface IDish extends ICommonItem {
  type: string | null;
  price: number;
}

export interface CollectionState {
  data: ICommonItem[] | null;
  httpErr: string | undefined;
}

export interface RootState {
  collectionState: CollectionState;
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
