import React from "react";
import { StyledTableButton } from "./styles";

interface TableButtonProps {
  title: string;
  onClick?: () => void;
}

const TableButton: React.FC<TableButtonProps> = ({ title, onClick }) => {
  return (
    <StyledTableButton onClick={onClick}>
      {title === "Delete" ? <i className="gg-trash"></i> : null}
      {title === "Update" ? <i className="gg-pen"></i> : null}
    </StyledTableButton>
  );
};

export default TableButton;
