import { get, post } from '../services/fetchSerice'
import { storeBios } from './bios/actions'
import { storeAggregators, storeOpportunities } from './opportunities/actions'

interface IPostQuerySearch {
  size: number
  offset: number
  aggregate?: boolean
}

const defaultQs: IPostQuerySearch = {
  size: 0,
  offset: 0,
  aggregate: true,
}

export const getUsername = (username: string) => async (dispatch: (t: any) => void) => {
  // dispatch({ type: LOGIN_START })
  // dispatch(requestPending())

  try {
      const results = await get(`bios/${username}`)
      dispatch(storeBios(results))
  } catch (error) {
      // dispatch(loginError(error.message))
      // dispatch(requestError())

      // dispatch(addAlertMessage(error))
  }
}

export const getOpportunitie = (id: string) => async (dispatch: (t: any) => void) => {
  try {
    const results = await get(`opportunities/${id}`)
    // dispatch(storeOpportunitie(results))
  } catch (error) {
  }
}

export const getAggregates = (query: IPostQuerySearch = defaultQs, body: object = {}) => async (dispatch: (t: any) => void) => {
  const qs: IPostQuerySearch = {
    ...query,
    aggregate: true,
  }

  try {
    const results = await post('opportunities/', {qs, body})
    dispatch(storeAggregators(results))
  } catch (error) {
  }
}

export const getOpportunities = (query: IPostQuerySearch = defaultQs, body: object = {}) => async (dispatch: (t: any) => void) => {
  const qs: IPostQuerySearch = {
    ...query,
    aggregate: false,
  }

  try {
    const results = await post('opportunities/', {qs, body})
    dispatch(storeOpportunities(results))
  } catch (error) {
  }
}

export const getPeopple = (qs: IPostQuerySearch = defaultQs, body: object = {}) => async (dispatch: (t: any) => void) => {
  try {
    const results = await post('peopple/', {qs, body})
    // dispatch(storePeopple(results))
  } catch (error) {
  }
}
