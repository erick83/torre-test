import React from 'react'
import { AppBar, Avatar, makeStyles, Toolbar, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    marginTop: -2,
    marginRight: theme.spacing(1),
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
          <Avatar alt="logo" variant="square" src="/torre.jpg" className={classes.logo} />
          <Typography variant="h6" component="a" href="/" className={classes.title}>
            Torre Developer Test
          </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

export default HeaderComponent
