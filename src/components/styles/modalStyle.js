import createStyles from '../../styleGlobal'
import blue from "@material-ui/core/colors/blue";

export default theme => createStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  zipSvg: {
    width: "30%"
  },
  promptFormControl: {
    minWidth: "100%",
    marginTop: 15
  }
},theme);