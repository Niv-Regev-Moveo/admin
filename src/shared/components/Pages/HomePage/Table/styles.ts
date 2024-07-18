import styled from "styled-components";
import TablePagination from "@mui/material/TablePagination";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { fontFamily } from "../../../../constants/constants";

export const Tooltip = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
`;

export const TooltipText = styled.span`
  visibility: hidden;
  width: 160px;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1000;
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
  transition: opacity 0.3s;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

export const StyledTablePagination = styled(TablePagination)`
  & .MuiTablePagination-toolbar {
    padding: 0 1rem;
    display: flex;
    justify-content: space-between;
  }

  & .MuiTablePagination-actions {
    display: flex;
    align-items: center;
  }
`;

export const StyledButtonsContainer = styled.div`
  display: flex;
`;

export const StyledTableCell = styled(TableCell)<{
  status?: string;
}>(({ status }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "white",
    color: "black",
    textTransform: "uppercase",
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

export const StyledTableFooterRow = styled(TableRow)`
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 1;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: white;
  }

  &:last-child td,
  &:last-child th {
    border: 0;
  }

  height: 68px;
`;

export const StyledPaper = styled(Paper)`
  width: "100%";
  overflow: "hidden";
`;

export const StyledTableContainer = styled(TableContainer)`
  box-shadow: 3;
  overflow-x: "auto";
  max-height: 65vh;
`;

export const StyledTable = styled(Table)`
  width: "100%";
  margin: "auto";
  font-family: ${fontFamily.globalFont};
`;
