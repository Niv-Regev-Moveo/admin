import styled from "styled-components";
import {
  fontFamily,
  fontSizes,
  fontWeight,
} from "../../../../constants/constants";
import { COLORS } from "../../../../constants/colors";

export const StyledFormContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  margin: auto;
  background-color: ${COLORS.background.from};
  border-radius: 8px;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.8);
`;

export const StyledFormTitle = styled.h2`
  font-size: ${fontSizes.xlLarge};
  color: ${COLORS.global.black};
  font-family: ${fontFamily.globalFont};
`;

export const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid ${COLORS.border.inputBorder};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
`;

export const StyledLabel = styled.label`
  margin-bottom: 4px;
  font-weight: ${fontWeight.boldWeight};
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.button.backgroundColor};
  color: ${COLORS.global.white};
  font-size: ${fontSizes.medium16};
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: ${COLORS.button.buttonOnHover};
  }
`;
