import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from "../containers/Navigation";
import Drawer from "../components/Drawer";
import {fetchDocumentation, removeDocumentation, updateDocumentation} from "../redux/actions/documentation";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import Parser from 'html-react-parser';
import styles from './styles/homeStyle'
import {ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography} from "@material-ui/core";
import ExpandMore from '@material-ui/icons/ExpandMore';
import {getDocIndex} from "../data/helperFunctions";

class Home extends React.Component {
  state = {
    open: true,
    expandedDoc: {}
  };

  toggleDrawer = () => {
    this.setState(state => ({open: !state.open}));
  };


  renderDoc = () => {
    const {sid, id} = this.props.match.params;
    const {classes, documentation} = this.props;

    if (!documentation) return null
    const {docs} = getDocIndex(this.props);
    return (
      docs && docs.map((panel, index) => <ExpansionPanel key={index}
                                                                onChange={() => panel => (event, expanded) => {
                                                                  this.setState({
                                                                    expandedDoc: expanded ? panel : false,
                                                                  });
                                                                }}
                                                                expanded={this.state.expandedDoc[panel.title + index]}>
          <ExpansionPanelSummary expandIcon={<ExpandMore/>}>
            <Typography className={classes.heading}>{panel.title}</Typography>
            <Typography className={classes.secondaryHeading}>{panel.secondTitle}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography component={'div'} paragraph>{panel.paragraph && Parser(panel.paragraph)}</Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )
    )
  }

  render() {
    const {classes} = this.props;
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

          {this.renderDoc()}

        </main>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = ({user, documentation, users}) => {
  return {
    documentation, user, users
  };
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchDocumentation, updateDocumentation, removeDocumentation
}, dispatch);

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Home));

