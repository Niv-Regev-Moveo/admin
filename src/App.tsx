import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import HomePage from "./shared/components/Pages/HomePage/HomePage";
import GenericTable from "./shared/components/Pages/HomePage/Table";
import Login from "./shared/components/Pages/LoginPage";
import { StyledPageContainer } from "./globalStyles";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store/store";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.authState.token);

  return (
    <Router>
      <StyledPageContainer>
        <Routes>
          {!token ? (
            <>
              <Route path="/users/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/users/login" />} />
            </>
          ) : (
            <>
              <Route path="/" element={<HomePage />}>
                <Route path="content/:collection" element={<GenericTable />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      </StyledPageContainer>
    </Router>
  );
};

export default App;
