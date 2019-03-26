import React, {Component} from 'react';
import Navigation from '../containers/Navigation'
import styles from './styles/homeStyle'
import {withStyles} from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from 'redux';
import {fetchProjects, removeProject, updateProject} from '../redux/actions/projects'
import Drawer from "../components/Drawer";

class Home extends Component {

  render() {
    const {classes, projects} = this.props;
    return (
      <div className={classes.container}>
        <Navigation/>
        <Drawer/>
        home

      </div>
    );
  }
}


const mapStateToProps = ({user, projects, users}) => {
  return {
    projects, user, users
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  removeProject, updateProject, fetchProjects
}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Home));

