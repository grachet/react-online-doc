import React, {Component} from 'react';
import './styles/App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from '../screens/Home'
import Edit from '../screens/Edit'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import {fetchUser, fetchUsers} from "../redux/actions/user";
import {bindActionCreators} from "redux";
import {SnackbarProvider} from 'notistack';
import CssBaseline from "@material-ui/core/CssBaseline";
import {fetchDocumentation} from "../redux/actions/documentation";
import {color} from '../data/color'
import requireAuth from "../containers/requireAuth";
import SignIn from "../containers/SignIn"
import Notifier from "../containers/Notifier"

class App extends Component {


  componentWillMount() {
    this.props.fetchDocumentation();
    this.props.fetchUser();
    this.props.fetchUsers();
  }

  render() {

    return (
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true,
          },
          spacing: {
            unit: 6
          },
          palette: (this.props.user && this.props.user.darkTheme) ? {
            type: 'dark',
            primary: {
              main: "#015bab",
            },
            secondary: {
              main: "#0182E8",
            },
          } : {
            primary: {
              main: "#0182E8",
            },
            secondary: {
              main: "#015bab",
            },
          },
        })}>
        <SnackbarProvider maxSnack={3} dense
          // action={
          //   <IconButton size="small">
          //     <CloseIcon/>
          //   </IconButton>
          // }
        >
          <CssBaseline/>

          <Notifier/>
          <Router basename={`${process.env.PUBLIC_URL}/`}>
            <Switch>

              <Route path="/auth" component={SignIn}/>
              <Route exact path='/edit' component={requireAuth(Edit)}/>
              <Route path='/edit/:sid/:id' component={requireAuth(Edit)}/>
              <Route path="/:sid/:id" component={Home}/>
              <Route component={Home}/>
            </Switch>
          </Router>
        </SnackbarProvider>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchUser, fetchDocumentation, fetchUsers
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);

