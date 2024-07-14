import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import GenericTable from "../../GenericTable";
import SideBar from "../../SideBar/SideBar";
import { StyledPageContainer, StyledTableContainer } from "./styles";

const HomePage = () => {
  return (
    <Router>
      <StyledPageContainer className="container">
        <SideBar />

        <StyledTableContainer>
          <Routes>
            <Route
              element={<GenericTable collection="chefs" />}
              path="/chefs"
            />
            <Route
              element={<GenericTable collection="restaurants" />}
              path="/restaurants"
            />
            <Route
              element={<GenericTable collection="dishes" />}
              path="/dishes"
            />
          </Routes>
        </StyledTableContainer>
      </StyledPageContainer>
    </Router>
  );
};

export default HomePage;
