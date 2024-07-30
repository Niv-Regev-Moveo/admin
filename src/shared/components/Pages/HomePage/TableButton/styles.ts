import styled from "styled-components";
import { COLORS } from "../../../../constants/colors";

export const StyledTableButton = styled.button`
  background: none;
  padding: 10px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  color: ${COLORS.button.tableButtons};
  border: none;
  border-radius: 8px;

  &:hover {
    color: ${COLORS.global.black};
    i {
      transform: scale(1.3);
      transition: transform 0.3s ease-out;
    }
  }
`;
