import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, makeStyles, Toolbar } from '@material-ui/core'

import { HeaderComponent, PersonComponent, ResumeComponent, SkillsComponent } from '../components'
import { getUsername } from '../redux/api-thunk'
import { useParams } from 'react-router-dom'
import { IStore } from '../models/store.interfaces'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  wrapper: {
    display: 'flex',
    '& > *': {
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
    }
  }
}));

const Bio: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { id }: { id?: string } = useParams()
  const bio = useSelector((store: IStore) => store.bios)

  console.log(bio)

  useEffect(() => {
    dispatch(getUsername(id))
  }, [])

  return (
    <div>
      <HeaderComponent />
      <Toolbar />
      <Container maxWidth={false} className={classes.container}>
        {bio.person ? (
          <div className={classes.wrapper}>
            <PersonComponent {...bio} />
            <SkillsComponent {...bio} />
            <ResumeComponent {...bio} />
          </div>
        ) : ''}
      </Container>
    </div>
  )
}

export default Bio
