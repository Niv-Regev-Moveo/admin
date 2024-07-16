import React from "react";
import { collectionNames } from "../../../../constants/constants";
import { sideBarText } from "../../../../constants/textContent";
import {
  StyledContentTitle,
  StyledLink,
  StyledSideBarContainer,
  StyledSideBarSectionsNames,
  StyledTypeTitle,
} from "./styles";

const SideBar: React.FC = () => {
  return (
    <StyledSideBarContainer>
      <div>
        <StyledContentTitle>{sideBarText.main}</StyledContentTitle>
      </div>
      <StyledTypeTitle>{sideBarText.secondary}</StyledTypeTitle>
      <StyledSideBarSectionsNames>
        {collectionNames.map((collection) => (
          <StyledLink to={`/content/${collection}`} key={collection}>
            {collection}
          </StyledLink>
        ))}
      </StyledSideBarSectionsNames>
    </StyledSideBarContainer>
  );
};

export default SideBar;
