import React from 'react'
import { Avatar, Card, CardContent, Chip, Divider, makeStyles, Paper, Typography } from '@material-ui/core'

export interface IResumeComponent {
  jobs: any[]
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 380,
    minWidth: 350
  },
  strengthsPaper: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
    margin: `${theme.spacing(1)}px 0`,
    backgroundColor: theme.palette.background.default,
  },
  iconSection: {
    maxWidth: '20%'
  },
  content: {
    flex: '1 1 auto',
    maxWidth: '80%',
    paddingLeft: theme.spacing(1.2)
  },
  organizationsSection: {
    paddingTop: theme.spacing(1.2),
  },
  responsibilities: {
    width: '100%',
    margin: 0,
    paddingLeft: theme.spacing(2)
  }
}));

const ResumeComponent: React.FC<IResumeComponent> = ({ jobs }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="body1" component="h3">Resume:</Typography>
        {jobs.map((job, key) => {
          console.log(job)
          return (
              <Paper key={key} component="div" className={classes.strengthsPaper} elevation={1}>
                <div className={classes.iconSection}>
                  {job.organizations.map((item: any, key: number) => {
                    return (
                      <Avatar key={key} variant="rounded" src={item.picture} style={key > 0 ? {marginTop: '-28px'} : {}}>{item.name[0]}</Avatar>
                    )
                  })}
                </div>
                <div className={classes.content}>
                  <div className={classes.organizationsSection}>
                    {job.organizations.map((item: any, key: number) => {
                      return (
                        <Typography gutterBottom variant="caption" component="p">{item.name}</Typography>
                      )
                    })}
                  </div>
                  <ul className={classes.responsibilities}>
                    {job.responsibilities.map((item: any, key: number) => {
                      return <Typography gutterBottom variant="caption" component="li">{item}</Typography>
                    })}
                  </ul>
                </div>
              </Paper>
            )
        })}
      </CardContent>
    </Card>
  )
}

export default ResumeComponent
