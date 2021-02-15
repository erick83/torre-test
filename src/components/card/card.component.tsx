import React from 'react'
import { Avatar, Button, makeStyles, Paper, Typography } from '@material-ui/core'

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
    width: '10%'
  },
  body: {

  },
  locations: {
    display: 'flex',
    '& > *': {
      marginRight: theme.spacing(2)
    }
  }
}));

const CardComponent: React.FC<ICardComponent> = (props) => {
  const classes = useStyles()
  const { id, organizations, objective, type, locations, remote, compensation } = props.data
  // console.log(props)

  return (
    <Paper className={classes.root}>
      <div className={classes.logo}>
        {organizations.map((org: any) => {
          return <Avatar alt={org.name} src={org.picture} />
        })}
      </div>
      <div className={classes.body}>
        <Typography gutterBottom variant="h6" component="h3">{objective}</Typography>
        <Typography gutterBottom variant="body1" component="h6">{type}</Typography>
        {organizations.map((org: any) => {
          return <Typography gutterBottom variant="body1" component="h6">{org.name}</Typography>
        })}
        <div className={classes.locations}>
          {remote && <Typography gutterBottom variant="body1" component="h6">Remote</Typography>}
          {locations.slice(0, 4).map((loc: any) => {
            return <Typography gutterBottom variant="body1" component="h6">{loc}</Typography>
          })}
        </div>
        {compensation.data && (
          <Typography gutterBottom variant="body1" component="h6">
            {`${compensation.data.currency} ${compensation.data.minAmount} - ${compensation.data.maxAmount}/${compensation.data.periodicity}`}
          </Typography>
        )}
        <Button href={`/post/${id}`}>View</Button>
      </div>
    </Paper>
  )
}

export default CardComponent
