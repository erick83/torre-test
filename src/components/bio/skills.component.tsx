import React from 'react'
import { Card, CardContent, Chip, Divider, makeStyles, Paper, Typography } from '@material-ui/core'

export interface ISkillsComponent {
  strengths: any[]
  languages: any[]
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

const SkillsComponent: React.FC<ISkillsComponent> = ({ strengths, languages }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="body1" component="h3">Current skills:</Typography>
        <Paper component="ul" className={classes.strengthsPaper} elevation={0}>
          {strengths.map((str, key) => {
            return (<li key={key}>
              <Chip label={str.name} className={classes.chip} />
            </li>)
          })}
        </Paper>
      </CardContent>
      <Divider />
      <CardContent>
        <Typography gutterBottom variant="body1" component="h3">Languages:</Typography>
        <Paper component="ul" className={classes.strengthsPaper} elevation={0}>
          {languages.map((l, key) => {
            return (<li key={key}>
              <Chip label={`${l.language} - ${l.fluency}`} className={classes.chip} />
            </li>)
          })}
        </Paper>
      </CardContent>
    </Card>
  )
}

export default SkillsComponent
