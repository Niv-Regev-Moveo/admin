import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../redux/store/store";
import { Collection } from "../../../../redux/chunks/collection/collection.type";
import {
  StyledButton,
  StyledFormContainer,
  StyledFormTitle,
  StyledInput,
  StyledLabel,
} from "./styles";
import {
  formFilterFields,
  formatFieldName,
} from "../../../../services/collectionService";
import { formText } from "../../../constants/textContent";

const PopUpForm: React.FC = () => {
  const { collection } = useParams<{ collection?: Collection }>();
  const { data } = useSelector((state: RootState) => state.collectionState);
  const [formValues, setFormValues] = useState<{ [key: string]: string }>({});

  const fields = useMemo(() => {
    if (!collection || !Array.isArray(data) || data.length === 0) return [];
    const filteredFields = formFilterFields(collection, data);
    return Object.keys(filteredFields);
  }, [collection, data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
            <StyledInput
              type="text"
              id={field}
              name={field}
              value={formValues[field] || ""}
              onChange={handleChange}
              placeholder={`Enter ${formatFieldName(field)}`}
            />
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
