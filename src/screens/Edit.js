import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navigation from "../containers/Navigation";
import Drawer from "../components/Drawer";
import {fetchDocumentation, removeDocumentation, updateDocumentation} from "../redux/actions/documentation";
import connect from "react-redux/es/connect/connect";
import {bindActionCreators} from "redux";
import {Typography, withStyles} from "@material-ui/core";
import {getDocIndex} from "../data/helperFunctions";
import {Form, Formik} from "formik";
import styles from './styles/editStyle'
import UndoIcon from '@material-ui/icons/Undo';
import SaveIcon from '@material-ui/icons/Check';
import ObjectField from "../components/ObjectField";
import ReturnIcon from '@material-ui/icons/Close';
import Paper from "@material-ui/core/Paper/Paper";
import TextIcon from '@material-ui/icons/Subject';
import ListIcon from '@material-ui/icons/List';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton/IconButton";
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import PromptDialogue from "../components/PromptDialogue";
import Button from "@material-ui/core/Button/Button";
import ActionButton from "../components/ActionButton"
import Chip from "@material-ui/core/Chip";
import {withRouter} from "react-router-dom";

class Edit extends React.Component {
  state = {
    open: true,
    editDrawer: false,
    sectionIndexRename: null
  };

  toggleDrawer = () => {
    this.setState(state => ({open: !state.open}));
  };


  renderEdit = () => {
    const {classes, documentation} = this.props;
    let {editDrawer, openPrompt} = this.state;

    if (!documentation) return null
    const {docs, doc} = getDocIndex(this.props);


    let initialValues, submitAction, subfieldsDescription, emptyAddText;

    if (editDrawer) {
      initialValues = {};
      emptyAddText = "Add page";
      submitAction = (values) => this.submitNav(values)
      subfieldsDescription = [{
        title: "Title", name: "title", multiline: true, typeField: 'textfield',
      }, {
        title: "Ref (can be null)",
        name: "id"
        , typeField: 'textfield',
      }]
    } else {
      initialValues = {doc};
      submitAction = (values) => console.log(values);
      emptyAddText = "Add paragraph";
      subfieldsDescription = [{
        title: "Title", name: "title", multiline: true, typeField: 'textfield',
      }, {
        title: "Subtitle",
        name: "secondTitle",
        multiline: true, typeField: 'textfield',
      }, {
        name: "paragraph",
        fullWidth: true,
        typeField: 'richTextEditor',
      }
      ]
    }

    let promptTextFields, promptSelectFields, promptTitle
    //
    // let addSectionChoices = nav.map(section => "after «" + section.titleSection + "»");
    // let sectionsName = nav.map(section => section.titleSection);
    // let sectionIndex = nav.map((section, index) => index);
    //
    // if (openPrompt === "rename") {
    //   promptTitle = "Rename category"
    //   promptTextFields = [{
    //     title: "Name", required: true, name: "titleSection"
    //   }]
    // } else if (openPrompt === "add") {
    //   promptTitle = "Add category"
    //   promptSelectFields = [
    //     {
    //       title: "Place",
    //       name: "place",
    //       yup: Yup.string().required(),
    //       required: true,
    //       choice: [-1, nav.length - 1, ...sectionIndex],
    //       titleChoice: ["first", "last", ...addSectionChoices]
    //     }]
    //   promptTextFields = [{
    //     title: "Name", required: true, name: "titleSection"
    //   }]
    // } else if (openPrompt === "remove") {
    //   promptTitle = "Remove category"
    //   promptSelectFields = [
    //     {
    //       title: "Name",
    //       name: "sectionIndex",
    //       yup: Yup.string().required(),
    //       required: true,
    //       choice: [...sectionIndex],
    //       titleChoice: [...sectionsName]
    //     }]
    // }


    return (
      <Formik
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize
        initialValues={initialValues}
        onSubmit={(values, {setSubmitting}) => {
          submitAction(values);
          setSubmitting(false);
        }}
      >
        {({values, resetForm, submitForm}) => (
          <Form>
            <div className={classNames(classes.mtxxxxl,classes.mbs)}>
              <Tooltip
                title={"In this mode you can edit" + (editDrawer ? " the left navigation drawer" : " all the documentation")}
                placement="right">
                <Chip
                  label={editDrawer ? "Edit Navigation" : "Edit Mode"}
                  variant={"default"}
                  color={"default"}
                  className={classNames(classes.mrmd)}
                />
              </Tooltip>

              {editDrawer &&
              <span>
                <Button onClick={() => this.setState({openPrompt: "add"})}
                        className={classNames(classes.mrmd)} variant={"contained"} color="primary">
              Add Category
                </Button>
                <Button onClick={() => this.setState({openPrompt: "remove"})} color="primary">
              Remove Category
                </Button>
              </span>}
            </div>

            {!editDrawer && doc && <ObjectField paper field={{
              noBorder: true,
              subfields: subfieldsDescription,
              path: ["doc"],
              emptyAddText,
              value: values.doc
            }}/>}


            {editDrawer && documentation.map((cat, catIndex) => <Paper key={catIndex}
                                                                       className={classes.pl + " " + classes.mbmd}
                                                                       elevation={1}>
              <Typography variant="h5" className={classes.mbmd}
                          color="textSecondary">{cat.titleSection}
                <Tooltip title={"Edit section name"}>
                  <IconButton
                    className={classes.mlmd}
                    onClick={() => this.setState({openPrompt: "rename", sectionIndexRename: catIndex})}
                  >
                    <EditIcon color={"primary"}/>
                  </IconButton>
                </Tooltip>
              </Typography>
              <ObjectField field={{
                noBorder: true,
                subfields: [{
                  title: "Title", name: "titlePage", multiline: true, typeField: "textfield"
                }, {
                  title: "Ref (can be null)",
                  name: "id", typeField: "textfield"
                }],
                path: ["nav" + catIndex],
                emptyAddText: "Add page to " + cat.titleSection,
                value: values["nav" + catIndex]
              }}/>
            </Paper>)}
            <ActionButton
              actions={[
                {icon: <SaveIcon/>, name: 'Save fields', action: () => submitForm()},
                {
                  icon: <ReturnIcon/>,
                  name: 'Stop editing',
                  action: () => this.props.history.push("/")
                },
                {
                  icon: <UndoIcon/>,
                  name: 'Undo',
                  action: () => resetForm()
                },
                {
                  icon: editDrawer ? <TextIcon/> : <ListIcon/>,
                  name: editDrawer ? "Edit documentation" : 'Edit drawer navigation',
                  action: () => this.setState(state => ({editDrawer: !state.editDrawer}))
                }
              ]
              }
            />
            <PromptDialogue
              disableCancelOnOK
              open={!!openPrompt}
              onCancel={() => this.setState({openPrompt: false})}
              onOk={(values) => {
                openPrompt === "rename" ? this.renameSection(values) : openPrompt === "add" ? this.addSection(values) : this.removeSection(values);
                this.setState({openPrompt: false})
              }}
              title={promptTitle}
              textfield={promptTextFields}
              selectfield={promptSelectFields}

            />
          </Form>
        )}
      </Formik>
    );
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
          {this.renderEdit()}

        </main>
      </div>
    );
  }
}

Edit.propTypes = {
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

export default withRouter(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Edit)));

