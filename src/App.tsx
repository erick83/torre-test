import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'

import store from './redux/store'
// import myTheme from '../styles/theme'
import '../styles/globals.scss'

export interface IMyApp {
  Component: React.FC
  pageProps: any
}

const MyApp: React.FC<IMyApp> = ({ Component, pageProps }) => {
  return (
    <React.Fragment>
      <Provider store={store}>
        {/* <ThemeProvider theme={myTheme}> */}
          {/* <CssBaseline /> */}
          <Component {...pageProps} />
        {/* </ThemeProvider> */}
      </Provider>
    </React.Fragment>
  )
}

export default MyApp
