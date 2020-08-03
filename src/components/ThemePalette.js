import clsx from "clsx";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import style from "styles/themePalette";

const useStyles = makeStyles((theme) => style(theme));

const ThemePalette = ({ isSelected, handleClick, theme }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.wrapper, { [classes.current]: isSelected })}
      onClick={handleClick}
    >
      <div
        className={classes.partition}
        style={{ backgroundColor: theme.primary }}
      />
      <div>
        <div
          className={classes.partition}
          style={{ backgroundColor: theme.secondary }}
        />
        <div
          className={classes.partition}
          style={{ backgroundColor: theme.accent }}
        />
      </div>
    </div>
  );
};

export default ThemePalette;
