import {
  IChef,
  IRestaurant,
  IDish,
  ICommonItem,
} from "../redux/chunks/collection/collection.type";

const collectionSpecificFieldsToExcludeForForm: { [key: string]: string[] } = {
  chefs: ["restaurants"],
  restaurants: ["dishes"],
};

const genericFieldsToExcludeForForm = ["status", "restaurants", "dishes"];

const genericFieldsToExcludeForUpdateForm = ["restaurants", "dishes"];

export const filterFields = (
  collection: string,
  data: ICommonItem[]
): ICommonItem[] => {
  const fieldsToExcludeForTable: never[] = [];

  const excludeFields = [
    ...fieldsToExcludeForTable,
    ...(collectionSpecificFieldsToExcludeForForm[collection] || []),
  ];

  return data.map((item) => {
    const filteredItem = { ...item } as Partial<ICommonItem>;
    excludeFields.forEach((field) => {
      delete filteredItem[field as keyof ICommonItem];
    });
    return filteredItem as ICommonItem;
  });
};

export const formatFieldName = (fieldName: string): string => {
  if (!fieldName || fieldName === "_id") {
    return "";
  }
  return fieldName;
};

export const getKeys = (item: ICommonItem): string[] => {
  return Object.keys(item).filter((key) => key !== "image" && key !== "_id");
};

export const formFilterFields = (
  collection: string,
  data: ICommonItem[]
): ICommonItem => {
  if (!Array.isArray(data) || data.length === 0) return {} as ICommonItem;

  const excludeFields = [
    "_id",
    ...genericFieldsToExcludeForForm,
    ...(collectionSpecificFieldsToExcludeForForm[collection] || []),
  ];

  const filteredItem = { ...data[0] };
  excludeFields.forEach((field) => {
    delete filteredItem[field as keyof ICommonItem];
  });

  return filteredItem;
};

export const formUpdateFields = (
  collection: string,
  data: ICommonItem
): Partial<ICommonItem> => {
  const excludeFields = [
    "_id",
    ...genericFieldsToExcludeForUpdateForm,
    ...(collectionSpecificFieldsToExcludeForForm[collection] || []),
  ];

  const filteredItem: Partial<ICommonItem> = { ...data };
  excludeFields.forEach((field) => {
    delete filteredItem[field as keyof ICommonItem];
  });
  return filteredItem;
};

export function isValidInputValue(
  value: unknown
): value is string | number | readonly string[] | undefined {
  return (
    typeof value === "string" ||
    typeof value === "number" ||
    Array.isArray(value) ||
    value === undefined
  );
}

export function isRestaurant(
  item: IChef | IRestaurant | IDish
): item is IRestaurant {
  return (item as IRestaurant).rating !== undefined;
}

export function isDish(item: IChef | IRestaurant | IDish): item is IDish {
  return (item as IDish).price !== undefined;
}

export type ValueType =
  | string
  | number
  | boolean
  | string[]
  | { _id: string }
  | IChef
  | IRestaurant
  | IDish[]
  | null
  | undefined;
export const ensureString = (value: ValueType): string => {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number" || typeof value === "boolean") {
    return value.toString();
  } else if (Array.isArray(value)) {
    return value.join(", ");
  } else if (value && typeof value === "object" && "_id" in value) {
    return value._id;
  } else {
    return "";
  }
};
