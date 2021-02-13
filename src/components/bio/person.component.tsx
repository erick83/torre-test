import React from 'react'
import { Card, CardContent, CardMedia, Chip, Divider, makeStyles, Paper, Typography } from '@material-ui/core'

export interface IPersonComponent {
  person: any,
  interests: any[],
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 380,
    minWidth: 350
  },
  strengthsPaper: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const PersonComponent: React.FC<IPersonComponent> = ({ person, interests }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardMedia
        component="img"
        alt={person.name}
        height="220"
        image={person.picture}
        title={person.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">{person.name}</Typography>
        <Typography gutterBottom variant="body1" component="h3">{person.professionalHeadline}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">{person.summaryOfBio}</Typography>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="body1" component="h3">Skills s/he wants to develop:</Typography>
        <Paper component="ul" className={classes.strengthsPaper} elevation={0}>
          {interests.map((str, key) => {
            return (<li key={key}>
              <Chip label={str.name} className={classes.chip} />
            </li>)
          })}
        </Paper>
      </CardContent>
    </Card>
  )
}

export default PersonComponent
