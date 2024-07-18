import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./shared/components/Pages/HomePage/HomePage";
import GenericTable from "./shared/components/Pages/HomePage/Table"; // Ensure the correct path
import { StyledPageContainer } from "./globalStyles";
import "./index.css";

const App: React.FC = () => {
  return (
    <Router>
      <StyledPageContainer>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="content/:collection" element={<GenericTable />} />
          </Route>
        </Routes>
      </StyledPageContainer>
    </Router>
  );
};

export default App;
