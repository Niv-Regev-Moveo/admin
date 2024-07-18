import React from "react";
import { useLocation } from "react-router-dom";
import { StyledH1 } from "./styles";

const CollectionTitle: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const collectionName = path.split("/").filter(Boolean).pop();

  return (
    <StyledH1>
      {collectionName
        ? collectionName.charAt(0).toUpperCase() + collectionName.slice(1)
        : "Hello"}
    </StyledH1>
  );
};

export default CollectionTitle;
