import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from "./styles/navigationStyle"
import CloseIcon from "@material-ui/icons/ArrowBack";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Fab from '@material-ui/core/Fab';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';

class SpeedDialTooltipOpen extends React.Component {
  state = {
    open: false,
    hidden: false,
  };

  handleVisibility = () => {
    this.setState(state => ({
      open: false,
      hidden: !state.hidden,
    }));
  };

  handleClick = () => {
    this.setState(state => ({
      open: false,
    }));
  };

  handleOpen = () => {
    if (!this.state.hidden) {
      this.setState({
        open: true,
      });
    }
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };


  render() {
    const {classes, pendingRequestValidate, openDrawer, mainAction, actions, backButton} = this.props;
    const {hidden, open} = this.state;

    if (backButton) {
      return <Fab onClick={() => window.history.back()} color="default" aria-label="close"
                  className={(openDrawer ? classes.speedDialOpen : classes.speedDial) + " hideOnPrint"}
      >
        <CloseIcon/>
      </Fab>
    }

    if (!actions) {
      return <Tooltip placement="left" title={mainAction.name}>
        <Fab
          onClick={() => mainAction.action()} color="secondary" aria-label="Save"
          className={(openDrawer ? classes.speedDialOpen : classes.speedDial) + " hideOnPrint"}
        >
          {mainAction.icon}
        </Fab>
      </Tooltip>
    }

    return (
      [<SpeedDial
        key={1}
        ariaLabel="speedDial"
        ButtonProps={{disabled: pendingRequestValidate === "request" || this.props.loading}}
        className={(openDrawer ? classes.speedDialOpen : classes.speedDial) + " hideOnPrint"}
        hidden={hidden}
        icon={mainAction ? this.props.mainAction.icon : <SpeedDialIcon/>}
        onBlur={this.handleClose}
        onClick={() => mainAction ? this.props.mainAction.action() : this.setState(state => ({
          open: !state.open,
        }))}
        onClose={this.handleClose}
        onFocus={this.handleOpen}
        onMouseEnter={this.handleOpen}
        onMouseLeave={this.handleClose}
        open={open}
      >
        {this.props.actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            ButtonProps={{color: 'secondary'}}
            onClick={() => {
              this.handleClick();
              action.action()
            }}
          />
        ))}
      </SpeedDial>, (pendingRequestValidate === "request" || this.props.loading) &&
      <CircularProgress
        key={2}
        color={"secondary"}
        size={68}
        className={(openDrawer ? classes.circularProgressOpen : classes.circularProgress)}/>
      ]
    );
  }
}

SpeedDialTooltipOpen.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(SpeedDialTooltipOpen);
