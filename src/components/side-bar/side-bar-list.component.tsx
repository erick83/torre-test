import React, { useState } from 'react'
import { isEmpty, isNil } from 'lodash';
import Fuse from 'fuse.js';
import { CircularProgress, List, ListItem, ListItemText, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';

import { IAggregators, IAggregatorsType, IStore } from '../../models/store.interfaces';
import { aggTypesStringFormat } from '../../services/utils';
import { useDispatch, useSelector } from 'react-redux';
import { IPostQuerySearch } from '../../models/api.interfaces';
import { getOpportunities } from '../../services/api-thunk';
import { parseFilterBody } from '../../services/parseFilters';
import useStyles from './side-bar-list.styles'

const SideBarListComponent: React.FC<{ data: IAggregators }> = ({ data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const queryString: IPostQuerySearch = { offset: 0, size: 20 }
  const organizationFuse = new Fuse(data?.organization || [], { includeScore: false, keys: ['value', 'total'] })
  const currentBody: any = useSelector((state: IStore) => state.opportunities?.search?.body)
  const [organizationValue, setorganizationValue] = useState<string>('')
  const [organizations, setorganizations] = useState<IAggregatorsType[]>(getTopOrganizations(data.organization))
  const [organizationOpen, setorganizationOpen] = useState(false)
  const organizationLoading = organizationOpen && organizations.length === 0;

  function click(section: string, item: IAggregatorsType | undefined) {
    return () => {
      const body = parseFilterBody(section, item, currentBody)
      dispatch(getOpportunities(queryString, body))
    }
  }

  function change(section: string) {
    return (event: any, value: any) => {
      const body = parseFilterBody(section, value, currentBody)
      dispatch(getOpportunities(queryString, body))
    }
  }

  function getOrganizationOptions(event: any, key: string) {
    const first20 = organizationFuse.search(key).slice(0, 20).map(i => i.item)
    setorganizations(first20)
    setorganizationValue(key)
  }

  function getTopOrganizations(data: IAggregatorsType[] = []) {
    return data.sort((a, b) => b.total - a.total).slice(0, 20)
  }

  function getAutocompleteValue(selector: string) {
    if (isNil(currentBody) || isEmpty(currentBody)) {
      return null
    }

    const currentItem = currentBody.and.find((item: any) => {
      return item[selector]
    })

    let resp = null

    switch (selector) {
      case 'organization':
        resp = organizations.find((item: IAggregatorsType) => {
          if (!currentItem) {
            return false
          }
          return item.value === currentItem?.organization?.term
        })
        break

      default:
        break
    }

    return resp || null
  }

  return(
    <List className={classes.root}>
      <ListItem className={classes.section}>
        <ListItemText primary="Status" className={classes.sectionText} disableTypography={true} />
      </ListItem>
      <List className={classes.nestedList}>
        {data.status ? data.status.map((item: IAggregatorsType, key: number, arr: any[]) => {
          const disabled = arr.length === 1
          return (
              <ListItem key={key} button className={classes.nestedItem} onClick={click('status', item)} disabled={disabled}>
                <ListItemText primary={aggTypesStringFormat(item)} className={classes.nestedText} disableTypography={true}/>
              </ListItem>
            )
        }) : ''}
      </List>

      <ListItem className={classes.section}>
        <ListItemText primary="Type of job" disableTypography={true}/>
      </ListItem>
      <List className={classes.nestedList}>
        {data.type ? data.type.map((item: IAggregatorsType, key: number, arr: any[]) => {
          const disabled = arr.length === 1
          return (
              <ListItem key={key} button className={classes.nestedItem} onClick={click('type', item)} disabled={disabled}>
                <ListItemText primary={aggTypesStringFormat(item)} className={classes.nestedText} disableTypography={true}/>
              </ListItem>
            )
        }) : ''}
      </List>

      <ListItem className={classes.section}>
        <ListItemText primary="Location" disableTypography={true}/>
      </ListItem>
      <List className={classes.nestedList}>
        <ListItem button className={classes.nestedItem} onClick={click('remote', data?.remote?.find(i => i.value === 'yes'))} disabled={data?.remote?.length === 1}>
          <ListItemText primary="Remote - " secondary={data?.remote?.find(i => i.value === 'yes')?.total} className={classes.nestedText} disableTypography={true}/>
        </ListItem>
      </List>

      <ListItem className={classes.section}>
        <ListItemText primary="Organization" disableTypography={true}/>
      </ListItem>

      <Autocomplete
        value={getAutocompleteValue('organization')}
        size="small"
        options={organizations}
        loading={organizationLoading}
        open={organizationOpen}
        onChange={change('organization')}
        onOpen={() => { setorganizationOpen(true) }}
        onClose={() => { setorganizationOpen(false) }}
        onInputChange={getOrganizationOptions}
        inputValue={organizationValue}
        getOptionSelected={(option, value) => option.value === value.value}
        getOptionLabel={(option: IAggregatorsType) => `${option.value} - ${option.total}`}
        className={classes.autocomplete}
        renderInput={(params: any) => <TextField
          {...params}
          label="Organization"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {organizationLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />}
      />

      <ListItem className={classes.section}>
        <ListItemText primary="Compensation" disableTypography={true}/>
      </ListItem>
      <List className={classes.nestedList}>
        {data.compensationrange ? data.compensationrange.map((item: IAggregatorsType, key: number, arr: any[]) => {
          const disabled = arr.length === 1
          return (
              <ListItem key={key} button className={classes.nestedItem} onClick={click('compensationrange', item)} disabled={disabled}>
                <ListItemText primary={`${item.value} - ${item.total}`} className={classes.nestedText} disableTypography={true}/>
              </ListItem>
            )
        }) : ''}
      </List>
    </List>
  )
}

export default SideBarListComponent
