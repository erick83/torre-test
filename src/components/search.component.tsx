import React from 'react'
import { TextField } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'

const SearchComponent: React.FC<any> = (props: any) => {
  const options: any[] = []
  return (
    <React.Fragment>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => option}
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
    </React.Fragment>
  )
}

export default SearchComponent
