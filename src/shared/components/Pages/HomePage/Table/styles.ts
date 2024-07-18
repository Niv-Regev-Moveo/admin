import styled from "styled-components";
import TablePagination from "@mui/material/TablePagination";
import { TableHead } from "@mui/material";

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
