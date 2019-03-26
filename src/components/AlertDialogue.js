import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {

  render() {
    return (
      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.props.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color="primary">
            {this.props.cancelButtonTitle || "Cancel"}
          </Button>
          <Button onClick={() => {
            this.props.closeOnOK && this.props.onClose();
            this.props.onOk()
          }} color="primary" autoFocus>
            {this.props.okButtonTitle || "Ok"}
          </Button>

        </DialogActions>
      </Dialog>
    );
  }
}

export default AlertDialog;
