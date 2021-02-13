import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import biosReducer from './bios/reducer'
import opportunitiesReducer from './opportunities/reducer'

const state = combineReducers({
  bios: biosReducer,
  opportunities: opportunitiesReducer,
})

const store = createStore(
  state,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store
