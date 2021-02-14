import { IAggregatorsType } from "../models/store.interfaces"

interface ISelector {
  [type: string]: (value: IAggregatorsType) => any
}

const selector: ISelector = {
  type: (item) => ({ opento: { term: item.total }}),
  remote: (item) => ({ remote: { term: item.value === 'yes' }}),
  organization: (item) => ({ organization: {term: item.value }}),
  skill: (item) => ({ skill: { term: item.value, experience: "potential-to-develop" }}),
  status: (item) => ({ status: {code: item.value }}),
  // {compensationrange: {minAmount: 41, maxAmount: 80, currency: "USD$", periodicity: "hourly"}}
}

export function parseFilterBody(section: string, item: IAggregatorsType, prev: any) {
  return selector[section](item)
}

