import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { useParams } from "react-router-dom";
import { RootState, AppDispatch } from "../../../../../redux/store/store";
import {
  getCollection,
  updateStatus,
} from "../../../../../redux/chunks/collection/collection.thunks";
import {
  Collection,
  ICommonItem,
} from "../../../../../redux/chunks/collection/collection.type";
import {
  StyledButtonsContainer,
  StyledPaper,
  StyledTable,
  StyledTableCell,
  StyledTableContainer,
  StyledTablePagination,
  StyledTableRow,
  Tooltip,
  TooltipText,
} from "./styles";
import { filterFields } from "../../../../../services/collectionService";
import TableButton from "../TableButton/TableButton";
import { formatFieldName } from "../../../../../services/collectionService";
import { tableCells } from "../../../../constants/textContent";

const getKeys = (item: ICommonItem): string[] => {
  return Object.keys(item).filter((key) => key !== "image" && key !== "_id");
};

const GenericTable: React.FC = () => {
  const { collection } = useParams<{ collection?: Collection }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data, httpErr } = useSelector(
    (state: RootState) => state.collectionState
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (collection) {
      dispatch(getCollection({ collection }));
    }
  }, [dispatch, collection]);

  useEffect(() => {
    if (data) {
      console.log("Data received:", data);
    }
    if (httpErr) {
      console.error("Error received:", httpErr);
    }
  }, [data, httpErr]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleArchive = (id: string) => {
    if (collection) {
      dispatch(updateStatus({ collection, id, status: "archive" }));
    }
  };

  const filteredData = useMemo(() => {
    if (!collection) return [];
    return data ? filterFields(collection, data) : [];
  }, [data, collection]);

  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) =>
      a.status === "archive" ? 1 : b.status === "archive" ? -1 : 0
    );
  }, [filteredData]);

  const tableHeaders = useMemo(() => {
    if (!sortedData || !sortedData.length) {
      return <StyledTableRow></StyledTableRow>;
    }

    const keys = getKeys(sortedData[0] as ICommonItem).filter(
      (key) => key !== "status"
    );

    return (
      <StyledTableRow>
        <StyledTableCell>{tableCells.id}</StyledTableCell>
        {keys.map((key) => (
          <StyledTableCell key={`header-${key}`}>
            {formatFieldName(key)}
          </StyledTableCell>
        ))}
        <StyledTableCell>{tableCells.status}</StyledTableCell>
        <StyledTableCell></StyledTableCell>
      </StyledTableRow>
    );
  }, [sortedData]);

  const tableContent = useMemo(() => {
    if (!sortedData || sortedData.length === 0) {
      return (
        <StyledTableRow key="no-data">
          <StyledTableCell colSpan={3}>{tableCells.ErrNoData}</StyledTableCell>
        </StyledTableRow>
      );
    }

    const keys = getKeys(sortedData[0] as ICommonItem).filter(
      (key) => key !== "status"
    );

    return sortedData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item, index) => {
        const itemId = (item as ICommonItem)._id;
        const displayIndex = page * rowsPerPage + index + 1;
        const statusValue = (item as ICommonItem).status;

        return (
          <StyledTableRow key={itemId}>
            <StyledTableCell>{displayIndex}</StyledTableCell>
            {keys.map((key) => {
              const value = item[key as keyof ICommonItem];

              return (
                <StyledTableCell key={`${itemId}-${key}`}>
                  {key === "name" ? (
                    <Tooltip>
                      {value !== undefined && value !== null
                        ? String(value)
                        : ""}
                      <TooltipText className="tooltiptext">
                        {itemId}
                      </TooltipText>
                    </Tooltip>
                  ) : key === "chefName" ? (
                    value && typeof value === "string" ? (
                      value
                    ) : (
                      ""
                    )
                  ) : key === "dishes" ? (
                    Array.isArray(value) ? (
                      (value as string[]).map((dish, i) => (
                        <React.Fragment key={`${itemId}-dish-${i}`}>
                          {i > 0 && ", "}
                          {dish}
                        </React.Fragment>
                      ))
                    ) : (
                      ""
                    )
                  ) : key === "restaurants" ? (
                    Array.isArray(value) ? (
                      (value as unknown as { name: string }[]).map(
                        (restaurant, i) => (
                          <React.Fragment key={`${itemId}-restaurant-${i}`}>
                            {i > 0 && ", "}
                            {restaurant.name}
                          </React.Fragment>
                        )
                      )
                    ) : (
                      ""
                    )
                  ) : value !== undefined && value !== null ? (
                    String(value)
                  ) : (
                    ""
                  )}
                </StyledTableCell>
              );
            })}
            <StyledTableCell status={statusValue}>
              {statusValue}
            </StyledTableCell>
            <StyledTableCell>
              <StyledButtonsContainer>
                <TableButton type="UPDATE" onClick={() => {}} />
                <TableButton
                  type="DELETE"
                  onClick={() => handleArchive(itemId)}
                />
              </StyledButtonsContainer>
            </StyledTableCell>
          </StyledTableRow>
        );
      });
  }, [sortedData, page, rowsPerPage, dispatch, collection]);

  return (
    <StyledPaper>
      <StyledTableContainer>
        <StyledTable>
          <TableHead>{tableHeaders}</TableHead>
          <TableBody>{tableContent}</TableBody>
        </StyledTable>
      </StyledTableContainer>
      <StyledTablePagination
        rowsPerPageOptions={[5, 10, 25]}
        count={sortedData ? sortedData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </StyledPaper>
  );
};

export default GenericTable;
