import React from 'react'
import { Backdrop, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const LoaderComponent: React.FC = () => {
  const classes = useStyles()

  return (
    <Backdrop className={classes.backdrop} open={true}>
      <CircularProgress size={100} color="inherit" />
    </Backdrop>
  )
}

export default LoaderComponent
