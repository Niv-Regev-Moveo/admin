import React from "react";
import { StyledSelect } from "../styles";

interface DropdownOption {
  _id: string;
  name: string;
}

interface FormDropDownProps {
  options: DropdownOption[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder: string;
  name: string;
}

const FormDropDown: React.FC<FormDropDownProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder,
  name,
}) => {
  return (
    <StyledSelect name={name} value={selectedValue} onChange={onChange}>
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option._id} value={option._id}>
          {option.name}
        </option>
      ))}
    </StyledSelect>
  );
};

export default FormDropDown;
