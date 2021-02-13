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
  aggregators?: IAggregators
  offset?: number
  results?: any[]
  size?: number
  total?: number
}

export interface IAggregators {
  remote?: IAggregatorsType[]
  compensationrange?: IAggregatorsType[]
  type?: IAggregatorsType[]
  organization?: IAggregatorsType[]
  skill?: IAggregatorsType[]
  status?: IAggregatorsType[]
}

export interface IAggregatorsType {
  value: string
  total: number
}
