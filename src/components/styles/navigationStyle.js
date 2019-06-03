import createStyles from '../../styleGlobal'
import {drawerWidth} from "../../data/const";

export default theme => createStyles({
  homeIcon: {
    color: "#fff",
  },
  titleNavigation: {
    textTransform: "none",
    color: "#fff",
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}) `,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  circularProgress: {
    position: 'fixed',
    bottom: 54,
    right: 54,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  zIndex3000: {
    zIndex: 3000
  },
  circularProgressOpen: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: 'fixed',
    bottom: 54,
    right: 54,
    marginRight: "20vw",
  },
  speedDial: {
    position: 'fixed',
    bottom: 60,
    right: 60,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ZIndex: 10000
  },
  speedDialOpen: {
    ZIndex: 10000,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    position: 'fixed',
    bottom: 60,
    right: 60,
    marginRight: "20vw",
  },
  rootStepper: {
    width: '90%',
  },
  step: {
    cursor: "pointer"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
    height: 68,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerHeaderAppBarHidden: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    justifyContent: 'flex-start',
    height: 48,
    transition: theme.transitions.create('height', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }
}, theme);
