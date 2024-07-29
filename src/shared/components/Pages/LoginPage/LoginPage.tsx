// LoginPage.tsx (Frontend)
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../../redux/chunks/collection/auth/auth.thunk";
import { RootState, AppDispatch } from "../../../../redux/store/store";
import {
  StyledLoginContainer,
  StyledLoginTitle,
  StyledInput,
  StyledLabel,
  StyledButton,
  StyledButtonContainer,
} from "./styles";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, error, user } = useSelector(
    (state: RootState) => state.authState
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser({ mail, password }));
      if (loginUser.fulfilled.match(resultAction)) {
        console.log("Login successful:", resultAction.payload);
        onLogin();
        navigate(
          //insert here component for "welcome - choose table"
          `/content/chefs
          
          `
        );
      } else {
        if (resultAction.payload) {
          console.error("Login failed:", resultAction.payload);
        } else {
          console.error("Login failed: No payload returned");
        }
      }
    } catch (error) {
      console.error("Unexpected error during login:", error);
    }
  };

  return (
    <StyledLoginContainer>
      <StyledLoginTitle>Login</StyledLoginTitle>
      <form onSubmit={handleSubmit}>
        <div>
          <StyledLabel htmlFor="mail">Mail:</StyledLabel>
          <StyledInput
            id="mail"
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
        <div>
          <StyledLabel htmlFor="password">Password:</StyledLabel>
          <StyledInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <StyledButtonContainer>
          <StyledButton type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </StyledButton>
        </StyledButtonContainer>
        {error && <p>{error}</p>}
      </form>
      {user && <p>Welcome, {user.surname}</p>}
    </StyledLoginContainer>
  );
};

export default Login;
