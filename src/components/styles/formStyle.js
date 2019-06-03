import createStyles from '../../styleGlobal'
import {drawerWidth} from '../../data/const'
import blue from "@material-ui/core/colors/blue";

export default theme => createStyles({
  centeredContainer: {
    textAlign: "center",
    marginTop: "30vh"
  },
  circularProgressList2: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -44,
  },
  circularProgressList3: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -20,
    marginLeft: -18,
  },
  fab: {
    position: 'fixed',
    bottom: 60,
    right: 60,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  fabOpen: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: 'fixed',
    bottom: 60,
    right: 60,
    marginRight: "20vw",
  },

  containerProjectFormAppBarHidden: {
    justifyContent: 'center',
    minHeight: "100vh",
    maxWidth: 1000,
    flexGrow: 1,
    paddingBottom: theme.spacing.unit * 8,
    paddingTop: 50 + theme.spacing.unit * 4,
    margin: "auto",
    paddingLeft: 20,
    paddingRight: 20,
    transition: theme.transitions.create(['padding'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  containerProjectForm: {
    justifyContent: 'center',
    minHeight: "100vh",
    maxWidth: 1000,
    flexGrow: 1,
    paddingBottom: theme.spacing.unit * 8,
    paddingTop: 120 + theme.spacing.unit * 4,
    margin: "auto",
    paddingLeft: 20,
    paddingRight: 20,
    transition: theme.transitions.create(['padding'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  titleContainerModuleDescription: {
    marginLeft: 10,
    minHeight: 48,
    paddingTop: 8
  },
  paperContainer: {
    margin: "auto",
    padding: theme.spacing.unit * 4,
  },
  buttonHint: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
    display: "inline-block"
  },
  wrapperArrayField: {
    border: "1px solid rgba(0,0,0,0.25)",
    padding: 20,
    borderRadius: 4
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  appBar: {
    top: 0,
    transition: theme.transitions.create(['margin', 'width', "top"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  secondAppBar: {
    top: 69,
    transition: theme.transitions.create(['margin', 'width', "top"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth})`,
    transition: theme.transitions.create(['margin', 'width', "top"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  button: {
    marginBottom: 2 * theme.spacing.unit,
    marginRight: 2 * theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  copied: {
    color: "#000",
    backgroundColor: "#EBEBEB",
    padding: 3,
    paddingRight: 6,
    paddingLeft: 6,
    borderRadius: 15,
    marginRight: 15,
  },
  rowTableColored: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  browserContainer: {
    backgroundColor: "#FAFAFA",
    height: "100vh",
    width: "100vw",
  },
}, theme);
