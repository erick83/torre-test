import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Container, makeStyles, Toolbar } from '@material-ui/core'

import { HeaderComponent } from '../components'
import { getOpportunitie } from '../redux/api-thunk'
import { useParams } from 'react-router-dom'
import { IStore } from '../models/store.interfaces'
import PostTitleComponent from '../components/post/post-title.component'

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
  },
  card: {
    minHeight: '84vh',
  }
}));

const Opportunities: React.FC = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const { id }: { id?: string } = useParams()
  const post = useSelector((store: IStore) => store.opportunities?.selected)

  useEffect(() => {
    dispatch(getOpportunitie(id))
  }, [])

  console.log(post)
  return (
    <div>
      <HeaderComponent />
      <Toolbar />
      {post.attachments ? (
        <Container maxWidth='lg' className={classes.container}>
          <Card className={classes.card}>
            <PostTitleComponent {...post} />
          </Card>
        </Container>
      ) : <div>Loading</div>}
    </div>
  )
}

export default Opportunities
