import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#467fcf", light: "#467fcf", dark: "#467fcf" },
    signin: {
      main: "#2A9D8F",
    },
    signup: {
      main: "#15ad41",
    },
    contrastText: "#ffffff",
    tertiary: { main: "#278acc", light: "#4b97c9", dark: "#16669c" },
    cardBase: { main: "#71a8d1", light: "#8ac3ed", dark: "#427396" },
  },
});

export default theme;
