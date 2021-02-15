import React from 'react'
import { capitalize } from 'lodash'
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
  strengths?: any[]
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
  titleColor: {
    color: theme.palette.secondary.dark,
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
    listStyle: 'none'
  },
  money: {
    margin: theme.spacing(1)
  },

}));

const PostBodyComponent: React.FC<TPostBodyComponent> = (props) => {
  const { organizations, place, timezones, compensation, details, languages, opportunity, strengths } = props
  const classes = useStyles()
  const xp: any[] = parseStrengths(strengths)

  return (
    <div className={classes.container}>
      <CardContent className={classes.title}>
        <Typography variant="body1" component="h6" className={classes.titleColor}>Skills and experience needed</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          {xp.map((str, key: number) => {
            return (
              <li>
                <Typography gutterBottom variant="body2" component="p">{capitalize(str.text)}</Typography>
                <div className={classes.strengthsPaper} key={key}>
                  {str.names.map((name: string, key: number) => (<Chip key={key} label={name} className={classes.chip} />))}
                </div>
              </li>
            )
          })}
        </Paper>

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Organization(s) name(s)</Typography>
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
        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Location</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          <li className={classes.strengthsPaper}>
            <LocationOnIcon fontSize="large" />
            {place.remote && <Chip label="Remote" className={classes.chip} />}
            {place.anywhere && <Chip label="Anywhere" className={classes.chip} />}
          </li>
        </Paper>
        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Time zone</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          <li className={classes.strengthsPaper}>
            <LanguageIcon fontSize="large" />
            {timezones && <Chip label={`${timezones[0]} to ${timezones[1]}`} className={classes.chip} />}
          </li>
        </Paper>

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Monetary compensation</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          <li className={classes.strengthsPaper}>
            <MonetizationOnIcon fontSize="large" />
            {compensation && <Typography gutterBottom variant="body2" component="p" className={classes.money}>
              {`${compensation.currency}${compensation.minAmount} - ${compensation.maxAmount}/${compensation.periodicity}`}
            </Typography> }
          </li>
        </Paper>

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Responsibilities</Typography>
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

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Additional requirements (other than skills)</Typography>
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

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Language(s) required</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          {languages && languages.map((item: any, key: number) => {
            return (
              <li className={classes.strengthsPaper} key={key}>
                <Chip label={`${item.language.name} - ${snakeTypesStringParse(item.fluency)}`} className={classes.chip} />
              </li>
            )
          })}
        </Paper>

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>About the organization(s)</Typography>
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

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Team culture</Typography>
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

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Additional compensation</Typography>
        <Paper component="ul" elevation={0} className={classes.itemContainer}>
          {getStockCompensations(details)?.map((item: any, key: number) => {
            return (
              <li className={classes.strengthsPaper} key={key}>
                <Chip label={item.content} className={classes.chip} />
              </li>
            )
          })}
        </Paper>

        <Typography gutterBottom variant="body1" component="h6" className={classes.titleColor}>Agreement type</Typography>
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

export default PostBodyComponent
