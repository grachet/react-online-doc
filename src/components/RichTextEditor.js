import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles/formStyle';
import ReactQuill from 'react-quill';
import './styles/richEditor.css';
import {Field} from "formik";
import Typography from "@material-ui/core/Typography/Typography";
import {hint} from "./FormikFieldGenerator"
import classNames from 'classnames';

class RichTextEditor extends React.Component {

  modules = {
    toolbar: [
      [{'header': [1, 2, false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link'],
      ['clean']
    ],
  }

  formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  render() {

    const {field, classes, key} = this.props
    const {title, path} = field

    if (!path) return null

    return (
      <div key={key} style={{backgroundColor: "white"}} className={classNames(classes.flexGrow, classes.mymd)}>
        {title &&
        <Typography variant="body2"
                    color="textSecondary">{field.title}
        </Typography>}
        <Field
          name={path[path.length - 1]}
          render={({
                     form: {setFieldValue},
                     field: {value, name},
                   }) => {
            return (
              <div className={classes.flex}>
                <ReactQuill
                  value={value || ""}
                  className={classes.flexGrow + " " + classes.mbxl}
                  theme="snow"
                  modules={this.modules}
                  formats={this.formats}
                  onChange={value => setFieldValue(name, value)}
                />
                {hint(field.hint, true, this.props.theme)}
              </div>

            );
          }}
        />
      </div>
    )

  }
}


export default withStyles(styles, {withTheme: true})(RichTextEditor);
