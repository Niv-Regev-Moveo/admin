import styled from "styled-components";
import {
  fontFamily,
  fontSizes,
  fontWeight,
  screenSizes,
} from "../../../constants/constants";
import { COLORS } from "../../../constants/colors";

export const StyledPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const StyledTableContainer = styled.div`
  width: 85%;
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
`;

export const StyledPaper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-grow: 1;
`;

export const StyledTableWrapper = styled.div`
  width: 100%;
  max-width: 90%;
`;

export const StyledTitleSection = styled.div`
  margin-left: 30px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 25px;
  padding-bottom: 70px;
`;

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
