import styled from "styled-components";
import { COLORS } from "../../../../constants/colors";
import {
  fontFamily,
  fontSizes,
  fontWeight,
  screenSizes,
} from "../../../../constants/constants";

export const StyledButtonEntryContainer = styled.div`
  margin-top: 30px;
  padding-right: 50px;
`;

export const StyledCreateButton = styled.button`
  background-color: ${COLORS.button.backgroundColor};
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 5px;
  padding-top: 5px;
  color: ${COLORS.global.white};
  border: none;
  border-radius: 4px;
  font-family: ${fontFamily.globalFont};
  font-size: ${fontSizes.medium};
  font-weight: ${fontWeight.boldWeight};

  &:hover {
    cursor: pointer;
    background-color: ${COLORS.button.buttonOnHover};
  }

  @media (max-width: ${screenSizes.medium}) {
    font-size: ${fontSizes.small};
    margin-left: 30px;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(7px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${COLORS.global.white};
  border-radius: 4px;
  position: relative;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(221, 221, 221, 0.8);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: ${fontSizes.big};
  cursor: pointer;
  border-radius: 10%;
  &:hover {
    background: ${COLORS.button.closeButtonHover};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`;
