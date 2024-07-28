import styled from "styled-components";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";
import { fontFamily } from "../../../../../constants/constants";

export const StyledTableCell = styled(TableCell)<{
  status?: string;
}>(({ status }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    textAlign: "center",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: 350,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    backgroundColor: status
      ? status === "active"
        ? "lightgreen"
        : status === "archive"
        ? "lightcoral"
        : "white"
      : "white",
    color: "black",
    textAlign: "center",
  },
}));

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: white;
  }

  &:last-child td,
  &:last-child th {
    border: 0;
  }

  height: 68px;
  font-family: ${fontFamily.globalFont};
`;
