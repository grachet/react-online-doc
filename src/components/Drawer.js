import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import {drawerWidth} from '../data/const'
import {withStyles} from "@material-ui/core";

const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
});

class DrawerNav extends Component {

  render() {
    const {classes} = this.props;
    return (
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        open
        anchor={"left"}
        variant="permanent"
      >
        <div className={classes.toolbar}/>
      </Drawer>
    );
  }
}


export default withStyles(styles, {withTheme: true})((DrawerNav));