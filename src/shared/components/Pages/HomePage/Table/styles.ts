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
import { fontFamily, fontSizes } from "../../../../constants/constants";
import { COLORS } from "../../../../constants/colors";

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
  z-index: 1;
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
    border-color: ${COLORS.global.black} transparent transparent transparent;
  }

  ${Tooltip}:hover & {
    visibility: visible;
    opacity: 1;
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
  background-color: ${COLORS.global.white};
  z-index: 1;
`;

export const StyledTableRow = styled(TableRow)`
  &:nth-of-type(odd) {
    background-color: ${COLORS.global.white};
  }

  &:last-child td,
  &:last-child th {
    border: 0;
  }

  height: 68px;
`;

export const StyledPaper = styled(Paper)`
  width: 100%;
  overflow: hidden;
`;

export const StyledTableContainer = styled(TableContainer)`
  box-shadow: 3;
  overflow-x: auto;
  max-height: 65vh;
`;

export const StyledTable = styled(Table)`
  width: 100%;
  margin: auto;
  font-family: ${fontFamily.globalFont};
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(7px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const ModalContent = styled.div`
  background: ${COLORS.global.white};
  border-radius: 4px;
  position: relative;
  max-width: 500px;
  box-shadow: 0 5px 15px rgba(221, 221, 221, 0.8);
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: ${fontSizes.big};
  cursor: pointer;
  border-radius: 10%;
  &:hover {
    background: ${COLORS.button.CloseButtonHover};
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  }
`;
