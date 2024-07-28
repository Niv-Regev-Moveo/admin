import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyledCreateButton,
  StyledButtonEntryContainer,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "./styles";
import PopUpForm from "../../PopUpForm";
import { buttonsText } from "../../../../constants/textContent";
import { fetchChefs } from "../../../../../redux/chunks/collection/chefs/chefs.thunks";
import { fetchRestaurants } from "../../../../../redux/chunks/collection/restaurants/restaurants.thunks";
import { RootState, AppDispatch } from "../../../../../redux/store/store";

const CreateButton: React.FC = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const chefs = useSelector((state: RootState) => state.chefsState.chefs);
  const restaurants = useSelector(
    (state: RootState) => state.restaurantsState.restaurants
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isFormVisible) {
      dispatch(fetchChefs());
      dispatch(fetchRestaurants());
    }
  }, [isFormVisible, dispatch]);

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
            <PopUpForm
              chefs={chefs}
              restaurants={restaurants}
              onClose={function (): void {
                throw new Error("Function not implemented.");
              }}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default CreateButton;
