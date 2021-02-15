import React from 'react'
import { CardContent, CardMedia, Chip, makeStyles, Paper, Typography } from '@material-ui/core'

import { snakeTypesStringParse } from '../../services/utils';

export interface TPostTitleComponent {
  objective?: string,
  attachments?: any[]
  commitment?: any
  serpTags?: any
  opportunity?: string
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'block',
    position: 'relative',
  },
  media: {
    top: 0,
    minWidth: '100%',
    height: 269,
    position: 'absolute',
  },
  contentWrapper: {
    width: '100%',
    paddingTop: 250,
    display: 'flex'
  },
  title: {
    display: 'block',
    margin: 'auto',
    textAlign: 'center',
    background: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    width: 480,
    zIndex: theme.zIndex.drawer - 1,
    paddingBottom: '0 !important',
  },
  titleColor: {
    color: theme.palette.secondary.dark,
  },
  strengthsPaper: {
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chipContainer: {
    padding: 0,
    backgroundColor: 'transparent'
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  sectionTitle: {
    marginTop: theme.spacing(3),
  }
}));

const PostTitleComponent: React.FC<TPostTitleComponent> = (props) => {
  const { objective, attachments, commitment, opportunity } = props
  const classes = useStyles()
  const img = attachments?.length ? attachments[0].address : ''

  return (
    <div className={classes.container}>
      <CardMedia
        image={img}
        title="cover"
        className={classes.media}
      />
      <div className={classes.contentWrapper}>
        <CardContent className={classes.title}>
          <Typography gutterBottom variant="h5" component="h2" className={classes.titleColor}>{objective}</Typography>
          <Typography gutterBottom variant="body1" component="h3">{`${snakeTypesStringParse(commitment.code)} - ${snakeTypesStringParse(opportunity)}`}</Typography>
        </CardContent>
      </div>
    </div>
  )
}

export default PostTitleComponent
