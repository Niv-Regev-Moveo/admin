import React from "react";
import { StyledTableButton } from "./styles";
import { TableButtonTypes } from "../../../../constants/textContent";

interface TableButtonProps {
  type: keyof typeof TableButtonTypes;
  onClick: () => void;
}

const TableButton: React.FC<TableButtonProps> = ({ type, onClick }) => {
  return (
    <StyledTableButton onClick={onClick}>
      {type === TableButtonTypes.DELETE && <i className="gg-trash"></i>}
      {type === TableButtonTypes.UPDATE && <i className="gg-pen"></i>}
    </StyledTableButton>
  );
};

export default TableButton;
