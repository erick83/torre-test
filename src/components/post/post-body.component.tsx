import React from 'react'
import { Avatar, CardContent, Chip, makeStyles, Paper, Typography } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import LanguageIcon from '@material-ui/icons/Language'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn'
import { snakeTypesStringParse } from '../../services/utils'

export interface TPostBodyComponent {
  organizations?: any[]
  place?: any
  timezones?: any[]
  compensation?: any
  details?: any[]
  languages?: any[]
  opportunity?: string
}

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    '& h6': {
      marginTop: theme.spacing(4)
    }
  },
  media: {
    width: 420,
    height: 310
  },
  title: {
    width: '100%',
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    paddingTop: 0
  },
  strengthsPaper: {
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    display: 'flex',
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  verticalAlig: {
    margin: 'auto 0',
    marginLeft: theme.spacing(1),
  },
  itemContainer: {
    paddingLeft: theme.spacing(1),
    marginTop: 0,
    display: 'flex'
  },
  money: {
    margin: theme.spacing(1)
  },

}));

const PostBodyComponent: React.FC<TPostBodyComponent> = (props) => {
  const { organizations, place, timezones, compensation, details, languages, opportunity } = props
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <CardContent className={classes.title}>
        <Typography gutterBottom variant="body1" component="h6">Organization(s) name(s)</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          {organizations ? organizations.map((org, key: number) => {
            return (
              <li className={classes.strengthsPaper} key={key}>
                <Avatar alt={org.name} src={org.picture} />
                <Typography variant="body2" component="p" className={classes.verticalAlig}>{org.name}</Typography>
              </li>
            )
          }) : ''}
        </Paper>
        <Typography gutterBottom variant="body1" component="h6">Location</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          <li className={classes.strengthsPaper}>
            <LocationOnIcon fontSize="large" />
            {place.remote && <Chip label="Remote" className={classes.chip} />}
            {place.anywhere && <Chip label="Anywhere" className={classes.chip} />}
          </li>
        </Paper>
        <Typography gutterBottom variant="body1" component="h6">Time zone</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          <li className={classes.strengthsPaper}>
            <LanguageIcon fontSize="large" />
            {timezones && <Chip label={`${timezones[0]} to ${timezones[1]}`} className={classes.chip} />}
          </li>
        </Paper>

        <Typography gutterBottom variant="body1" component="h6">Monetary compensation</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          <li className={classes.strengthsPaper}>
            <MonetizationOnIcon fontSize="large" />
            {compensation && <Typography gutterBottom variant="body2" component="p" className={classes.money}>
              {`${compensation.currency}${compensation.minAmount} - ${compensation.maxAmount}/${compensation.periodicity}`}
            </Typography> }
          </li>
        </Paper>

        <Typography gutterBottom variant="body1" component="h6">Responsibilities</Typography>
        <ul>
          {getDetail('responsibilities', details)?.map((item: string, key: number) => {
            if (item === '') {
              return ''
            }
            return (
              <li key={key}>
                <Typography gutterBottom variant="body2" component="p" className={classes.money}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ul>

        <Typography gutterBottom variant="body1" component="h6">Additional requirements (other than skills)</Typography>
        <ul>
          {getDetail('requirements', details)?.map((item: string, key: number) => {
            if (item === '') {
              return ''
            }
            return (
              <li key={key}>
                <Typography gutterBottom variant="body2" component="p" className={classes.money}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ul>

        <Typography gutterBottom variant="body1" component="h6">Language(s) required</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          {languages && languages.map((item: any, key: number) => {
            return (
              <li className={classes.strengthsPaper} key={key}>
                <Chip label={`${item.language.name} - ${snakeTypesStringParse(item.fluency)}`} className={classes.chip} />
              </li>
            )
          })}
        </Paper>

        <Typography gutterBottom variant="body1" component="h6">About the organization(s)</Typography>
        <ul>
          {getDetail('organizations', details)?.map((item: string, key: number) => {
            if (item === '') {
              return ''
            }
            return (
              <li key={key}>
                <Typography gutterBottom variant="body2" component="p" className={classes.money}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ul>

        <Typography gutterBottom variant="body1" component="h6">Team culture</Typography>
        <ul>
          {getDetail('team-culture', details)?.map((item: string, key: number) => {
            if (item === '') {
              return ''
            }
            return (
              <li key={key}>
                <Typography gutterBottom variant="body2" component="p" className={classes.money}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ul>

        <Typography gutterBottom variant="body1" component="h6">Additional compensation</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          {getStockCompensations(details)?.map((item: any, key: number) => {
            return (
              <li className={classes.strengthsPaper} key={key}>
                <Chip label={item.content} className={classes.chip} />
              </li>
            )
          })}
        </Paper>

        <Typography gutterBottom variant="body1" component="h6">Agreement type</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          <li className={classes.strengthsPaper}>
            <Chip label={snakeTypesStringParse(opportunity)} className={classes.chip} />
          </li>
        </Paper>
      </CardContent>
    </div>
  )
}

function getStockCompensations(details: any[] | undefined) {
  return details ? details.filter((item: any) => item.code === 'stock-compensations') : []
}

function getDetail(code: string, details: any[] | undefined) {
  return details ? details.find((item: any) => item.code === code)?.content.split('• ') : []
}

export default PostBodyComponent
