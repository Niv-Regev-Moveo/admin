import styled from "styled-components";
import { COLORS } from "../../../../constants/colors";
import { fontFamily } from "../../../../constants/constants";

export const StyledPopUpSubmitMessageContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 400px;
  margin: auto;
  background-color: ${COLORS.background.from};
  border-radius: 8px;
  box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.8);
  font-family: ${fontFamily.global};
`;

export const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`;

export const StyledTextContainer = styled.div`
  display: flex;
  justify-content: center;
`;
