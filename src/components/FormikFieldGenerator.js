import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/formStyle';
import {withStyles} from '@material-ui/core/styles';
import {Field} from 'formik';
import LinkIcon from '@material-ui/icons/LinkRounded';
import IconButton from '@material-ui/core/IconButton';
import HintIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import WarningIcon from '@material-ui/icons/WarningRounded';
import SearchIcon from '@material-ui/icons/Search';
import {CheckboxWithLabel, Select, TextField} from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Tooltip from '@material-ui/core/Tooltip';
import {DatePicker} from 'material-ui-pickers';
import ArrayField from './ArrayField';
import ObjectField from './ObjectField';
import RichTextEditor from './RichTextEditor';
import Typography from "@material-ui/core/Typography/Typography";
import Grid from "@material-ui/core/Grid/Grid";
import ReactDOM from "react-dom";
import SuggestFieldModal from "./SuggestFieldModal";
import {flattenArray, getConcatArrayAttribute} from "../data/helperFunctions.js";
import TextFieldMaterial from '@material-ui/core/TextField';
import connect from "react-redux/es/connect/connect";


var _ = require('lodash');

export const warning = (warning, noMargin, theme) => {
  const upperHint = _.toUpper(warning)
  return warning ? <div style={{
    marginTop: noMargin ? 0 : theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
    display: "inline-block"
  }}><Tooltip title={upperHint}>
    <IconButton
      aria-label={upperHint}
    >
      <WarningIcon style={{color: "#8c2728"}}/>
    </IconButton>
  </Tooltip></div> : null
}

export const hint = (hint, noMargin, theme) => {
  const upperHint = _.toUpper(hint)
  return hint ? <div style={{
    marginTop: noMargin ? 0 : theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
    display: "inline-block"
  }}><Tooltip title={upperHint}>
    <IconButton
      aria-label={upperHint}
    >
      <HintIcon color={"primary"}/>
    </IconButton>
  </Tooltip></div> : null
}

class FormGenerator extends React.Component {

  state = {
    labelWidth: null,
    openSearchModal: false,
    selectFieldFreeText: false
  }
  renderDateTime = (field) => {
    return (
      <div className={this.props.classes.flex} key={field.title}>
        <Field
          name={_.last(field.path)}
          render={({
                     form: {setFieldValue},
                     field: {value, name},
                     ...rest
                   }) => {
            return (
              <DatePicker
                margin={"dense"}
                name={name}
                required={field.required}
                className={this.props.classes.flexGrow}
                keyboard={!field.disabled}
                clearable
                variant={field.disabled ? "filled" : "outlined"}
                autoOk
                label={field.title}
                format="dd/MM/yyyy"
                placeholder="01/01/2018"
                // handle clearing outside => pass plain array if you are not controlling value outside
                mask={value =>
                  value
                    ? [/[0-3]/, /\d/, "/", /0|1/, /\d/, "/", /1|2/, /\d/, /\d/, /\d/]
                    : []
                }
                disableOpenOnEnter
                onChange={value => {
                  !field.disabled && setFieldValue(name, value);
                }}
                value={value}
                animateYearScrolling={false}
              />
            );
          }}
        />
        {hint(field.hint, false, this.props.theme)}
      </div>


    )
  }
  renderTextfield = (field) => {
    let noLabelNotchWidth = field.title ? field.title.length * 9 : 0;

    return (
      <div className={this.props.classes.flex} key={field.title}>

        {warning(field.warning, false, this.props.theme)}
        <Field
          required={field.required}
          className={this.props.classes.flexGrow}
          margin={"dense"}
          multiline={field.multiline}
          variant={field.disabled ? "filled" : "outlined"}
          label={field.title}
          name={_.last(field.path)}
          InputLabelProps={
            {
              ref: ref => {
                this.InputLabelRef = (ref);
              },
              shrink: !!field.value,
            }}
          InputProps={{
            notched: !!field.value,
            labelWidth: this.state.labelWidth || noLabelNotchWidth,
            readOnly: field.disabled
          }}
          component={TextField}
        />

        {field.link && <div style={{
          marginTop: this.props.theme.spacing.unit * 4,
          marginLeft: this.props.theme.spacing.unit * 2,
          display: "inline-block"
        }}><Tooltip title={"Go To"}>
          <IconButton
            href={field.value}
            target={"_blank"}
          >
            <LinkIcon color={"primary"}/>
          </IconButton>
        </Tooltip>
        </div>}
        {hint(field.hint, false, this.props.theme)}
      </div>
    )
  }
  renderSwitch = (field) => {
    return (
      <div key={field.title}>
        <Field
          disabled={field.disabled}
          Label={{label: field.title}}
          name={_.last(field.path)}
          component={CheckboxWithLabel}
        />
        {hint(field.hint, false, this.props.theme)}
      </div>
    )
  }

  renderDisplayValue = (field) => {

    return (
      <div className={this.props.classes.flex} key={field.title}>
        <TextFieldMaterial
          className={this.props.classes.flexGrow}
          margin={"dense"}
          multiline
          variant={"filled"}
          label={field.title}
          InputLabelProps={{shrink: true}}
          InputProps={{
            readOnly: true
          }}
          value={field.value}
        />

        {hint(field.hint, false, this.props.theme)}
      </div>
    )
  }

  renderSelectfield = (field) => {

    let noLabelNotchWidth = field.title.length * 9
    return (
      <div className={this.props.classes.flex} key={field.title}>
        {warning(field.warning, false, this.props.theme)}

        {this.state.selectFieldFreeText ?

          <Field
            required={field.required}
            className={this.props.classes.flexGrow}
            margin={"dense"}
            variant={field.disabled ? "filled" : "outlined"}
            label={field.title}
            name={_.last(field.path)}
            InputLabelProps={
              {
                ref: ref => {
                  this.InputLabelRef = (ref);
                },
                shrink: !!field.value,
              }}
            InputProps={{
              notched: !!field.value,
              labelWidth: this.state.labelWidth || noLabelNotchWidth,
              readOnly: field.disabled
            }}
            component={TextField}
          />

          :

          <FormControl variant={field.disabled ? "filled" : "outlined"}
                       margin={"dense"}
                       className={this.props.classes.flexGrow}>

            <InputLabel
              shrink={!!field.value}
              required={field.required}
              ref={ref => {
                this.InputLabelRef = (ref);
              }}
              htmlFor={_.last(field.path)}>{field.title}</InputLabel>
            <Field
              input={field.disabled ?
                <FilledInput
                  readOnly={true}
                />
                :
                <OutlinedInput id={_.last(field.path)}
                               labelWidth={this.state.labelWidth || noLabelNotchWidth}
                               notched={!!field.value}
                />}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                }
              }}
              label={field.title}
              name={_.last(field.path)}
              component={Select}
            >

              {field.choice.map(group =>
                !group.category ?
                  <MenuItem key={group} value={group}>{group}</MenuItem> :
                  [<MenuItem key={group} disabled>
                    <em>{group.category}</em>
                  </MenuItem>,
                    group.values.map(value => <MenuItem key={value} value={value}>{value}</MenuItem>
                    )]
              )}
            </Field>
          </FormControl>

        }

        {field.freeText && <div style={{
          marginTop: this.props.theme.spacing.unit * 4,
          marginLeft: this.props.theme.spacing.unit * 2,
          display: "inline-block"
        }}>
          <IconButton
            onClick={() => this.setState(state => ({selectFieldFreeText: !state.selectFieldFreeText}))}
          >
            {this.state.selectFieldFreeText ? <ListIcon color={"primary"}/> : <EditIcon color={"primary"}/>}
          </IconButton>
        </div>}

        {field.suggest && <div style={{
          marginTop: this.props.theme.spacing.unit * 4,
          marginLeft: this.props.theme.spacing.unit * 2,
          display: "inline-block"
        }}>
          <IconButton
            onClick={() => this.setState({openSearchModal: field})}
          >
            <SearchIcon color={"primary"}/>
          </IconButton>
        </div>}
        {hint(field.hint, false, this.props.theme)}
      </div>
    )
  }
  renderGroup = (fields) => {

    const {classes, disabled} = this.props;
    const {title} = fields;
    return (
      <div key={title} className={classes.wrapperArrayField + " " + classes.mymd}>
        {title &&
        <Typography variant="body2" className={(!fields.hint ? classes.mbmd : "")}
                    color="textSecondary"
                    component={'div'}>{title} {hint(fields.hint, true, this.props.theme)}</Typography>}
        {fields.col ? <Grid container spacing={16}>
            {fields.subfields.map((field, i) => <Grid key={i} item xs={12} md={fields.col}>
              {this.switchTypeRender(disabled ? {...field, disabled: true} : field)}
            </Grid>)}
          </Grid> :
          fields.subfields.map(field => this.switchTypeRender(disabled ? {...field, disabled: true} : field))}

      </div>
    )
  }
  switchTypeRender = (field) => {
    const {disabled} = this.props;
    switch (field.typeField) {
      case "displayValue":
        return this.renderDisplayValue(field);
      case "textfield" :
        return this.renderTextfield(field);
      case "select" :
        return this.renderSelectfield(field);
      case "dateTime" :
        return this.renderDateTime(field);
      case "richTextEditor" :
        return <RichTextEditor disabled={disabled} key={field.title + field.path[1]} field={field}/>
      case "switch" :
        return this.renderSwitch(field);
      case "arrayField":
        return <ArrayField disabled={disabled} key={field.title + field.path[1]} field={field}/>
      case "objectField":
        return <ObjectField disabled={disabled} key={field.title + field.path[1]} field={field}/>
      case "group":
        return this.renderGroup(field);
      default:
        console.error("Error on fieldType of : " + field.title)
        return null
    }
  }

  componentDidMount() {
    const {field} = this.props;
    if (field.freeText && field.value && flattenArray(field.choice).indexOf(field.value) === -1) {
      this.setState({selectFieldFreeText: true})
    }
    let ref = ReactDOM.findDOMNode(this.InputLabelRef);
    if (ref) {
      let labelWidth = ref.offsetWidth;
      this.setState({
        labelWidth,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {field} = this.props;
    if (field.freeText && !this.state.selectFieldFreeText && field.value && flattenArray(field.choice).indexOf(field.value) === -1 && prevProps.field.value !== field.value) {
      this.setState({selectFieldFreeText: true})
    }
    if (this.props.field.title !== prevProps.field.title) {
      let ref = ReactDOM.findDOMNode(this.InputLabelRef);
      if (ref) {
        let labelWidth = ref.offsetWidth;
        this.setState({
          labelWidth,
        });
      }
    }
  }

  render() {
    const {field, disabled} = this.props;
    let valuesSearchModal = [];
    if (field.suggest) {
      valuesSearchModal = field.choice[0].values ? getConcatArrayAttribute(field.choice, "values") : field.choice;
    }

    return [
      this.switchTypeRender(disabled ? {...field, disabled: true} : field),
      field.suggest && <SuggestFieldModal
        title={"Search in « " + field.title + " »"}
        open={this.state.openSearchModal}
        onCancel={() => this.setState({openSearchModal: false})}
        onOk={(res) => this.props.setFieldValue && this.props.setFieldValue(_.last(field.path), res)}
        labelValues={flattenArray(valuesSearchModal)}
        values={flattenArray(valuesSearchModal)}
        placeholder={"Search..."}
        numberSuggestionsMax={4}
      />
    ]

  }
}

FormGenerator.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({user}) => {
  return {
    user
  };
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(FormGenerator));
