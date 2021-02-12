import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface IEmedState {
}

const initialState = {}
const store: any = (preloadedState = initialState) => {
  const reducers = combineReducers({
  })

  return createStore(
    reducers,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  )
}

export default store
