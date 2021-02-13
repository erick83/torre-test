import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import * as Components from './pages'

const MyApp: React.FC<any> = (props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Switch>
        <Route path="/" exact>
            <Components.Home />
        </Route>
        <Route path="/bio/:id">
            <Components.Bio />
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default MyApp
