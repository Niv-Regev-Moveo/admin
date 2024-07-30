import React from "react";
import {
  StyledTableRow,
  StyledTableCell,
  StyledButtonsContainer,
  Tooltip,
  TooltipText,
} from "../styles";
import { ICommonItem } from "../../../../../../redux/chunks/collection/collection.type";
import { getKeys } from "../../../../../../services/collectionService";
import TableButton from "../../TableButton";
import { textErrors } from "../../../../../constants/textContent";

interface TableContentProps {
  data: ICommonItem[];
  page: number;
  rowsPerPage: number;
  backgroundColors: { [key: string]: string };
  handleUpdate: (item: ICommonItem) => void;
  handleDelete: (id: string | undefined) => void;
}

const TableContent: React.FC<TableContentProps> = ({
  data,
  page,
  rowsPerPage,
  backgroundColors,
  handleUpdate,
  handleDelete,
}) => {
  if (!data || data.length === 0) {
    return (
      <StyledTableRow key="no-data">
        <StyledTableCell colSpan={3}>${textErrors.noData}</StyledTableCell>
      </StyledTableRow>
    );
  }

  const keys = getKeys(data[0]).filter((key) => key !== "status");

  return (
    <>
      {data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((item, index) => {
          const itemId = item._id;
          const displayIndex = page * rowsPerPage + index + 1;
          const statusValue = item.status;

          return (
            <StyledTableRow
              key={itemId}
              style={{ backgroundColor: backgroundColors[itemId] || "inherit" }}
            >
              <StyledTableCell>{displayIndex}</StyledTableCell>
              {keys.map((key) => {
                const value = item[key as keyof ICommonItem];

                return (
                  <StyledTableCell
                    key={`${itemId}-${key}`}
                    data-isstatus={key === "status"}
                    status={key === "status" ? (value as string) : undefined}
                  >
                    {key === "name" ? (
                      <Tooltip>
                        {value !== undefined && value !== null
                          ? String(value)
                          : ""}
                        <TooltipText className="tooltiptext">
                          {itemId}
                        </TooltipText>
                      </Tooltip>
                    ) : key === "chef" && value && typeof value === "object" ? (
                      (value as { name: string }).name
                    ) : key === "dishes" && Array.isArray(value) ? (
                      value.map((dish, i) => (
                        <React.Fragment key={`${itemId}-dish-${i}`}>
                          {(dish as { name: string }).name}
                        </React.Fragment>
                      ))
                    ) : key === "restaurants" && Array.isArray(value) ? (
                      value.map((restaurant, i) => (
                        <React.Fragment key={`${itemId}-restaurant-${i}`}>
                          {(restaurant as { name: string }).name}
                        </React.Fragment>
                      ))
                    ) : value !== undefined && value !== null ? (
                      String(value)
                    ) : (
                      ""
                    )}
                  </StyledTableCell>
                );
              })}
              <StyledTableCell status={statusValue}>
                {statusValue === "archive" ? "Archive" : "Active"}
              </StyledTableCell>
              <StyledTableCell>
                <StyledButtonsContainer>
                  <TableButton
                    type="UPDATE"
                    onClick={() => handleUpdate(item)}
                  />
                  <TableButton
                    type="DELETE"
                    onClick={() => handleDelete(itemId)}
                  />
                </StyledButtonsContainer>
              </StyledTableCell>
            </StyledTableRow>
          );
        })}
    </>
  );
};

export default TableContent;
