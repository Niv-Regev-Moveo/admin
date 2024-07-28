import React from "react";
import { StyledInput, StyledLabel } from "../styles";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div>
      <StyledLabel htmlFor={name}>{label}</StyledLabel>
      <StyledInput
        type={type}
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
