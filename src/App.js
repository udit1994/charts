import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ApolloProvider } from "@apollo/client";
import { Box } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";

import * as themeConstants from "constants/themeConstants";
import client from "apollo";
import CurrentThemeContext from "context/CurrentThemeContext";
import { applyTheme } from "themes";
import {
  ProtectedRoute,
  SignIn,
  SignUp,
  Profile,
  Integrations,
  ThemePicker,
} from "components";

const App = () => {
  const [palette, setPalette] = useState(themeConstants.PALLETE_1);
  const CurrentThemeProvider = CurrentThemeContext.Provider;

  return (
    <>
      <CssBaseline />
      <ApolloProvider client={client}>
        <ThemeProvider theme={applyTheme(palette)}>
          <CurrentThemeProvider value={{ palette, changeTheme: setPalette }}>
            <Box height="100%" width="100%">
              <Router>
                <Switch>
                  <ProtectedRoute path="/profile" component={Profile} />
                  <ProtectedRoute path="/dashboard" component={Integrations} />
                  <ProtectedRoute path="/themes" component={ThemePicker} />
                  <Route path="/signup" component={SignUp}></Route>
                  <Route path="/" component={SignIn}></Route>
                </Switch>
              </Router>
            </Box>
          </CurrentThemeProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
