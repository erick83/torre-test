import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(2),
  },
  section: {
    padding: 0,
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  sectionText: {
    fontSize: 14,
  },
  nestedList: {
    padding: 0,
  },
  nestedItem: {
    padding: 0,
    paddingLeft: theme.spacing(4),
  },
  nestedText: {
    fontSize: 14,
  },
  autocomplete: {
    width: 300,
    paddingLeft: theme.spacing(4),
    marginTop: theme.spacing(1),
  }
}));

export default useStyles
