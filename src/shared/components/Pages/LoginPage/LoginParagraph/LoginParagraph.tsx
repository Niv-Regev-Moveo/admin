import React from "react";
import { StyledParagraphContainer, StyledTextBox } from "./styles";

interface LoginParagraphProps {
  children: React.ReactNode;
}

const LoginParagraph: React.FC<LoginParagraphProps> = ({ children }) => {
  return (
    <StyledParagraphContainer>
      <StyledTextBox>{children}</StyledTextBox>
    </StyledParagraphContainer>
  );
};

export default LoginParagraph;
