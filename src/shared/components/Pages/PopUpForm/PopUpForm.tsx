import React, { useMemo, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../../../redux/store/store";
import {
  Collection,
  FormValues,
  CollectionDataType,
} from "../../../../redux/chunks/collection/collection.type";
import { fetchRestaurants } from "../../../../redux/chunks/collection/restaurants/restaurants.thunks";
import { fetchChefs } from "../../../../redux/chunks/collection/chefs/chefs.thunks";
import {
  StyledButton,
  StyledFormContainer,
  StyledFormTitle,
  StyledInput,
  StyledLabel,
} from "./styles";
import FormDropDown from "./DropDown/FormDropDown";
import {
  formFilterFields,
  formatFieldName,
} from "../../../../services/collectionService";
import { formText } from "../../../constants/textContent";
import { createNewItem } from "../../../../redux/chunks/collection/collection.thunks";

interface DropdownOption {
  _id: string;
  name: string;
}

interface PopUpFormProps {
  chefs: DropdownOption[];
  restaurants: DropdownOption[];
  onClose: () => void;
}

const PopUpForm: React.FC<PopUpFormProps> = ({
  chefs,
  restaurants,
  onClose,
}) => {
  const { collection } = useParams<{ collection?: Collection }>();
  const { data } = useSelector((state: RootState) => state.collectionState);
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState<FormValues>({});

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchChefs());
  }, [dispatch]);

  useEffect(() => {
    if (collection && Array.isArray(data) && data.length > 0) {
      const initialFormValues: FormValues = {};
      const fields = formFilterFields(collection, data);
      Object.keys(fields).forEach((field) => {
        initialFormValues[field as keyof FormValues];
      });
      setFormValues(initialFormValues);
    }
  }, [collection, data]);

  const fields = useMemo(() => {
    if (!collection || !Array.isArray(data) || data.length === 0) return [];
    const filteredFields = formFilterFields(collection, data);
    return Object.keys(filteredFields);
  }, [collection, data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value || "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (collection) {
      try {
        const newItemData: Partial<CollectionDataType> = {
          ...formValues,
        } as Partial<CollectionDataType>;

        if (collection === "restaurants") {
          newItemData.rating =
            typeof formValues.rating === "string"
              ? parseFloat(formValues.rating)
              : formValues.rating;
          newItemData.chef =
            typeof formValues.chef === "object"
              ? formValues.chef._id
              : formValues.chef;
        } else if (collection === "dishes") {
          newItemData.price =
            typeof formValues.price === "string"
              ? parseFloat(formValues.price)
              : formValues.price;
          newItemData.restaurant =
            typeof formValues.restaurant === "object"
              ? formValues.restaurant._id
              : formValues.restaurant;
        }

        await dispatch(
          createNewItem({ collection, data: newItemData })
        ).unwrap();

        onClose();
      } catch (error) {
        console.error("Error creating item:", error);
      }
    }
  };

  const singularCollection = collection?.endsWith("s")
    ? collection.slice(0, -1)
    : collection;

  return (
    <StyledFormContainer as="form" onSubmit={handleSubmit}>
      <StyledFormTitle>
        {formText.titles.headTitle} {singularCollection}
      </StyledFormTitle>
      {fields.length > 0 ? (
        fields.map((field) => (
          <div key={field}>
            <StyledLabel htmlFor={field}>{formatFieldName(field)}</StyledLabel>
            {field === "chef" ? (
              <FormDropDown
                options={chefs}
                selectedValue={
                  typeof formValues.chef === "object"
                    ? formValues.chef._id
                    : formValues.chef || ""
                }
                onChange={handleChange}
                placeholder="Chef"
                name={"chef"}
              />
            ) : field === "restaurant" ? (
              <FormDropDown
                options={restaurants}
                selectedValue={
                  typeof formValues.restaurant === "object"
                    ? formValues.restaurant._id
                    : formValues.restaurant || ""
                }
                onChange={handleChange}
                placeholder="Restaurant"
                name={"restaurant"}
              />
            ) : field === "rating" ? (
              <FormDropDown
                options={[
                  { _id: "1", name: "1" },
                  { _id: "2", name: "2" },
                  { _id: "3", name: "3" },
                  { _id: "4", name: "4" },
                  { _id: "5", name: "5" },
                ]}
                selectedValue={
                  formValues.rating ? String(formValues.rating) : ""
                }
                onChange={handleChange}
                placeholder="Rating"
                name={"rating"}
              />
            ) : field === "type" ? (
              <FormDropDown
                options={[
                  { _id: "spicy", name: "spicy" },
                  { _id: "vegan", name: "vegan" },
                  { _id: "vegetarian", name: "vegetarian" },
                  { _id: "no type", name: "no type" },
                ]}
                selectedValue={formValues.type ? String(formValues.type) : ""}
                onChange={handleChange}
                placeholder="Select type"
                name={"type"}
              />
            ) : (
              <StyledInput
                type={field === "price" ? "number" : "text"}
                id={field}
                name={field}
                value={
                  formValues[field as keyof FormValues] !== undefined
                    ? String(formValues[field as keyof FormValues])
                    : ""
                }
                onChange={handleChange}
                placeholder=""
              />
            )}
          </div>
        ))
      ) : (
        <p>{formText.errors.fieldError}</p>
      )}
      <StyledButton type="submit">{formText.button.submit} </StyledButton>
    </StyledFormContainer>
  );
};

export default PopUpForm;
