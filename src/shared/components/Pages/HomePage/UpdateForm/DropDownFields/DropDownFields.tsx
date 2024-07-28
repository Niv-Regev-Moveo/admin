import React from "react";
import { StyledSelect, StyledLabel } from "./styles";

interface DropdownOption {
  _id: string;
  name: string;
}

interface DropdownFieldProps {
  label: string;
  name: string;
  options: DropdownOption[];
  selectedValue: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  name,
  options,
  selectedValue,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
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
    </div>
  );
};

export default DropdownField;
