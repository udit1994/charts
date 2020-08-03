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

import style from "styles/signUp";
import { CREATE_USER } from "mutations";
import { setToken } from "lib/auth";

const useStyles = makeStyles((theme) => style(theme));

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  }

  if (!values.username) {
    errors.username = "Required";
  }

  if (!values.password) {
    errors.password = "Required";
  }

  return errors;
};

export default function SignUp() {
  const classes = useStyles();
  const history = useHistory();

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      setToken(createUser.token);
      history.push("/dashboard");
    },
  });

  const onSubmit = ({
    firstName,
    lastName,
    email,
    username,
    password,
    rememberMe,
  }) => {
    // TODO Implement remember me in the browser
    createUser({
      variables: { input: { firstName, lastName, email, username, password } },
    });

    return;
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <LockOutlinedIcon fontSize="large" />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Form
          initialValues={{ rememberMe: true }}
          keepDirtyOnReinitialize
          onSubmit={onSubmit}
          validate={validate}
          render={({ handleSubmit }) => (
            <form className={classes.form} onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={TextField}
                    fullWidth
                    id="firstName"
                    label="First Name"
                    margin="normal"
                    name="firstName"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={TextField}
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    margin="normal"
                    name="lastName"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    required
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Field
                    component={TextField}
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    required
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Button
                // className={classes.submit}
                disabled={loading}
                fullWidth
                type="submit"
                variant="contained"
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/" variant="body2">
                    Already have an account? Sign in
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
