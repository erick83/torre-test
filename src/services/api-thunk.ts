import { isNil, isEmpty } from 'lodash'
import { get, post } from './fetchSerice'
import { storeBios } from '../redux/bios/actions'
import { storeAggregators, storeAggregatorsBody, storeOpportunitie, storeOpportunities  } from '../redux/opportunities/actions'
import { showLoader, hideLoader } from '../redux/loader/actions'
import { IPostQuerySearch } from '../models/api.interfaces'

const defaultQs: IPostQuerySearch = {
  size: 10,
  offset: 0,
  aggregate: true,
}

export const getUsername = (username: string = '') => async (dispatch: (t: any) => void) => {
  dispatch(showLoader())
  try {
      const results = await get(`bios/${username}`)
      dispatch(storeBios(results))
  } catch (error) {
  } finally {
    dispatch(hideLoader())
  }
}

export const getOpportunitie = (id: string = '') => async (dispatch: (t: any) => void) => {
  dispatch(showLoader())
  try {
    const results = await get(`opportunities/${id}`)
    dispatch(storeOpportunitie(results))
  } catch (error) {
  } finally {
    dispatch(hideLoader())
  }
}

export const getPeopple = (qs: IPostQuerySearch = defaultQs, body: any = {}) => async (dispatch: (t: any) => void) => {
  dispatch(showLoader())
  try {
    const results = await post('peopple/', {qs, body})
    // dispatch(storePeopple(results))
  } catch (error) {
  } finally {
    dispatch(hideLoader())
  }
}

export const getOpportunities = (query: IPostQuerySearch = defaultQs, body: any = undefined) => async (dispatch: (t: any) => void) => {
  getAggregates(body)(dispatch)
  if (isNil(body) || isEmpty(body)) {
    dispatch(storeOpportunities({}))
  } else {
    getResults(query, body)(dispatch)
  }
}

const getAggregates = (body: any = undefined) => async (dispatch: (t: any) => void) => {
  const qs: IPostQuerySearch = {
    ...defaultQs,
    aggregate: true,
    size: 0
  }

  dispatch(showLoader())
  try {
    const results = await post('opportunities/', {qs, body})
    dispatch(storeAggregators(results))
    if (body) {
      dispatch(storeAggregatorsBody(body))
    }
  } catch (error) {
  } finally {
    dispatch(hideLoader())
  }
}

const getResults = (query: IPostQuerySearch = defaultQs, body: any = undefined) => async (dispatch: (t: any) => void) => {
  const qs: IPostQuerySearch = {
    ...query,
    aggregate: false,
  }

  dispatch(showLoader())
  try {
    const results = await post('opportunities/', {qs, body})
    dispatch(storeOpportunities(results))
  } catch (error) {
  } finally {
    dispatch(hideLoader())
  }
}
