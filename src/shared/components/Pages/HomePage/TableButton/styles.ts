import styled from "styled-components";

export const StyledTableButton = styled.button`
  background: none;
  padding: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  color: #8c8b8b;
  border: none;
  border-radius: 8px;

  &:hover {
    color: black;
    i {
      transform: scale(1.3);
      transition: transform 0.3s ease-out;
    }
  }
`;
