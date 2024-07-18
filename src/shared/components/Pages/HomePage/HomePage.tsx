import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/index";
import {
  StyledPageContainer,
  StyledTableContainer,
  StyledPaper,
  StyledTableWrapper,
  StyledTitleSection,
  StyledCreateButton,
  StyledButtonEntryContainer,
} from "./styles";
import CollectionTitle from "../CollectionTitle/index";
import { buttonsText } from "../../../constants/textContent";

const HomePage: React.FC = () => {
  return (
    <StyledPageContainer>
      <SideBar />

      <StyledTableContainer>
        <StyledTitleSection>
          <CollectionTitle />
          <StyledButtonEntryContainer>
            <StyledCreateButton>{buttonsText.createButton}</StyledCreateButton>
          </StyledButtonEntryContainer>
        </StyledTitleSection>

        <StyledPaper>
          <StyledTableWrapper>
            <Outlet />
          </StyledTableWrapper>
        </StyledPaper>
      </StyledTableContainer>
    </StyledPageContainer>
  );
};

export default HomePage;
