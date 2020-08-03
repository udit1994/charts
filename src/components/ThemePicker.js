import React, { useContext } from "react";
import Grid from "@material-ui/core/Grid";

import ThemePalette from "components/ThemePalette";
import CurrentThemeContext from "context/CurrentThemeContext";
import themes from "themes";

const ThemePicker = () => {
  const currentTheme = useContext(CurrentThemeContext);

  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      {React.Children.toArray(
        Object.keys(themes).map((themeName) => (
          <Grid item>
            <ThemePalette
              isSelected={themeName === currentTheme.palette}
              handleClick={() => currentTheme.changeTheme(themeName)}
              theme={themes[themeName]}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default ThemePicker;
