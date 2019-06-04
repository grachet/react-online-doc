import React from 'react';
import PropTypes from 'prop-types';
import Autosuggest from 'react-autosuggest';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import {withStyles} from '@material-ui/core/styles';
import InputBase from "@material-ui/core/InputBase";

function renderInputComponent(inputProps) {
  const {
    classes, inputRef = () => {
    }, ref, ...other
  } = inputProps;


    return <InputBase
      placeholder="Search…"
      classes={{
        root: classes.inputRoot,
        input: classes.inputInput,
      }}
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />


  // return (
  //   <TextField
  //     autoFocus
  //     fullWidth
  //     InputProps={{
  //       inputRef: node => {
  //         ref(node);
  //         inputRef(node);
  //       },
  //       classes: {
  //         input: classes.input,
  //       },
  //     }}
  //     {...other}
  //   />
  // );
}

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function match(text, query) {
  return (
    query
      .trim()
      .split(" ")
      .reduce((result, word) => {
        if (!word.length) return result;
        const wordLen = word.length;
        const regex = new RegExp(escapeRegexCharacters(word), 'i');
        console.log(text);
        const {index = -1} = text.match(regex);
        if (index > -1) {
          result.push([index, index + wordLen]);
          // Replace what we just found with spaces so we don't find it again.
          text =
            text.slice(0, index) +
            new Array(wordLen + 1).join(' ') +
            text.slice(index + wordLen);
        }
        return result;
      }, [])
      .sort((match1, match2) => {
        return match1[0] - match2[0];
      })
  );
};

function renderSuggestion(suggestion, {query, isHighlighted}) {
  const matches = match(suggestion.label, query);
  const parts = parse(suggestion.label, matches);
  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) => {
          return part.highlight ? (
            <span key={String(index)} style={{fontWeight: 500, color: "#124191"}}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{fontWeight: 300}}>
              {part.text}
            </strong>
          );
        })}
      </div>
    </MenuItem>
  );
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 200,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class SuggestField extends React.Component {

  state = {
    single: '',
    suggestions: [],
  };

  getSuggestionValue = (suggestion) => {
    this.props.setValue(suggestion.value);
    return    this.props.hideValue ? "" : suggestion.label;
  }

  resetField = () => {
    this.setState({single: ""})
  }


  getSuggestions = (value) => {
    const escapedValue = escapeRegexCharacters(value.trim().toLowerCase());

    if (escapedValue === '') {
      return [];
    }

    const regex = new RegExp(escapedValue, 'i');
    return this.props.data.filter(suggestion => regex.test(suggestion.label)).slice(0, this.props.numberSuggestionsMax);
  }

  handleSuggestionsFetchRequested = ({value}) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, {newValue}) => {
    this.setState({
      [name]: newValue,
    });
  };

  render() {
    const {classes} = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue: this.getSuggestionValue,
      renderSuggestion,
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: this.props.placeholder,
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

SuggestField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles,{withTheme: true})(SuggestField);
