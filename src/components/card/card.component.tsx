import React from 'react'
import { Avatar, Button, makeStyles, Paper, Typography } from '@material-ui/core'
import { compensationrangeToString } from '../../services/parseFilters';
import { keys } from 'lodash';

interface ICardComponent {
  data: IResult
}

interface IResult {
  id: string
  objective: string
  type: string
  organizations: any[]
  locations: string[]
  remote: boolean
  compensation: any
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
    overflow: 'hidden'
  },
  logo: {
    width: 44,
  },
  body: {
    width: '90%',
  },
  title: {
    color: theme.palette.secondary.dark,
    paddingTop: theme.spacing(0.7)
  },
  locations: {
    display: 'flex',
    '& > *': {
      marginRight: theme.spacing(2)
    }
  },
  viewBotton: {
    float: 'right',
    fontWeight: 600,

  }
}));

const CardComponent: React.FC<ICardComponent> = (props) => {
  const classes = useStyles()
  const { id, organizations, objective, type, locations, remote, compensation } = props.data

  return (
    <Paper className={classes.root}>
      <div className={classes.logo}>
        {organizations.map((org: any, key: number) => {
          return <Avatar key={key} alt={org.name} src={org.picture} />
        })}
      </div>
      <div className={classes.body}>
        <Typography gutterBottom variant="h6" component="h3" className={classes.title}>{objective}</Typography>
        <Typography gutterBottom variant="body1" component="h6">{type}</Typography>
        {organizations.map((org: any, key: number) => {
          return <Typography gutterBottom key={key} variant="body1" component="h6">{org.name}</Typography>
        })}
        <div className={classes.locations}>
          {remote && <Typography gutterBottom variant="body1" component="h6">Remote</Typography>}
          {locations.slice(0, 4).map((loc: any, key: number) => {
            return <Typography gutterBottom key={key} variant="body1" component="h6">{loc}</Typography>
          })}
        </div>
        {(compensation && compensation.data) ? (
          <Typography gutterBottom variant="body1" component="h6">
            {compensationrangeToString(compensation.data)}
          </Typography>
        ) : ''}
        <Button href={`/post/${id}`} color="secondary" variant="outlined" className={classes.viewBotton}>View</Button>
      </div>
    </Paper>
  )
}

export default CardComponent
