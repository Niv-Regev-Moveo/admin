import React from "react";
import { StyledSelect } from "./styles";

interface FormDropDownProps {
  options: { _id: string; name: string }[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  placeholder: string;
}

const FormDropDown: React.FC<FormDropDownProps> = ({
  options,
  selectedValue,
  onChange,
  name,
  placeholder,
}) => {
  return (
    <StyledSelect value={selectedValue} onChange={onChange} name={name}>
      <option value="">{`Select ${placeholder}`}</option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default FormDropDown;
