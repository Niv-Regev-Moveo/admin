import { submitText } from "../../../../constants/textContent";
import {
  StyledButtonContainer,
  StyledPopUpSubmitMessageContainer,
  StyledTextContainer,
} from "./styles";

const PopUpSubmit = () => {
  return (
    <StyledPopUpSubmitMessageContainer>
      <StyledButtonContainer>
        <button>X</button>
      </StyledButtonContainer>
      <StyledTextContainer>
        <h3>{submitText.success}</h3>
      </StyledTextContainer>
    </StyledPopUpSubmitMessageContainer>
  );
};

export default PopUpSubmit;
