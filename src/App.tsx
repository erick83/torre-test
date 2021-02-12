import React from 'react'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
// import CssBaseline from '@material-ui/core/CssBaseline'

import * as Components from './pages'
import store from './redux/store'
// import myTheme from '../styles/theme'
// import '../styles/globals.scss'

// export interface IMyApp {
//   Component: React.FC
//   pageProps: any
// }

const MyApp: React.FC<any> = (props) => {

  return (
    <React.Fragment>
      <Switch>
        <Route path="">
            <Components.Home />
        </Route>
      </Switch>
    </React.Fragment>
  )
}

export default MyApp
