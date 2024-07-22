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
import { isValidInputValue } from "../../../../services/collectionService"; // Adjust the import path as necessary

interface DropdownOption {
  _id: string;
  name: string;
}

interface PopUpFormProps {
  chefs: DropdownOption[];
  restaurants: DropdownOption[];
}

const PopUpForm: React.FC<PopUpFormProps> = ({ chefs, restaurants }) => {
  const { collection } = useParams<{ collection?: Collection }>();
  const { data } = useSelector((state: RootState) => state.collectionState);
  const dispatch = useDispatch<AppDispatch>();

  const [formValues, setFormValues] = useState<FormValues>({});

  useEffect(() => {
    dispatch(fetchRestaurants());
    dispatch(fetchChefs());
  }, [dispatch]);

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
      [name]: name === "rating" || name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (collection) {
      try {
        console.log("Form values before transformation:", formValues);

        const newItemData: Partial<CollectionDataType> = {
          ...formValues,
        } as Partial<CollectionDataType>;

        if (collection === "restaurants") {
          newItemData.rating =
            typeof formValues.rating === "string"
              ? parseFloat(formValues.rating)
              : formValues.rating;
          newItemData.chef = formValues.chef;
        } else if (collection === "dishes") {
          newItemData.price =
            typeof formValues.price === "string"
              ? parseFloat(formValues.price)
              : formValues.price;
          newItemData.restaurant = formValues.restaurant;
        }

        console.log("Form values being submitted:", newItemData);
        const newItem = await dispatch(
          createNewItem({ collection, data: newItemData })
        ).unwrap();
        console.log("New item created:", newItem);
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
            {field === "chefName" ? (
              <FormDropDown
                options={chefs}
                selectedValue={formValues.chef || ""}
                onChange={handleChange}
                placeholder="Chef"
                name={"chef"}
              />
            ) : field === "restaurantName" ? (
              <FormDropDown
                options={restaurants}
                selectedValue={formValues.restaurant || ""}
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
            ) : (
              <StyledInput
                type={field === "price" ? "number" : "text"}
                id={field}
                name={field}
                value={
                  isValidInputValue(formValues[field as keyof FormValues])
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
      <StyledButton type="submit">{formText.button.submit}</StyledButton>
    </StyledFormContainer>
  );
};

export default PopUpForm;
