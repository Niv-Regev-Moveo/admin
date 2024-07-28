import styled from "styled-components";
import { TableCell, TableRow, tableCellClasses } from "@mui/material";
import { COLORS } from "../../../../../constants/colors";

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
