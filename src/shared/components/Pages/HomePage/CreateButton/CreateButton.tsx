import React, { useState } from "react";
import { StyledCreateButton, StyledButtonEntryContainer } from "./styles";
import PopUpForm from "../../PopUpForm";
import { ModalOverlay, ModalContent, CloseButton } from "./styles";
import { buttonsText } from "../../../../constants/textContent";
const CreateButton: React.FC = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const handleCreateButtonClick = () => {
    setFormVisible(true);
  };

  const handleCloseModal = () => {
    setFormVisible(false);
  };

  return (
    <>
      <StyledButtonEntryContainer>
        <StyledCreateButton onClick={handleCreateButtonClick}>
          {buttonsText.createButton}
        </StyledCreateButton>
      </StyledButtonEntryContainer>

      {isFormVisible && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>&times;</CloseButton>
            <PopUpForm />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default CreateButton;
