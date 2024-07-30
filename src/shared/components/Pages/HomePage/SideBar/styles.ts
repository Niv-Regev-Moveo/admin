import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  fontFamily,
  fontSizes,
  fontWeight,
  letterSpacing,
  screenSizes,
} from "../../../../constants/constants";
import { COLORS } from "../../../../constants/colors";

export const StyledSideBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 13%;
  border-right: 1px solid ${COLORS.border.sectionBorder};
  min-width: 130px;
`;

export const StyledContentTitle = styled.h2`
  font-size: 20px;
  font-family: ${fontFamily.globalFont};
  letter-spacing: ${letterSpacing.medium};
  font-size: ${fontSizes.large};
  font-weight: ${fontWeight.heavyWeight};
  padding-left: 15px;
  padding-bottom: 30px;
  padding-top: 30px;
  border-bottom: 1px solid ${COLORS.border.sectionBorder};
`;

export const StyledLink = styled(NavLink)`
  display: block;
  text-decoration: none;
  padding: 15px;
  color: inherit;
  position: relative;
  font-size: ${fontSizes.medium};
  letter-spacing: 0.1rem;
  padding-left: 20px;
  font-family: ${fontFamily.globalFont};
  font-weight: ${fontWeight.heavyWeight};

  &::before {
    content: "•";
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: inherit;
  }
  &.active {
    background-color: ${COLORS.sidebar.sectionActive};
    color: ${COLORS.sidebar.blue};
    border-right: 1px solid ${COLORS.sidebar.blue};
  }

  &:hover {
    filter: brightness(0.85);
  }

  @media (max-width: ${screenSizes.small}) {
    font-size: ${fontSizes.little};
  }
`;

export const StyledSideBarSectionsNames = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1%;
`;

export const StyledTypeTitle = styled.h3`
  font-size: ${fontSizes.small};
  font-family: ${fontFamily.globalFont};
  font-weight: ${fontWeight.boldWeight};
  padding-left: 10px;

  @media (max-width: ${screenSizes.small}) {
    font-size: ${fontSizes.little};
  }
`;

export const StyledH1 = styled.h1`
  font-family: ${fontFamily.globalFont};
  font-size: 24px;
`;
