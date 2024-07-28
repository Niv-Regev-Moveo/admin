import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import { useParams } from "react-router-dom";
import { AppDispatch } from "../../../../../redux/store/store";
import {
  getCollection,
  updateStatus,
  updateItem,
} from "../../../../../redux/chunks/collection/collection.thunks";
import {
  Collection,
  ICommonItem,
  IChef,
  IRestaurant,
} from "../../../../../redux/chunks/collection/collection.type";
import {
  StyledPaper,
  StyledTable,
  StyledTableContainer,
  StyledTablePagination,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "./styles";
import { filterFields } from "../../../../../services/collectionService";
import UpdateForm from "../UpdateForm";
import TableHeader from "./TableHeader/TableHeader";
import TableContent from "./TableContent/TableContent";

import { fetchRestaurants } from "../../../../../redux/chunks/collection/restaurants/restaurants.thunks";
import { fetchChefs } from "../../../../../redux/chunks/collection/chefs/chefs.thunks";

export interface DropdownOption {
  _id: string;
  name: string;
}

const GenericTable: React.FC = () => {
  const { collection } = useParams<{ collection?: Collection }>();
  const dispatch = useDispatch<AppDispatch>();
  const [tableData, setTableData] = useState<ICommonItem[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [backgroundColors, setBackgroundColors] = useState<{
    [key: string]: string;
  }>({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ICommonItem | null>(null);
  const [chefOptions, setChefOptions] = useState<DropdownOption[]>([]);
  const [restaurantOptions, setRestaurantOptions] = useState<DropdownOption[]>(
    []
  );

  useEffect(() => {
    if (collection) {
      fetchData();
      fetchChefsOptions();
      fetchRestaurantOptions();
    }
  }, [collection]);

  const fetchData = async () => {
    if (collection) {
      const action = await dispatch(getCollection({ collection }));
      if (getCollection.fulfilled.match(action)) {
        setTableData(action.payload);
      }
    }
  };

  const fetchChefsOptions = async () => {
    const action = await dispatch(fetchChefs());
    if (fetchChefs.fulfilled.match(action)) {
      const options = action.payload.map((chef: IChef) => ({
        _id: chef._id,
        name: chef.name,
      }));
      setChefOptions(options);
    } else {
      console.error("Failed to fetch chefs:", action.error);
    }
  };

  const fetchRestaurantOptions = async () => {
    const action = await dispatch(fetchRestaurants());
    if (fetchRestaurants.fulfilled.match(action)) {
      const options = action.payload.map((restaurant: IRestaurant) => ({
        _id: restaurant._id,
        name: restaurant.name,
      }));
      setRestaurantOptions(options);
    } else {
      console.error("Failed to fetch restaurants:", action.error);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleUpdate = (item: ICommonItem) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = async (id: string | undefined) => {
    if (id && collection) {
      try {
        const action = await dispatch(
          updateStatus({ collection, id, status: "archive" })
        );
        if (updateStatus.fulfilled.match(action)) {
          setBackgroundColors((prevColors) => ({
            ...prevColors,
            [id]: "lightcoral",
          }));
          await fetchData(); // Re-fetch data to get the latest status
        }
      } catch (error) {
        console.error("Failed to archive item:", error);
      }
    } else {
      console.error("Failed to archive item: id is undefined");
    }
  };

  const handleUpdateSubmit = async (updatedFields: Partial<ICommonItem>) => {
    if (collection && selectedItem) {
      await dispatch(
        updateItem({ collection, id: selectedItem._id, data: updatedFields })
      );
      await fetchData();
      handleClosePopup();
    }
  };

  const filteredData = useMemo(() => {
    if (!collection) return [];

    return filterFields(collection, tableData);
  }, [tableData, collection]);

  const sortedData = useMemo(() => {
    return filteredData.sort((a, b) =>
      a.status === "archive" ? 1 : b.status === "archive" ? -1 : 0
    );
  }, [filteredData]);

  return (
    <StyledPaper>
      <StyledTableContainer>
        <StyledTable>
          <TableHead>
            <TableHeader data={sortedData} />
          </TableHead>
          <TableBody>
            <TableContent
              data={sortedData}
              page={page}
              rowsPerPage={rowsPerPage}
              backgroundColors={backgroundColors}
              handleUpdate={handleUpdate}
              handleDelete={handleDelete}
            />
          </TableBody>
        </StyledTable>
      </StyledTableContainer>
      <StyledTablePagination
        rowsPerPageOptions={[5, 10, 25]}
        count={sortedData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isPopupOpen && selectedItem && (
        <ModalOverlay>
          <ModalContent>
            <CloseButton onClick={handleClosePopup}>&times;</CloseButton>
            <UpdateForm
              chefs={chefOptions}
              restaurants={restaurantOptions}
              initialValues={selectedItem}
              onClose={handleClosePopup}
              onSubmit={handleUpdateSubmit}
            />
          </ModalContent>
        </ModalOverlay>
      )}
    </StyledPaper>
  );
};

export default GenericTable;
