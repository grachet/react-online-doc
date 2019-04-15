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
    const {classes,open} = this.props;
    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar}/>
        {open}
      </Drawer>
    );
  }
}


export default withStyles(styles, {withTheme: true})((DrawerNav));