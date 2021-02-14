import { isEmpty } from 'lodash'
import { IAggregatorsType } from "../models/store.interfaces"

interface ISelector {
  [type: string]: (value: IAggregatorsType) => any
}

const selector: ISelector = {
  type: (item) => ({ type: { code: item.value }}),
  status: (item) => ({ status: { code: item.value }}),
  remote: (item) => ({ remote: { term: item.value === 'yes' }}),
  organization: (item) => ({ organization: {term: item.value }}),
  skill: (item) => ({ skill: { term: item.value, experience: "potential-to-develop" }}),
  // {compensationrange: {minAmount: 41, maxAmount: 80, currency: "USD$", periodicity: "hourly"}}
}

export function parseFilterBody(section: string, item: IAggregatorsType | undefined, currentBody: any) {
  const body = item ? selector[section](item) : {}

  if (isEmpty(currentBody)) {
    return body
  }

  if (currentBody.and) {
    return {
      and: [...currentBody.and, body]
    }
  }

  return {
    and: [currentBody, body]
  }
}
