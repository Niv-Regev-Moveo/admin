import styled from "styled-components";

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;

  &:focus {
    border-color: #555;
    outline: none;
  }
`;