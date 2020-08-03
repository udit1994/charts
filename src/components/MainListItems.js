import React from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import PowerSettingsNewTwoToneIcon from "@material-ui/icons/PowerSettingsNewTwoTone";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";

import { clearToken } from "lib/auth";
import { DELETE_SESSION } from "mutations";

const MainListItems = () => {
  const history = useHistory();

  const [deleteSession, { loading }] = useMutation(DELETE_SESSION, {
    onCompleted: ({ deleteSession: { success } }) => {
      if (success) {
        clearToken();
        history.push("/");
      }
    },
  });

  return (
    <>
      <ListItem button onClick={() => history.push("/dashboard")}>
        <ListItemIcon>
          <DashboardOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={() => history.push("/profile")}>
        <ListItemIcon>
          <AccountCircleOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={() => history.push("/themes")}>
        <ListItemIcon>
          <SettingsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Theme" />
      </ListItem>
      <ListItem button onClick={deleteSession}>
        <ListItemIcon>
          <PowerSettingsNewTwoToneIcon disabled={loading} />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </>
  );
};

export default MainListItems;
