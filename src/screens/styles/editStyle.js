import createStyles from '../../styleGlobal'
import {drawerWidth} from "../../data/const";

export default theme => createStyles({
  tutorialWrapper: {
    overflow: "hidden",
    backgroundColor: "#000",
    height: "100vh",
    width: "100vw"
  },
  textTuto: {
    left: "calc(50vw - 250px)",
    width: 500,
    borderRadius: 10,
  },
  closedTextTuto: {
    left: "calc(50vw - 20px)",
    borderRadius: 10,
  },
  textWrapperTuto: {
    position: 'absolute',
    bottom: 90,
    cursor: "pointer",
    backgroundColor: "rgba(0,0,0,0.85)",
    color: "#fff",
    padding: 10,
  },
  imgTuto: {
    width: "100vw",
    height: "100vh",
    objectFit: "scale-down"
  },
  tutorialNav: {
    position: "absolute",
    bottom: 60,
    textAlign: "center",
    width: "100vw"
  },
  loaderTuto: {
    pointerEvents: "none",
    position: 'absolute',
    top: -6,
    left: "calc(50vw - 34px)"
  },
  overlayButton: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 27,
    paddingBottom: 29,
    borderRadius: 90,
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
},theme);
