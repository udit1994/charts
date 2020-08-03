import clsx from "clsx";
import React, { useCallback } from "react";
import {
  AppBar,
  CssBaseline,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ChevronLeft, Menu } from "@material-ui/icons";

import MainListItems from "components/MainListItems";
import style from "styles/internalLayout";

const useStyles = makeStyles(style);

function InternalLayout({ children }) {
  const [open, setOpen] = React.useState(false);

  const classes = useStyles();

  const handleDrawerOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleDrawerClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <Menu />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Charts
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.username}
          >
            {/* {data} */}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <MainListItems />
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </main>
    </div>
  );
}

export default InternalLayout;
