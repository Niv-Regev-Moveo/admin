import styled from "styled-components";
import { fontFamily } from "../../../constants/constants";

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
  background-color: blue;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 5px;
  padding-top: 5px;
  color: white;
  border: none;
  border-radius: 4px;
  font-family: ${fontFamily.globalFont};
  background-color: #406af5;

  &:hover {
    cursor: pointer;
  }
`;
