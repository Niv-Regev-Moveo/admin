// src/App.tsx
import React, { useState } from "react";
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

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <StyledPageContainer>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route
                path="/users/login"
                element={<Login onLogin={handleLogin} />}
              />
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
