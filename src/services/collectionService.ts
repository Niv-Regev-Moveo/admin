import {
  IChef,
  IRestaurant,
  IDish,
} from "../redux/chunks/collection/collection.type";
import { ICommonItem } from "../redux/chunks/collection/collection.type";

export const filterFields = (
  collection: string,
  data: ICommonItem[]
): ICommonItem[] => {
  const fieldsToExclude: { [key: string]: string[] } = {
    chefs: ["chefOfTheWeek", "image", "_id"],
    restaurants: ["_id", "__v"],
    dishes: ["_id", "__v"],
  };

  const excludeFields = fieldsToExclude[collection] || [];

  return data.map((item) => {
    const filteredItem = { ...item } as Partial<ICommonItem>;
    excludeFields.forEach((field) => {
      delete filteredItem[field as keyof ICommonItem];
    });
    return filteredItem as ICommonItem;
  });
};

export function isRestaurant(
  item: IChef | IRestaurant | IDish
): item is IRestaurant {
  return (item as IRestaurant).rating !== undefined;
}

export function isDish(item: IChef | IRestaurant | IDish): item is IDish {
  return (item as IDish).price !== undefined;
}
