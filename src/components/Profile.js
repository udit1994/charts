import React from "react";
import { useQuery } from "@apollo/client";
import { Paper, Grid, makeStyles } from "@material-ui/core";

import GET_USER from "queries/getUser";
import style from "styles/profile";

const useStyles = makeStyles((theme) => style(theme));

function Profile(props) {
  const { loading, error, data } = useQuery(GET_USER, {
    onCompleted: ({ getUser }) => {
      if (getUser) {
        console.log("Fetched user", getUser);
      }
    },
  });

  const classes = useStyles(style);

  if (loading) {
    return <div>Please wait while we fetch user profile...</div>;
  }

  if (error) {
    return (
      <div>Encountered an error fetching user profile. Please try again.</div>
    );
  }

  const { firstName, lastName, email, createdAt } = data.getUser;

  return (
    <Grid container direction="row" justify="space-around" alignItems="center">
      <Grid item xs={6}>
        <Paper className={classes.paper}>
          {firstName} {lastName} {email} {createdAt}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Profile;
