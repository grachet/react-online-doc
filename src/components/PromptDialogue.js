import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import * as Yup from 'yup';
import {Field, Form, Formik} from 'formik';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {Select as SelectMUI, TextField as TextFieldMUI} from 'formik-material-ui';
import styles from "../styles/modalStyle"
import {withStyles} from "@material-ui/core";


class FormDialog extends React.Component {

  onOk = () => {
    this.refForm.submitForm()
  }

  getValidationSchema = (fields) =>
    fields.reduce((obj, item) => {
      let yup = item.yup;
      if (yup) {
        obj[item.name] = yup;
      }
      return obj
    }, {})


  getInitialValues = (fields) =>
    fields.reduce((obj, item) => {
      let ch = item.choice;
      if (ch) {
        obj[item.name] = item.defaultLast ? ch[ch.length - 1] : ch[0];
      }
      return obj
    }, {})


  render() {

    const {textfield, selectfield, defaultValue} = this.props;


    let fields = (textfield && selectfield && textfield.concat(selectfield)) || selectfield || textfield
    const validationSchema = fields && this.getValidationSchema(fields);
    const initialValues = fields && this.getInitialValues(fields);
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={this.props.onCancel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {this.props.text}
            </DialogContentText>
            {this.props.link &&
            <Button href={this.props.link.url} target="_blank" color="primary">{this.props.link.name}</Button>
            }
            <Formik
              validateOnBlur={true}
              validateOnChange={false}
              enableReinitialize
              initialValues={{...initialValues, ...defaultValue}}
              ref={ref => this.refForm = ref}
              onSubmit={(values, {setSubmitting}) => {
                !this.props.disableCancelOnOK && this.props.onCancel();
                this.props.onOk(values);
                setSubmitting(false);
              }}
              validationSchema={Yup.object().shape(
                validationSchema
              )}
            >
              {({values}) => (
                <Form>
                  {
                    this.props.textfield && this.props.textfield.map(field => <Field
                        key={field.name}
                        required={field.required}
                        margin="normal"
                        fullWidth
                        name={field.name}
                        label={field.title}
                        component={TextFieldMUI}
                      />
                    )
                  }
                  {this.props.selectfield && this.props.selectfield.map(field => <FormControl
                      margin={"normal"}
                      key={field.name}
                      className={this.props.classes.promptFormControl}
                    >
                      <InputLabel
                        shrink={values[field.name] || values[field.name] === 0}
                        required={field.required}
                        htmlFor={field.name}>{field.title || field.name}
                      </InputLabel>
                      <Field
                        inputProps={{
                          name: field.name,
                          id: field.name,
                        }}
                        name={field.name}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 300,
                            },
                          }
                        }}
                        component={SelectMUI}
                      >
                        {field.choice.map((value, index) =>
                          <MenuItem
                            key={value}
                            value={value}>
                            {field.titleChoice ? field.titleChoice[index] : value}
                          </MenuItem>
                        )
                        }
                      </Field>
                    </FormControl>
                  )
                  }
                </Form>
              )}
            </Formik>


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


export default withStyles(styles)(FormDialog);