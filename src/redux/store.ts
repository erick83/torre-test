import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import loaderReducer from './loader/reducer'
import biosReducer from './bios/reducer'
import opportunitiesReducer from './opportunities/reducer'

const state = combineReducers({
  loader: loaderReducer,
  bios: biosReducer,
  opportunities: opportunitiesReducer,
})

const store = createStore(
  state,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
