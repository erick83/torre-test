import React, { useState } from 'react'
import Fuse from 'fuse.js';
import { CircularProgress, List, ListItem, ListItemText, makeStyles, TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';

import { IAggregators, IAggregatorsType, IStore } from '../../models/store.interfaces';
import { aggTypesStringFormat } from '../../services/utils';
import { useDispatch, useSelector } from 'react-redux';
import { IPostQuerySearch } from '../../models/api.interfaces';
import { getOpportunities } from '../../redux/api-thunk';
import { parseFilterBody } from '../../services/parseFilters';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  section: {
    padding: 0,
    paddingLeft: theme.spacing(2),
  },
  sectionText: {
    fontSize: 14,
  },
  nestedList: {
    padding: 0,
  },
  nestedItem: {
    padding: 0,
    paddingLeft: theme.spacing(4),
  },
  nestedText: {
    fontSize: 14,
  },
}));

const SideBarListComponent: React.FC<{ data: IAggregators }> = ({ data }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const queryString: IPostQuerySearch = { offset: 0, size: 20 }
  const currentBody: any = useSelector((state: IStore) => state.opportunities?.search?.body)

  const [organizationValue, setorganizationValue] = useState<string>('')
  const [organizations, setorganizations] = useState<IAggregatorsType[]>(getTopOrganizations(data.organization))
  const [organizationOpen, setorganizationOpen] = useState(false)
  const organizationFuse = new Fuse(data?.organization || [], { includeScore: false, keys: ['value', 'total'] })
  const organizationLoading = organizationOpen && organizations.length === 0;

  function click(section: string, item: IAggregatorsType | undefined) {
    return () => {
      const body = parseFilterBody(section, item, currentBody)
      dispatch(getOpportunities(queryString, body))
    }
  }

  function change(section: string) {
    return (event: any, value: any) => {
      console.log(section, value)
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

  return(
    <List className={classes.root}>
      <ListItem button className={classes.section}>
        <ListItemText primary="Status" className={classes.sectionText} disableTypography={true} />
      </ListItem>
      <List className={classes.nestedList}>
        {data.status ? data.status.map((item: IAggregatorsType, key: number) => {
          return (
              <ListItem key={key} button className={classes.nestedItem} onClick={click('status', item)}>
                <ListItemText primary={aggTypesStringFormat(item)} className={classes.nestedText} disableTypography={true}/>
              </ListItem>
            )
        }) : ''}
      </List>

      <ListItem button className={classes.section}>
        <ListItemText primary="Type of job" disableTypography={true}/>
      </ListItem>
      <List className={classes.nestedList}>
        {data.type ? data.type.map((item: IAggregatorsType, key: number) => {
          return (
              <ListItem key={key} button className={classes.nestedItem} onClick={click('type', item)}>
                <ListItemText primary={aggTypesStringFormat(item)} className={classes.nestedText} disableTypography={true}/>
              </ListItem>
            )
        }) : ''}
      </List>

      <ListItem button className={classes.section}>
        <ListItemText primary="Location" disableTypography={true}/>
      </ListItem>
      <List className={classes.nestedList}>
        <ListItem button className={classes.nestedItem} onClick={click('remote', data?.remote?.find(i => i.value === 'yes'))}>
          <ListItemText primary="Remote - " secondary={data?.remote?.find(i => i.value === 'yes')?.total} className={classes.nestedText} disableTypography={true}/>
        </ListItem>
      </List>

      <ListItem button className={classes.section}>
        <ListItemText primary="Organization" disableTypography={true}/>
      </ListItem>

      <Autocomplete
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
        style={{ width: 300 }}
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

      <ListItem button className={classes.section}>
        <ListItemText primary="Compensation" disableTypography={true}/>
      </ListItem>
      <Autocomplete
        options={data?.compensationrange || []}
        getOptionLabel={(option: IAggregatorsType) => option.value}
        style={{ width: 300 }}
        renderInput={(params: any) => <TextField {...params} label="Combo box" variant="outlined" />}
      />

    </List>
  )
}

export default SideBarListComponent
