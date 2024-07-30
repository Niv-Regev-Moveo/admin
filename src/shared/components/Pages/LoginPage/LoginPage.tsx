import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError } from "../../../../redux/chunks/collection/auth/auth.slice";
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
import LoginParagraph from "./LoginParagraph";
import { handleLogin } from "../../../../services/loginService";

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [mail, setMail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { loading, user, error } = useSelector(
    (state: RootState) => state.authState
  );

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await handleLogin(dispatch, mail, password, navigate);
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
      </form>
      {error && <LoginParagraph>{error}</LoginParagraph>}
      {user && !error && (
        <LoginParagraph>Welcome, {user.surname}</LoginParagraph>
      )}
    </StyledLoginContainer>
  );
};

export default Login;
