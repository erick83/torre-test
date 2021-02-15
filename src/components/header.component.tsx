import React from 'react'
import { AppBar, makeStyles, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: theme.palette.primary.contrastText
  },
}));

const HeaderComponent: React.FC<any> = (props: any) => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" component="a" href="/" className={classes.title}>
            Torre Developer Test
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default HeaderComponent
