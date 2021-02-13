import { get, post } from '../services/fetchSerice'
import { storeBios } from './bios/actions'
import { storeAggregators, storeAggregatorsBody, storeOpportunities } from './opportunities/actions'
import { IPostQuerySearch } from '../models/api.interfaces'

const defaultQs: IPostQuerySearch = {
  size: 10,
  offset: 0,
  aggregate: true,
}

export const getUsername = (username: string = '') => async (dispatch: (t: any) => void) => {
  try {
      const results = await get(`bios/${username}`)
      dispatch(storeBios(results))
  } catch (error) {
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
    size: 0
  }

  try {
    const results = await post('opportunities/', {qs, body})
    dispatch(storeAggregators(results))
    dispatch(storeAggregatorsBody({ body }))
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
