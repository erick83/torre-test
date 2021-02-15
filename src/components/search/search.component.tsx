import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize, difference } from 'lodash'
import { makeStyles, TextField } from '@material-ui/core'
import { getOpportunities } from '../../services/api-thunk';
import { Autocomplete } from '@material-ui/lab'

import { IStore } from '../../models/store.interfaces'

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    paddingTop: theme.spacing(4),
    maxWidth: 900,
    margin: `${theme.spacing(4)}px auto`
  },
}));

const SearchComponent: React.FC = () => {
  const body = useSelector((state: IStore) => state.opportunities?.search?.body)
  const [values, setValues] = React.useState<any[] | undefined>([]);
  const classes = useStyles()
  const dispatch = useDispatch()
  const options: any[] = []

  function change(event: any, newValue: string[]) {
    if (newValue.length === 0) {
      dispatch(getOpportunities({ offset: 0, size: 20 }, {}))
      return
    }

    const removeKey = values?.indexOf(difference(values, newValue)[0])
    const newBody = body.and.filter((item: any, key: number) => key !== removeKey)
    const bodyPayload = newBody.length > 1 ? { and: newBody } : newBody[0]

    dispatch(getOpportunities({ offset: 0, size: 20 }, bodyPayload))
  }

  useEffect(() => {
    setValues(parseSearchFromBody(body))
  }, [body])

  return (
    <div className={classes.searchContainer}>
      <Autocomplete
        multiple
        options={options}
        value={values}
        onChange={change}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Search Jobs"
            placeholder="Search Jobs"
          />
        )}
      />
    </div>
  )
}

function parseSearchFromBody(body: any) {
  if (!(body && body.and)) {
    return []
  }

  const { and } = body

  return and.map((item: any) => {
    const key = Object.keys(item)[0]

    switch (key) {
      case 'type':
        return `Type - ${capitalize(item.type.code)}`
      case 'remote':
        return item.remote.term ? 'Remote' : 'No Remote'
      case 'organization':
        return `Organization - ${capitalize(item.organization.term)}`
      case 'skill':
        return `Skill - ${capitalize(item.skill.term)}`
      case 'status':
        return `Status - ${capitalize(item.status.code)}`
      case 'compensationrange':
        const { currency, minAmount, maxAmount, periodicity } = item.compensationrange
        return `Compensation - ${currency} ${minAmount} - ${maxAmount}/${periodicity}`
      default:
        return ''
    }
  })
}

export default SearchComponent
