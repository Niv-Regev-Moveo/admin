import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    common: {
      white: "#ffffff",
      black: "#000000",
    },
    divider: "rgba(0, 0, 0, 0.12)",
    // Add other palette options as needed
  },
  zIndex: {
    appBar: 1100,
    // Add other zIndex options as needed
  },
});
