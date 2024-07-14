// styles.js (continued)
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledSideBarContainer = styled.div`
  width: 10%;
  background-color: #f0f0f5;
  padding: 20px;
`;

export const StyledContentTitle = styled.h3`
  font-size: 20px;
  font-weight: lighter;
  font-family: sans-serif;
`;

export const StyledLink = styled(NavLink)`
  display: block;
  width: 100%;
  text-decoration: none;
  padding: 10px;
  color: inherit;
  font-size: 16px;
  letter-spacing: 0.1rem;
  padding-left: 20px;
  font-weight: lighter;
  font-family: sans-serif;
  position: relative;

  &::before {
    content: "•";
    position: absolute;
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: inherit;
  }
  &.active {
    background-color: #e8edfc;
    color: blue;
  }

  &:hover {
    filter: brightness(0.85);
  }
`;
