import React, {Component} from 'react';
import Navigation from '../containers/Navigation'
import styles from './styles/homeStyle'
import {withStyles} from '@material-ui/core/styles';
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from 'redux';
import {fetchDocumentation, updateDocumentation} from '../redux/actions/documentation'
import Drawer from "../components/Drawer";

class Edit extends Component {

  render() {
    const {classes, documentation} = this.props;
    return (
      <div className={classes.container}>
        <Navigation/>
        <Drawer/>
        home

        {JSON.stringify({name: "moi"})}

        <button ></button>

      </div>
    );
  }
}


const mapStateToProps = ({user, documentation, users}) => {
  return {
    documentation, user, users
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDocumentation, updateDocumentation
}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Edit));

