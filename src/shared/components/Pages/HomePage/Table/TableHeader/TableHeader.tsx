import React from "react";
import { StyledTableRow, StyledTableCell } from "./styles";
import { ICommonItem } from "../../../../../../redux/chunks/collection/collection.type";
import {
  formatFieldName,
  getKeys,
} from "../../../../../../services/collectionService";
import { tableHeaders } from "../../../../../constants/textContent";

interface TableHeaderProps {
  data: ICommonItem[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ data }) => {
  if (!data.length) return <StyledTableRow></StyledTableRow>;

  const keys = getKeys(data[0]).filter((key) => key !== "status");

  return (
    <StyledTableRow>
      <StyledTableCell>{tableHeaders.id}</StyledTableCell>
      {keys.map((key) => (
        <StyledTableCell key={`header-${key}`}>
          {formatFieldName(key)}
        </StyledTableCell>
      ))}
      <StyledTableCell>{tableHeaders.status}</StyledTableCell>
      <StyledTableCell></StyledTableCell>
    </StyledTableRow>
  );
};

export default TableHeader;
