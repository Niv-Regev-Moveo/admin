import React from "react";
import { StyledTableRow, StyledTableCell } from "./styles";
import { ICommonItem } from "../../../../../../redux/chunks/collection/collection.type";
import {
  formatFieldName,
  getKeys,
} from "../../../../../../services/collectionService";

interface TableHeaderProps {
  data: ICommonItem[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ data }) => {
  if (!data.length) return <StyledTableRow></StyledTableRow>;

  const keys = getKeys(data[0]).filter((key) => key !== "status");

  return (
    <StyledTableRow>
      <StyledTableCell>ID</StyledTableCell>
      {keys.map((key) => (
        <StyledTableCell key={`header-${key}`}>
          {formatFieldName(key)}
        </StyledTableCell>
      ))}
      <StyledTableCell>STATUS</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </StyledTableRow>
  );
};

export default TableHeader;
