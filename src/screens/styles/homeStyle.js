import createStyles from '../../styleGlobal'
import {drawerWidth} from "../../data/const";

const style = (theme) => ({
  root: {
    display: 'flex',
  },
  fab: {
    position: 'fixed',
    bottom: 20,
    right: 20,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});

export default createStyles({style})