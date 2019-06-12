import React, {Component} from "react";
import {connect} from "react-redux";
import {signIn} from "../redux/actions/user";
import Paper from "@material-ui/core/Paper/Paper";
import Typography from "@material-ui/core/Typography/Typography";
import {FaGoogle as GoogleIcon} from "react-icons/fa";
import {Toolbar, withStyles} from "@material-ui/core";
import styles from "./styles/loginStyle";
import Button from "@material-ui/core/Button/Button";
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import HomeIcon from '@material-ui/icons/Home'


class Signin extends Component {

  componentWillUpdate(nextProps) {
    if (nextProps.user && nextProps.user !== "notConnected") {
      this.props.history.push('/edit')
    }
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <img height={50} style={{marginRight: 8}}
                 src={process.env.PUBLIC_URL + ((this.props.user && this.props.user.darkTheme) ? "/DocMe_Logo_b.png" : "/DocMe_Logo_bf.png")}
                 alt=""/>
            <Typography variant={"h5"} className={classes.loginTitle} color="textPrimary">Login</Typography>

          </Toolbar>
        </AppBar>
        <Paper className={classes.paperContainer} elevation={2}>

          <Button onClick={() => this.props.signIn("google")} variant="contained" className={classes.buttonLoginGoogle}
                  color="primary">
            <GoogleIcon className={classes.icon}/> Google
          </Button>
          <br/>

          <Button onClick={() => this.props.signIn("anonymous")} variant="contained"
                  className={classes.buttonLoginAnonymous}
                  color="secondary">
            <AccountCircle className={classes.icon}/> Anonymous
          </Button>
          <br/>
          <br/>
          <Button onClick={() => this.props.history.push("/")} variant="contained"
                  className={classes.buttonLoginAnonymous}
                  color="default">
            <HomeIcon className={classes.icon}/> Back to doc
          </Button>


        </Paper>
      </div>
    );
  }
}

function mapStateToProps({user}) {
  return {user};
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, {signIn})(Signin));
