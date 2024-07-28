import styled from "styled-components";
import { fontWeight } from "../../../../../constants/constants";
import { COLORS } from "../../../../../constants/colors";

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin: 8px 0;
  box-sizing: border-box;
  border: 1px solid ${COLORS.border.inputBorder};
  border-radius: 4px;
`;

export const StyledLabel = styled.label`
  margin-bottom: 4px;
  font-weight: ${fontWeight.boldWeight};
`;
