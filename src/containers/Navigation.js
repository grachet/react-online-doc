import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import {Link, withRouter} from "react-router-dom";
import LightIcon from '@material-ui/icons/Opacity';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SeeIcon from '@material-ui/icons/RemoveRedEye';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import {withStyles} from '@material-ui/core/styles';
import {signOut, toggleTheme} from "../redux/actions/user"
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import styles from "./styles/navStyle";
import AlertDialogue from "../components/AlertDialogue";
import MenuIcon from "@material-ui/icons/Menu";
import CloseMenuIcon from "@material-ui/icons/ArrowBack";
import SuggestField from "../components/SuggestField"
import {getDocIndex} from "../data/helperFunctions";


class MenuAppBar extends React.Component {

  state = {
    openAlert: false
  }

  render() {
    const {classes, documentation, user, open, toggleDrawer} = this.props;

    const {sid, id} = this.props.match.params;

    const {docs} = getDocIndex(this.props);

    let withIfEdit = this.props.match.url.indexOf("/edit") === 0 ? "/edit/" : "/";

    let pageSuggestData = [];
    docs && docs.forEach((cat, i) => {
      cat.pages && cat.pages.forEach((page, i) => {
        pageSuggestData.push({label: page.title, value: withIfEdit + cat.titleSection + "/" + page.title})
      })
    })

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

          <img height={50} style={{marginRight: 8}}
               src={process.env.PUBLIC_URL + ((this.props.user && this.props.user.darkTheme) ? "/DocMe_Logo_b.png" : "/DocMe_Logo_bf.png")}
               alt=""/>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <SuggestField
              setValue={(selectedUrl) => this.props.history.push(selectedUrl)}
              data={pageSuggestData}
              placeholder={"Search…"}
              numberSuggestionsMax={8}
            />
          </div>


          <Typography variant="title" color="inherit" className={classes.title}>
            {this.props.match.params.id === "undefined" ? "Doc" : this.props.match.params.id}
          </Typography>


          {<Typography key={1} variant="subheading" color="inherit">
            {(user && user !== "notConnected") ? (user.isAnonymous ? "Anonymous" : user.displayName) : "Log In"}
          </Typography>}

          <IconButton
            key={2}
            color="inherit"
            onClick={() => user && (user.displayName || user.isAnonymous) ? this.setState({openAlert: true}) : this.props.history.push("/auth")}
          >
            <AccountCircle/>
          </IconButton>

          <IconButton
            color="inherit"
            onClick={() => this.props.toggleTheme()}
          >
            <LightIcon/>
          </IconButton>


          {
            this.props.match.url.indexOf("/edit") === 0 ? <IconButton
              color="inherit"
              onClick={() => this.props.history.push("/" + sid + "/" + id)}
            >
              <SeeIcon/>
            </IconButton> : <IconButton
              to={"/edit/" + sid + "/" + id}
              component={Link}
              color="inherit"
            >
              <EditIcon/>
            </IconButton>}

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

export default withRouter(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(MenuAppBar)));
