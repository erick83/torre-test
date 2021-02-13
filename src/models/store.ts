export interface IStore {
  bios?: IOpportunities
  opportunities?: IOpportunities
  people?: any
}

export interface IOpportunities {
  search?: IOpportunitiesData
  selected?: any
}

export interface IOpportunitiesData {
  aggregators: any
  offset: number
  results: any[]
  size: number
  total: number
}
