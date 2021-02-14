import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { capitalize, difference } from 'lodash'
import { makeStyles, TextField } from '@material-ui/core'
import { getAggregates } from '../redux/api-thunk';
import { Autocomplete } from '@material-ui/lab'

import { IStore } from '../models/store.interfaces'

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    paddingTop: theme.spacing(6)
  },
}));

const SearchComponent: React.FC<any> = (props: any) => {
  const body = useSelector((state: IStore) => state.opportunities?.search?.body)
  const [values, setValues] = React.useState<any[] | undefined>([]);
  const classes = useStyles()
  const dispatch = useDispatch()
  const options: any[] = []

  function change(event: any, newValue: string[]) {
    if (newValue.length === 0) {
      dispatch(getAggregates({}))
      return
    }

    const removeKey = values?.indexOf(difference(values, newValue)[0])
    const newBody = body.and.filter((item: any, key: number) => key !== removeKey)
    dispatch(getAggregates(newBody.length > 1 ? { and: newBody } : newBody[0]))
  }

  useEffect(() => {
    setValues(parseSearchFromBody(body))
  }, [body])

  console.log(values)

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
        return `Organization - ${capitalize(item.organization.term)}}`
      case 'skill':
        return `Skill - ${capitalize(item.skill.term)}`
      case 'status':
        return `Status - ${capitalize(item.status.code)}`
      default:
        return ''
    }
  })
}

export default SearchComponent
