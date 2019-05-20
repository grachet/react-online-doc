import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link, withRouter} from "react-router-dom";
import LightIcon from '@material-ui/icons/Opacity';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LibIcon from '@material-ui/icons/Book';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import {signOut, toggleTheme} from "../redux/actions/user"
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import styles from "./styles/navStyle";
import AlertDialogue from "../components/AlertDialogue";
import MenuIcon from "@material-ui/icons/Menu";
import CloseMenuIcon from "@material-ui/icons/ArrowBack";


class MenuAppBar extends React.Component {

  state = {
    openAlert: false
  }

  render() {
    const {classes, user, open, toggleDrawer} = this.props;

    return (

      <AppBar position="fixed"
              className={classes.appBar}
      >
        <Toolbar disableGutters={true}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={toggleDrawer}
            className={classes.mlmd}
          >
            {open ? <CloseMenuIcon/> : <MenuIcon/>}
          </IconButton>
          <IconButton
            color="inherit"
            onClick={() => this.props.history.push("/")}
          >
            <LibIcon/>
          </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>


          <Typography variant="title" color="inherit" className={classes.title}>
            {this.props.title}
          </Typography>


          {user && <Typography key={1} variant="subheading" color="inherit">
            {user.isAnonymous ? "Anonymous" : user.displayName}
          </Typography>}

            <IconButton
              key={2}
              color="inherit"
              onClick={() => user && user.displayName ? this.setState({openAlert: true}) : this.props.history.push("/auth")}
            >
              <AccountCircle/>
            </IconButton>

          <IconButton
            color="inherit"
            onClick={() => this.props.toggleTheme()}
          >
            <LightIcon/>
          </IconButton>

          <IconButton
            to={"/edit"}
            component={Link}
            color="inherit"
          >
            <EditIcon/>
          </IconButton>

        </Toolbar>
        <AlertDialogue
          open={this.state.openAlert}
          title={"Log out ?"}
          onClose={() => this.setState({openAlert: false})}
          onOk={() => {
            this.props.signOut()
          }}
          cancelButtonTitle={"No"}
          closeOnOK
          okButtonTitle={"Yes"}
        />
      </AppBar>

    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({user, documentation}) => {
  return {
    user,
    documentation
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  toggleTheme, signOut
}, dispatch);

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MenuAppBar)));
