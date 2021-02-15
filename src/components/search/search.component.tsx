import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize, difference, isEmpty, flatMap } from 'lodash'
import Fuse from 'fuse.js';
import { makeStyles, TextField } from '@material-ui/core'
import { getOpportunities } from '../../services/api-thunk';
import { Autocomplete } from '@material-ui/lab'

import { IAggregatorsType, IStore } from '../../models/store.interfaces'
import { parseFilterBody } from '../../services/parseFilters';

const AGG_LIST = ['organization', 'remote', 'skill', 'status', 'type']

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    paddingTop: theme.spacing(4),
    maxWidth: 900,
    margin: `${theme.spacing(4)}px auto`
  },
}));

const SearchComponent: React.FC = () => {
  const agg = useSelector((state: IStore) => state.opportunities?.search?.aggregators)
  const body = useSelector((state: IStore) => state.opportunities?.search?.body)
  const [values, setValues] = useState<any[] | undefined>([]);
  const [fuse, setFuse] = useState<Fuse<unknown>>();
  const [options, setOptions] = useState<any[]>([]);
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    setValues(parseSearchFromBody(body))
    console.log(values)
  }, [body])

  useEffect(() => {
    console.log(agg)
    if (!isEmpty(agg)) {
      const opts = AGG_LIST.map((section: string) => {
        const sec = (agg as any)[section]
        const opt = sec.map((i: any) => ({ section, value: parseAggToOption(section, i)}))
        return opt
      })
      const newFuse = new Fuse(flatMap(opts), { includeScore: false, keys: ['value'] })
      setFuse(newFuse)
    }
  }, [agg])

  function change(event: any, newValue: string[]) {
    if (newValue.length === 0) {
      dispatch(getOpportunities({ offset: 0, size: 20 }, {}))
      return
    }

    const qs = { offset: 0, size: 20 }

    if (values && (values?.length > newValue?.length)) {
      const removeKey = values?.indexOf(difference(values, newValue)[0])
      const newBody = body.and.filter((item: any, key: number) => key !== removeKey)
      const bodyPayload = newBody.length > 1 ? { and: newBody } : newBody[0]

      dispatch(getOpportunities(qs, bodyPayload))
    } else {
      console.log(newValue)
      let bodyParsed = {}
      newValue.forEach((item: any) => {
        bodyParsed = parseFilterBody(item?.section, { value: item?.value, total: 0 } as IAggregatorsType , body)
      })

      dispatch(getOpportunities(qs, bodyParsed))
    }

  }

  function inputChangeHandler (event: any, value: string) {
    const resp = fuse?.search(value).slice(0, 25).map(i => i.item)
    setOptions(resp as any[])
  }

  return (
    <div className={classes.searchContainer}>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option?.value }
        value={values}
        onChange={change}
        onInputChange={inputChangeHandler}
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
    let value
    switch (key) {
      case 'type':
        value = `Type - ${item.type.code}`
        break
      case 'remote':
        value = item.remote.term ? 'Remote' : 'No Remote'
        break
      case 'organization':
        value = `Organization - ${capitalize(item.organization.term)}`
        break
      case 'skill':
        value = `Skill - ${capitalize(item.skill.term)}`
        break
      case 'status':
        value = `Status - ${capitalize(item.status.code)}`
        break
      case 'compensationrange':
        const { currency, minAmount, maxAmount, periodicity } = item.compensationrange
        value = `Compensation - ${currency} ${minAmount} - ${maxAmount}/${periodicity}`
        break
      default:
        value = ''
        break
    }

    return {
      section: key,
      value
    }
  })
}

function parseAggToOption(section: string, option: any) {
  switch (section) {
    case 'type':
      return `Type - ${capitalize(option.value)}`
    case 'remote':
      return option.value === 'yes' ? 'Remote' : 'No Remote'
    case 'organization':
      return `Organization - ${option.value}`
    case 'skill':
      return `Skill - ${option.value}`
    case 'status':
      return `Status - ${capitalize(option.value)}`
    default:
      return ''
  }
}

export default SearchComponent
