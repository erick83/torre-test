import React, { useEffect } from 'react'
import { uniqueId } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { Container, makeStyles, Toolbar } from '@material-ui/core'

import { CardComponent, HeaderComponent, SearchComponent, SideBarComponent } from '../components'
import { getOpportunities } from '../services/api-thunk'
import { IStore } from '../models/store.interfaces'

const drawerWidth = 340;
const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingLeft: drawerWidth,
  },
  cardContainer: {
    maxWidth: 600,
    margin: `0 auto ${theme.spacing(8)}px`
  }
}));

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const results = useSelector((state: IStore) => state.opportunities?.search?.results)

  useEffect(() => {
    dispatch(getOpportunities())
  }, [])

  return (
    <div>
      <HeaderComponent />
      <SideBarComponent />
      <div className={classes.wrapper}>
        <Toolbar />
        <Container>
          <SearchComponent />
          <div className={classes.cardContainer}>
            {results && results.map((result) => {
              return <CardComponent data={result} key={uniqueId('card')}/>
            })}
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Home
