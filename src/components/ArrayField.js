import React from 'react';
import {FieldArray} from 'formik';
import Button from '@material-ui/core/Button';
import IconButton from "@material-ui/core/IconButton/IconButton";
import AddIcon from '@material-ui/icons/AddCircle';
import {withStyles} from '@material-ui/core/styles';
import RemoveIcon from '@material-ui/icons/Delete';
import styles from './styles/formStyle';
import Typography from "@material-ui/core/Typography/Typography";
import {hint} from "./FormikFieldGenerator";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import FieldGen from "./FormikFieldGenerator";

class ArrayField extends React.Component {

  render() {
    const {field, classes} = this.props;
    const {title, path, value, emptyAddText, choice, noBorder} = field;

    return <FieldArray
      key={this.props.key}
      validateOnChange={false}
      name={path[path.length - 1]}
      render={arrayHelpers => (
        <div className={!noBorder && classes.wrapperArrayField + " " + classes.mymd}>
          {title &&
          <Typography variant="body2" className={(!field.hint ? classes.mbmd : "")}
                      color="textSecondary" component={'div'}>{title} {hint(field.hint, true, this.props.theme)}</Typography>}
          {value && value.length > 0 ? (
            <div>
              {value.map((arrayValue, index) => (
                  <div className={classes.flex} key={index}>
                    <span className={this.props.classes.flexGrow}><FieldGen field={{
                      ...field,
                      disabled: field.disabled || this.props.disabled,
                      path: [path[path.length - 1] + "[" + index + "]"],
                      typeField: choice ? 'select' : "textfield",
                    }}/></span>
                    <div className={classes.buttonHint}>
                      <Tooltip title={"Add"}>
                        <IconButton
                          disabled={field.disabled || this.props.disabled}
                          onClick={() => arrayHelpers.insert(index + 1, '')}
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
                  </div>
                )
              )}

            </div>
          ) : (
            <Button variant="outlined" className={classes.mymd} onClick={() => arrayHelpers.push('')}>
              {emptyAddText}
            </Button>
          )}
        </div>
      )}
    />
  }
}


export default withStyles(styles, {withTheme: true})(ArrayField);
