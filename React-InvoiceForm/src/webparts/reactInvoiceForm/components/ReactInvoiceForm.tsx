import * as React from "react";
import { useState, useEffect } from "react";
import styles from "./ReactInvoiceForm.module.scss";
import { IReactInvoiceFormProps } from "./IReactInvoiceFormProps";
import { escape } from "@microsoft/sp-lodash-subset";
import AppBar from "@material-ui/core/AppBar";
import Modal from "@material-ui/core/Modal";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import { blue } from "@material-ui/core/colors";
import Fade from "@material-ui/core/Fade";
import {PublicClientApplication} from '@azure/msal-browser';
import {TabsWrappedLabel} from './Tabs/Tabs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "white",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "24ch",
        },
      },
    },
    logIn: {
      marginLeft: 0,
      backgroundColor : "white",
      alignSelf : 'auto'
    },
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const config = {auth: {
  clientId: 'your_app_id',
  redirectUri: "your_app_redirect_uri", //defaults to application start page
  postLogoutRedirectUri: "your_app_logout_redirect_uri"
}};

const loginRequest = {
  scopes: ["User.ReadWrite"]
};

let username = "";

const myMsal = new PublicClientApplication(config);


export default function SearchAppBar() {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const _handleOpen = () => {
    setOpen(true);
  };

  const _handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Material-UI
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.logIn}>
            <Button  onClick={_handleOpen}>
              Login
            </Button>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={_handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
          <Fade in={open}>
            <div className={classes.paper}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">
                react-transition-group animates me.
              </p>
            </div>
          </Fade>
          </Modal>
          </div>
        </Toolbar>
      </AppBar>
      <br />
      <div>
              <TabsWrappedLabel />
      </div>
    </div>
  );
}
