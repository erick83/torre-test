import { HIDE_LOADER, SHOW_LOADER } from "./actions"

const initialState: number = 0

export default function mainReducer(state = initialState, action: { type: string }) {
  const { type } = action
  switch (type) {
    case SHOW_LOADER:
      return state+=1

    case HIDE_LOADER:
      return state-=1

    default:
      return state
  }
}
