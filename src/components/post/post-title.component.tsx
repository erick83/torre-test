import React from 'react'
import { CardContent, CardMedia, Chip, makeStyles, Paper, Typography } from '@material-ui/core'

import { snakeTypesStringParse } from '../../services/utils';

export interface TPostTitleComponent {
  objective?: string,
  attachments?: any[]
  commitment?: any
  serpTags?: any
  opportunity?: string
  strengths?: any[]
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex'
  },
  media: {
    width: 400,
    height: 300
  },
  title: {
    width: '70%',
    paddingLeft: theme.spacing(4)
  },
  strengthsPaper: {
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const PostTitleComponent: React.FC<TPostTitleComponent> = (props) => {
  const { objective, attachments, commitment, opportunity, strengths } = props
  const classes = useStyles()
  const img = attachments?.length ? attachments[0].address : ''
  const xp: any[] = parseStrengths(strengths)

  return (
    <div className={classes.container}>
      <CardMedia
        image={img}
        title="cover"
        className={classes.media}
      />
      <CardContent className={classes.title}>
        <Typography gutterBottom variant="h5" component="h2">{objective}</Typography>
        <Typography gutterBottom variant="h6" component="h3">{`${snakeTypesStringParse(commitment.code)} - ${snakeTypesStringParse(opportunity)}`}</Typography>
        <Typography gutterBottom variant="body1" component="h6">Skills and experience needed</Typography>
        <Paper component="ul" elevation={0}>
          {xp.map((str, key: number) => {
            return (
              <li className={classes.strengthsPaper} key={key}>
                <Typography gutterBottom variant="body2" component="p">{str.text}</Typography>
                {str.names.map((name: string, key: number) => (<Chip key={key} label={name} className={classes.chip} />))}
              </li>

            )
          })}
        </Paper>
      </CardContent>
    </div>
  )
}

function parseStrengths(strengths: any[] = []) {
  const group = strengths.reduce((prev, curr) => {
    const idx = prev.map((e: any) => e.group).indexOf(curr.experience)

    if (idx >= 0) {
      const newArr = [...prev]
      newArr[idx].names.push(curr.name)
      return newArr
    }

    return [...prev, {
      group: curr.experience,
      text: curr.experience.replace('-plus', '+').replace(/-/g, ' ') + ' of experience',
      names: [curr.name]
    }]

  }, [])

  return group
}

export default PostTitleComponent
