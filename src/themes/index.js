import { createMuiTheme } from "@material-ui/core/styles";
import * as themePallete from "constants/themeConstants";

const baseTheme = createMuiTheme();

const themes = Object.freeze({
  [themePallete.PALLETE_1]: {
    primary: "#a786df",
    secondary: "#fec7d7",
    buttonBg: "#0e172c",
    buttonColor: "#fffffe",
    buttonHover: "#ff8ba7",
    text: "#0e172c",
  },
  [themePallete.PALLETE_2]: {
    primary: "#eebbc3",
    secondary: "#232946",
    buttonBg: "#eebbc3",
    buttonColor: "#232946",
    buttonHover: "#ff8ba7",
    text: "#b8c1ec",
  },
  [themePallete.PALLETE_3]: {
    primary: "#a786df",
    secondary: "",
    buttonBg: "#0e172c",
    buttonColor: "#fffffe",
    buttonHover: "#ff8ba7",
    text: "#f9f8fc",
  },
});

export const applyTheme = (theme) =>
  createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        "@global": {
          "*": {
            boxSizing: "border-box",
          },
          html: {
            height: "100%",
            width: "100%",
          },
          body: {
            height: "100%",
            width: "100%",
          },
          "#root": {
            height: "100%",
            width: "100%",
          },
        },
      },
      MuiAvatar: {
        circle: {
          margin: baseTheme.spacing(1),
          backgroundColor: themes[theme].primary,
        },
      },
      MuiButton: {
        contained: {
          backgroundColor: themes[theme].buttonBg,
          color: themes[theme].buttonColor,
          margin: baseTheme.spacing(3, 0, 2),
          "&:hover": {
            backgroundColor: themes[theme].buttonHover,
          },
        },
      },
      MuiIconButton: {
        root: {
          color: themes[theme].primary,
          "&:hover": {
            backgroundColor: themes[theme].buttonHover,
          },
        },
      },
      MuiInputLabel: {
        root: {
          color: themes[theme].primary,
        },
      },
      MuiListItem: {
        button: {
          "&:hover": {
            backgroundColor: themes[theme].buttonHover,
          },
        },
      },
      MuiPaper: {
        root: {
          backgroundColor: themes[theme].secondary,
          color: themes[theme].text,
        },
      },
      MuiSvgIcon: {
        root: {
          color: themes[theme].primary,
        },
      },
      MuiTextField: {
        root: {
          borderColor: themes[theme].primary,
        },
      },
    },
  });

export default themes;
