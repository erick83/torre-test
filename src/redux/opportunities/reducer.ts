import { isNil, isEmpty } from 'lodash'
import { IOpportunities } from "../../models/store.interfaces";
import { AGGREGATORS_STORE, AGGREGATORS_BODY_STORE, OPPORTUNITIES_STORE, OPPORTUNITIE_STORE } from "./actions";

const initialState: IOpportunities = {
  search: {},
  selected: {},
}

export default function mainReducer(state: IOpportunities = initialState, action: { type: string, payload: any }) {
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
      let body = undefined

      if (!isNil(payload) && !isEmpty(payload)) {
        body = payload.and ? payload : { and: [payload] }
      }

      return {
        ...state,
        search: {
          ...state.search,
          body,
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

    case OPPORTUNITIE_STORE:
      return {
        ...state,
        selected: {
          ...payload
        }
      }
    default:
      return state
  }
}
