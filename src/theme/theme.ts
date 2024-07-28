import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    divider: "rgba(0, 0, 0, 0.12)",
  },
  zIndex: {
    appBar: 1100,
  },
});
