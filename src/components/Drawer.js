import React, {Component} from 'react';
import Drawer from '@material-ui/core/Drawer';
import {drawerWidth} from '../data/const'
import {Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, withStyles} from "@material-ui/core";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import ListIcon from '@material-ui/icons/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

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

  renderNavList = () => {

    const {sid, id} = this.props.match.params;

    const {documentation} = this.props;
    if (!documentation) return null;
    let doc = documentation[documentation.length - 1].documentation;

    let withIfEdit = this.props.match.url.indexOf("/edit") === 0 ? "/edit/" : "/";

    return (
      <List
        dense
      >
        {
          doc.map((section, sectionIndex) => <div key={sectionIndex}>
              <ListItem button
                        onClick={() => this.props.history.push(withIfEdit + section.titleSection + "/" + "Doc")}
              >
                <ListItemIcon>
                  <ListIcon/>
                </ListItemIcon>
                <ListItemText inset primary={section.titleSection}/>
                {sid === section.titleSection ? <ExpandLess/> : <ExpandMore/>}
              </ListItem>

              {sid === section.titleSection && section.pages && !!section.pages.length &&
              <Divider/>}
              <Collapse in={sid === section.titleSection} timeout="auto"
                        unmountOnExit>
                <List component="div" dense disablePadding>
                  {
                    section.pages && section.pages.map((page, index) => <ListItem
                        key={index}
                        selected={page.title === index}
                        onClick={() => this.props.history.push(withIfEdit + section.titleSection + "/" + page.title)}
                        button
                      >
                        <ListItemText inset primary={page.title}/>
                      </ListItem>
                    )
                  }
                </List>
              </Collapse>
              <Divider/>
            </div>
          )
        }
      </List>
    )
  }


  render() {
    const {classes, open} = this.props;
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

        {this.renderNavList()}

      </Drawer>
    );
  }
}

const mapStateToProps = ({user, documentation}) => {
  return {
    user,
    documentation
  };
}

export default withRouter(withStyles(styles, {withTheme: true})(connect(mapStateToProps)(DrawerNav)));
