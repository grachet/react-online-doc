import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import SuggestField from './SuggestField'

export default class SuggestFieldModal extends React.Component {

  state = {
    value: null
  }

  onOk = () => {
    const {value} = this.state;
    this.props.onCancel();
    this.props.onOk(value);
  }

  renderForm = () => {
    const {labelValues, values, placeholder} = this.props;

    let data = labelValues.map((labelValue, i) => {
      return {label: labelValue, value: values[i]}
    })

    return (
      <div>
        <SuggestField
          numberSuggestionsMax={this.props.numberSuggestionsMax}
          setValue={(value) => this.setState({value})}
          data={data}
          placeholder={placeholder}
        />
      </div>
    )
  }

  render() {

    return (
      <div>
        <Dialog
          fullWidth
          maxWidth={"sm"}
          open={this.props.open}
          onClose={this.props.onCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent style={{height: 60 + this.props.numberSuggestionsMax * 45}}>
            {this.renderForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.onCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={() => this.onOk()} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
