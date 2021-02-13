import { OPPORTUNITIES_STORE } from "./actions";

const initialState = {
  search: {}
}

export default function mainReducer(state: any = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case OPPORTUNITIES_STORE:
      return {
        ...state,
        search: payload
      }
    default:
      return state
  }
}
