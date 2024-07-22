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

const getKeys = (item: ICommonItem): string[] => {
  return Object.keys(item).filter((key) => key !== "image" && key !== "_id");
};

const GenericTable: React.FC = () => {
  const { collection } = useParams<{ collection?: Collection }>();
  const dispatch = useDispatch<AppDispatch>();
  const { data } = useSelector((state: RootState) => state.collectionState);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [backgroundColors, setBackgroundColors] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    if (collection) {
      dispatch(getCollection({ collection }));
    }
  }, [dispatch, collection]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = (id: string | undefined) => {
    if (id) {
      console.log(`Archiving item with id: ${id}`);
      if (collection) {
        dispatch(updateStatus({ collection, id, status: "archive" }));
        setBackgroundColors((prevColors) => ({
          ...prevColors,
          [id]: "lightcoral",
        }));
      }
    } else {
      console.error("Failed to archive item: id is undefined");
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
  }, [sortedData]);

  const tableContent = useMemo(() => {
    if (!sortedData || sortedData.length === 0) {
      return (
        <StyledTableRow key="no-data">
          <StyledTableCell colSpan={3}>No data available</StyledTableCell>
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
              {statusValue === "archive" ? "Archive" : "Active"}
            </StyledTableCell>
            <StyledTableCell>
              <StyledButtonsContainer>
                <TableButton type="UPDATE" onClick={() => {}} />
                <TableButton
                  type="DELETE"
                  onClick={() => handleDelete(itemId)}
                />
              </StyledButtonsContainer>
            </StyledTableCell>
          </StyledTableRow>
        );
      });
  }, [sortedData, page, rowsPerPage, handleDelete, backgroundColors]);

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
