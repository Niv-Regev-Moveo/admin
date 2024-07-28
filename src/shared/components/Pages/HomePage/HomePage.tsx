import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar/index";
import {
  StyledPageContainer,
  StyledTableContainer,
  StyledPaper,
  StyledTableWrapper,
  StyledTitleSection,
} from "./styles";
import CollectionTitle from "../../CollectionTitle/CollectionTitle";
import CreateButton from "../HomePage/CreateButton";

const HomePage: React.FC = () => {
  return (
    <StyledPageContainer>
      <SideBar />
      <StyledTableContainer>
        <StyledTitleSection>
          <CollectionTitle />
          <CreateButton />
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
