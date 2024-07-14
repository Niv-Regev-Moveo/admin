import { collectionNames } from "../../constants/constants";
import {
  StyledContentTitle,
  StyledLink,
  StyledSideBarContainer,
} from "./styles";

const SideBar = () => {
  return (
    <StyledSideBarContainer>
      <div>
        <StyledContentTitle>Content</StyledContentTitle>
      </div>

      {collectionNames.map((collection) => (
        <StyledLink to={`/${collection}`} key={collection}>
          {collection}
        </StyledLink>
      ))}
    </StyledSideBarContainer>
  );
};
export default SideBar;
