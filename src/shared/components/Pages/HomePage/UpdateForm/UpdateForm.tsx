import React, { useMemo, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Collection,
  FormValues,
  ICommonItem,
} from "../../../../../redux/chunks/collection/collection.type";
import {
  StyledButton,
  StyledFormContainer,
  StyledFormTitle,
  StyledInput,
  StyledLabel,
} from "./styles";
import {
  ensureString,
  formUpdateFields,
  formatFieldName,
} from "../../../../../services/collectionService";
import DropdownField from "./DropDownFields";

interface DropdownOption {
  _id: string;
  name: string;
}

interface UpdateFormProps {
  chefs: DropdownOption[];
  restaurants: DropdownOption[];
  initialValues: ICommonItem;
  onClose: () => void;
  onSubmit: (updatedFields: Partial<ICommonItem>) => Promise<void>;
}

const UpdateForm: React.FC<UpdateFormProps> = ({
  chefs,
  restaurants,
  initialValues,
  onClose,
  onSubmit,
}) => {
  const { collection } = useParams<{ collection?: Collection }>();
  const [formValues, setFormValues] = useState<FormValues>(initialValues);

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  useEffect(() => {}, [restaurants, chefs]);

  const fields = useMemo(() => {
    if (!collection) return [];
    const filteredFields = formUpdateFields(collection, initialValues);
    return Object.keys(filteredFields);
  }, [collection, initialValues]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: name === "rating" || name === "price" ? parseFloat(value) : value,
    }));
  };

  const handleChefChange = (selectedChefId: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      chef: selectedChefId,
    }));
  };

  const handleRestaurantChange = (selectedRestaurantId: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      restaurant: selectedRestaurantId,
    }));
  };

  const handleTypeChange = (selectedType: string) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      type: selectedType === "no type" ? null : selectedType,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (collection) {
      try {
        const updatedItemData: Partial<ICommonItem> = { ...formValues };

        if (typeof formValues.chef === "object" && formValues.chef !== null) {
          updatedItemData.chef = formValues.chef._id;
        }
        await onSubmit(updatedItemData);
        setFormValues(updatedItemData);
        onClose();
      } catch (error) {
        console.error("Error updating item:", error);
      }
    }
  };

  const singularCollection = collection?.endsWith("s")
    ? collection.slice(0, -1)
    : collection;

  return (
    <StyledFormContainer as="form" onSubmit={handleSubmit}>
      <StyledFormTitle>Update {singularCollection}</StyledFormTitle>
      {fields.length > 0 ? (
        fields.map((field) => (
          <div key={field}>
            <StyledLabel htmlFor={field}>{formatFieldName(field)}</StyledLabel>
            {field === "chef" ? (
              <DropdownField
                options={chefs}
                selectedValue={ensureString(formValues.chef)}
                onChange={(e) => handleChefChange(e.target.value)}
                placeholder={
                  ensureString(initialValues.chefName) || "Select Chef"
                }
                name={"chef"}
                label={""}
              />
            ) : field === "restaurantName" ? (
              <DropdownField
                options={restaurants}
                selectedValue={ensureString(formValues.restaurant)}
                onChange={(e) => handleRestaurantChange(e.target.value)}
                placeholder={
                  ensureString(initialValues.restaurantName) ||
                  "Select Restaurant"
                }
                name={"restaurantName"}
                label={""}
              />
            ) : field === "type" ? (
              <DropdownField
                options={[
                  { _id: "spicy", name: "spicy" },
                  { _id: "vegan", name: "vegan" },
                  { _id: "vegetarian", name: "vegetarian" },
                  { _id: "no type", name: "no type" },
                ]}
                selectedValue={ensureString(formValues.type)}
                onChange={(e) => handleTypeChange(e.target.value)}
                placeholder="Select Type"
                name={"type"}
                label={""}
              />
            ) : field === "rating" ? (
              <DropdownField
                options={[
                  { _id: "1", name: "1" },
                  { _id: "2", name: "2" },
                  { _id: "3", name: "3" },
                  { _id: "4", name: "4" },
                  { _id: "5", name: "5" },
                ]}
                selectedValue={ensureString(formValues.rating)}
                onChange={handleChange}
                placeholder="Rating"
                name={"rating"}
                label={""}
              />
            ) : field === "status" ? (
              <DropdownField
                options={[
                  { _id: "active", name: "Active" },
                  { _id: "archive", name: "Archive" },
                ]}
                selectedValue={ensureString(formValues.status)}
                onChange={handleChange}
                placeholder="Status"
                name={"status"}
                label={""}
              />
            ) : (
              <StyledInput
                type={field === "price" ? "number" : "text"}
                id={field}
                name={field}
                value={ensureString(formValues[field as keyof FormValues])}
                onChange={handleChange}
                placeholder={
                  ensureString(initialValues[field as keyof ICommonItem]) || ""
                }
              />
            )}
          </div>
        ))
      ) : (
        <p>No fields available</p>
      )}
      <StyledButton type="submit">Update</StyledButton>
    </StyledFormContainer>
  );
};

export default UpdateForm;
