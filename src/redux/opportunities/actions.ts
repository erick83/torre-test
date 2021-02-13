import { IOpportunitiesData } from "../../models/store.interfaces"

export const AGGREGATORS_STORE = 'AGGREGATORS STORE'
export const AGGREGATORS_BODY_STORE = 'AGGREGATORS BODY STORE'
export const OPPORTUNITIES_STORE = 'OPPORTUNITIES STORE'
export const OPPORTUNITIES_BODY_STORE = 'OPPORTUNITIES BODY STORE'
export const OPPORTUNITIE_STORE = 'OPPORTUNITIE STORE'

// Action creators

export const storeAggregators = (payload: IOpportunitiesData) => ({
  type: AGGREGATORS_STORE,
  payload
})

export const storeAggregatorsBody = (payload: { body: any }) => ({
  type: AGGREGATORS_BODY_STORE,
  payload
})

export const storeOpportunities = (payload: IOpportunitiesData) => ({
  type: OPPORTUNITIES_STORE,
  payload
})

export const storeOpportunitie = (payload: any) => ({
  type: OPPORTUNITIE_STORE,
  payload
})
