import styled from "styled-components";
import {
  fontFamily,
  fontSizes,
  fontWeight,
} from "../../../constants/constants";
import { COLORS } from "../../../constants/colors";

export const StyledLoginContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  margin: auto;
  background-color: ${COLORS.global.black};
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledLoginTitle = styled.h2`
  font-size: ${fontSizes.xlLarge};
  color: ${COLORS.global.white};
  font-family: ${fontFamily.globalFont};
  padding-left: 30px;
`;

export const StyledInput = styled.input`
  padding: 8px;
  border: 1px solid ${COLORS.border.inputBorder};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 30px;
  margin-top: 10px;
`;

export const StyledLabel = styled.label`
  margin-bottom: 4px;
  font-weight: ${fontWeight.boldWeight};
  color: ${COLORS.global.white};
  padding-bottom: 30px;
`;

export const StyledButton = styled.button`
  padding: 10px 20px;
  width: 50%;
  border: none;
  border-radius: 4px;
  background-color: ${COLORS.button.loginButton};
  color: ${COLORS.global.white};
  font-size: ${fontSizes.medium16};
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: ${COLORS.button.buttonOnHover};
  }
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const StyledParagraph = styled.div`
  color: ${COLORS.global.white};
`;
