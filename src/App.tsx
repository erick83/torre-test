import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { CssBaseline, ThemeProvider } from '@material-ui/core'

import * as Components from './pages'
import { useSelector } from 'react-redux'
import { IStore } from './models/store.interfaces'
import LoaderComponent from './components/loader/loader.component'

import myTheme from './theme'

const MyApp: React.FC<any> = (props) => {
  const loader = useSelector((state: IStore) => state.loader)

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={myTheme}>
        {loader ? <LoaderComponent /> : ''}
        <Switch>
          <Route path="/" exact>
              <Components.Home />
          </Route>
          <Route path="/bio/:id">
              <Components.Bio />
          </Route>
          <Route path="/post/:id">
              <Components.Opportunities />
          </Route>
          <Route path="*">
            <Redirect to="/"/>
          </Route>
        </Switch>
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
