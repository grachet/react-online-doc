import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from "../containers/Navigation";
import Drawer from "../components/Drawer";
import {fetchDocumentation, updateDocumentation} from "../redux/actions/documentation";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import styles from './styles/homeStyle'
import docJson from "../data/documentation";

class Edit extends React.Component {
  state = {
    open: true,
  };

  toggleDrawer = () => {
    this.setState(state => ({open: !state.open}));
  };

  render() {
    const {classes, documentation} = this.props;
    const {open} = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline/>
        <Navigation open={open} toggleDrawer={this.toggleDrawer}/>
        <Drawer open={open}/>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader}/>

          <button onClick={() => this.props.updateDocumentation(docJson)}>test</button>
          <button onClick={() => this.props.removeDocumentation()}>remove</button>
        </main>
      </div>
    );
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = ({user, documentation, users}) => {
  return {
    documentation, user, users
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDocumentation, updateDocumentation
}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Edit));

