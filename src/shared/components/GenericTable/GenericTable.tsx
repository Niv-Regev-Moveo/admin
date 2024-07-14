import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { RootState, AppDispatch } from "../../../redux/store/store";
import { getCollection } from "../../../redux/chunks/collection/collection.thunks";
import {
  Collection,
  ICommonItem,
} from "../../../redux/chunks/collection/collection.type";
import { Tooltip, TooltipText } from "./styles";
import { filterFields } from "../../../services/collectionService"; // Import the filter service

const StyledTableCell = styled(TableCell)<{
  isStatus?: boolean;
  status?: string;
}>(({ theme, isStatus, status }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    maxWidth: 350,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    backgroundColor: isStatus
      ? status === "active"
        ? "lightgreen"
        : "lightcoral"
      : "inherit",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  height: "68px",
}));

interface GenericTableProps {
  collection: Collection;
}

const getKeys = (item: ICommonItem): string[] => {
  return Object.keys(item).filter((key) => key !== "image" && key !== "_id");
};

const GenericTable: React.FC<GenericTableProps> = ({ collection }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, httpErr } = useSelector(
    (state: RootState) => state.collectionState
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    console.log(`Dispatching fetchCollection for ${collection}`);
    dispatch(getCollection({ collection }));
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

  const filteredData = useMemo(() => {
    return data ? filterFields(collection, data) : [];
  }, [data, collection]);

  const tableHeaders = useMemo(() => {
    if (!filteredData || filteredData.length === 0) {
      return null;
    }

    const keys = getKeys(filteredData[0] as ICommonItem);

    return (
      <StyledTableRow>
        <StyledTableCell>id</StyledTableCell>
        {keys.map((key) => (
          <StyledTableCell key={key}>{key}</StyledTableCell>
        ))}
      </StyledTableRow>
    );
  }, [filteredData]);

  const tableContent = useMemo(() => {
    if (!filteredData || filteredData.length === 0) {
      return (
        <StyledTableRow>
          <StyledTableCell colSpan={3}>No data available</StyledTableCell>
        </StyledTableRow>
      );
    }

    const keys = getKeys(filteredData[0] as ICommonItem);

    return filteredData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((item, index) => {
        const itemId = (item as ICommonItem)._id;

        return (
          <StyledTableRow key={itemId}>
            <StyledTableCell>{page * rowsPerPage + index + 1}</StyledTableCell>
            {keys.map((key) => {
              const value = item[key as keyof ICommonItem];
              return (
                <StyledTableCell
                  key={`${itemId}-${key}`}
                  isStatus={key === "status"}
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
          </StyledTableRow>
        );
      });
  }, [filteredData, page, rowsPerPage]);

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{ overflowX: "auto", maxHeight: "50vh" }}
      >
        <Table
          sx={{ width: "90%", margin: "auto" }}
          aria-label="customized table"
        >
          <TableHead>{tableHeaders}</TableHead>
          <TableBody>{tableContent}</TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData ? filteredData.length : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{
          "& .MuiTablePagination-toolbar": {
            padding: "0 1rem",
            display: "flex",
            justifyContent: "space-between",
          },
          "& .MuiTablePagination-actions": {
            display: "flex",
            alignItems: "center",
          },
        }}
      />
    </>
  );
};

export default GenericTable;
