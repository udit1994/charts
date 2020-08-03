import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Form, Field } from "react-final-form";
import { Link, useHistory } from "react-router-dom";
import { TextField } from "final-form-material-ui";
import { useMutation } from "@apollo/client";
import {
  Button,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";

import style from "styles/signIn";
import { CREATE_SESSION } from "mutations";
import { setToken } from "lib/auth";

const useStyles = makeStyles((theme) => style(theme));

const validate = (values) => {
  const errors = {};
  if (!values.username) {
    errors.username = "Required";
  }
  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [createSession, { loading }] = useMutation(CREATE_SESSION, {
    onCompleted: ({ createSession }) => {
      if (createSession) {
        setToken(createSession.token);
        history.push("/dashboard");
      }
    },
  });

  const onSubmit = (values) => {
    delete values.rememberMe;

    return createSession({
      variables: { input: values },
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <LockOutlinedIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Form
          keepDirtyOnReinitialize
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Field
                autoComplete="username"
                autoFocus
                component={TextField}
                fullWidth
                id="username"
                label="Username"
                margin="normal"
                name="username"
                variant="outlined"
              />
              <Field
                autoComplete="current-password"
                component={TextField}
                fullWidth
                id="password"
                label="Password"
                margin="normal"
                name="password"
                type="password"
                variant="outlined"
              />
              <Button
                className={classes.submit}
                disabled={loading}
                fullWidth
                type="submit"
                variant="contained"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="">Forgot password?</Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
        />
      </div>
    </Container>
  );
}

export default SignIn;
