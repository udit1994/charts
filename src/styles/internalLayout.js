const drawerWidth = 240;

const style = (theme) => ({
  root: {
    display: "flex",
    height: "100%",
    width: "100%",
  },
  "@keyframes glow": {
    "40%": {
      textShadow: "0 0 10px #33272a",
    },
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    ...theme.mixins.toolbar,

    alignItems: "center",
    color: "#a786df",
    display: "flex",
    justifyContent: "flex-end",
    padding: "0 8px",
  },
  appBar: {
    backgroundColor: "#ffffff",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    color: "#a786df",
    display: "none",
  },
  username: {
    color: "black",
  },
  drawerPaper: {
    backgroundColor: "#ffffff",
    position: "relative",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    whiteSpace: "nowrap",
    width: drawerWidth,
  },
  drawerPaperClose: {
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    maxHeight: "100%",
    width: "100%",
  },
  container: {
    height: "calc(100% - 64px)",
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(4),
  },
  title: {
    animation: "$glow 2500ms linear infinite",
    color: "#33272a",
    flexGrow: 1,
    textDecoration: "none",
  },
});

export default style;
