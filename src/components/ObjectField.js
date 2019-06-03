import React from 'react';
import {FieldArray} from 'formik';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/AddCircle';
import {withStyles} from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Delete';
import styles from './styles/formStyle'
import Typography from "@material-ui/core/Typography/Typography";
import {hint} from "./FormikFieldGenerator"
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import Grid from "@material-ui/core/Grid/Grid";
import Divider from '@material-ui/core/Divider';
import Paper from "@material-ui/core/Paper/Paper";
import FieldGen from "./FormikFieldGenerator";

class ObjectField extends React.Component {

  renderFieldsContainer = (arrayHelpers, index) => {

    const {field, paper, classes} = this.props
    const {path, value, subfields, dense} = field
    let newObject = subfields.reduce((obj, item) => {
      obj[item.name] = ""
      return obj
    }, {})

    return (
      [<div key="0a" className={classes.flex}>
        <Grid container spacing={16}>
          {subfields.map((subfield, index2) =>
            <Grid item key={index2} className={classes.flex}
                  sm={12} md={subfield.fullWidth ? 12 : 6}
                  lg={subfield.fullWidth ? 12 : dense ? 4 : 6}>

              <span className={this.props.classes.flexGrow}><FieldGen field={{
                ...subfield,
                disabled: field.disabled || this.props.disabled,
                path: [path[path.length - 1] + "[" + index + "]." + subfield.name],
                value: value[index][subfield.name]
              }}/></span>
            </Grid>)}
        </Grid>
        <div className={classes.buttonHint}>
          <Tooltip title={"Add"}>
            <IconButton
              disabled={field.disabled || this.props.disabled}
              onClick={() => arrayHelpers.insert(index + 1, newObject)}
              color="primary"
            >
              <AddIcon/>
            </IconButton>
          </Tooltip>
        </div>
        <div className={classes.buttonHint}>
          <Tooltip title={"Remove"}>
            <IconButton
              disabled={field.disabled || this.props.disabled}
              onClick={() => arrayHelpers.remove(index)}
              color="primary"
            >
              <RemoveIcon/>
            </IconButton>
          </Tooltip>
        </div>
      </div>,
        !paper && subfields.length >= 3 && index < value.length - 1 && <Divider key="1a" className={classes.myl}/>]
    )
  }

  render() {

    const {field, paper, classes} = this.props
    const {title, path, value, emptyAddText, noBorder} = field

    return <FieldArray
      key={this.props.key}
      validateOnChange={false}
      name={path[path.length - 1]}
      render={arrayHelpers => (

        <div className={(!noBorder && classes.wrapperArrayField) + " " + classes.mymd}>
          {title &&
          <Typography variant="body2" className={!field.hint && classes.mbmd}
                      color="textSecondary"
                      component={'div'}>{title} {hint(field.hint, true, this.props.theme)}</Typography>}
          {value && value.length > 0 ? (
            <div>
              {value.map((arrayValue, index) => (
                  paper ? <Paper key={index} className={classes.pl + " " + classes.mbl} elevation={1}>
                      {this.renderFieldsContainer(arrayHelpers, index)}
                      <div style={{color:"#fff"}}>.</div>
                    </Paper>
                    : <div key={index}>{this.renderFieldsContainer(arrayHelpers, index)}</div>
                )
              )}
            </div>
          ) : (
            <Button
              disabled={field.disabled || this.props.disabled} variant="outlined" className={classes.mymd}
              onClick={() => arrayHelpers.push({})}>
              {emptyAddText}
            </Button>
          )}
        </div>

      )}
    />
  }
}

export default withStyles(styles, {withTheme: true})(ObjectField);
