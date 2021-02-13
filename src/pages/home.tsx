import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Container, makeStyles, Toolbar } from '@material-ui/core'

import { HeaderComponent, SearchComponent, SideBarComponent } from '../components'
import { getAggregates } from '../redux/api-thunk'

const drawerWidth = 340;
const useStyles = makeStyles(() => ({
  wrapper: {
    paddingLeft: drawerWidth,
  },
}));

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    dispatch(getAggregates())
  })

  return (
    <div>
      <HeaderComponent />
      <SideBarComponent />
      <div className={classes.wrapper}>
        <Toolbar />
        <Container>
          <SearchComponent />
        </Container>
      </div>
    </div>
  )
}

export default Home
