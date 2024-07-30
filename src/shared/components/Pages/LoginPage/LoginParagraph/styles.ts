import styled from "styled-components";
import { COLORS } from "../../../../constants/colors";

export const StyledParagraphContainer = styled.div`
  background-color: ${COLORS.errorMessage.backgroundColor};
  border: ${COLORS.global.white} 1px solid;
`;

export const StyledTextBox = styled.p`
  color: ${COLORS.global.white};
  text-align: center;
`;
