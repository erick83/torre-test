import { BIOS_STORE } from "./actions";

const initialState = {}

export default function mainReducer(state: any = initialState, action: any) {
  const { type, payload } = action
  switch (type) {
    case BIOS_STORE:
      return {
        ...payload
      }
    default:
      return state
  }
}
