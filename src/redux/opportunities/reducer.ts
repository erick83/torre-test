import { IOpportunities, IOpportunitiesData } from "../../models/store.interfaces";
import { AGGREGATORS_STORE, AGGREGATORS_BODY_STORE, OPPORTUNITIES_STORE } from "./actions";

const initialState: IOpportunities = {
  search: {},
}

export default function mainReducer(state: IOpportunities = initialState, action: { type: string, payload: IOpportunitiesData }) {
  const { type, payload } = action
  switch (type) {
    case AGGREGATORS_STORE:
      return {
        ...state,
        search: {
          ...payload,
          results: {
            ...state.search?.results
          }
        }
      }

      case AGGREGATORS_BODY_STORE:
      return {
        ...state,
        search: {
          ...state.search,
          ...payload,
        }
      }

    case OPPORTUNITIES_STORE:
      return {
        ...state,
        search: {
          ...state,
          results: payload?.results,
        }
      }
    default:
      return state
  }
}
