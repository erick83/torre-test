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
  compensationrange: (item) => {
    const compArr = item.value.split(/ |-|\//g)
    return { compensationrange: {minAmount: compArr[1], maxAmount: compArr[2], currency: compArr[0], periodicity: compArr[3] }}
  }
}

export function parseFilterBody(section: string, item: IAggregatorsType | undefined, currentBody: any) {
  let body = {}
  let newCurrentBody
  if (item) {
    body = selector[section](item) || {}
    newCurrentBody = currentBody
  } else {
    newCurrentBody = (currentBody && currentBody.any && currentBody.any.filter((item: any) => !item[section])) || {}
  }

  if (isEmpty(newCurrentBody)) {
    return body
  }

  if (currentBody.and) {
    return {
      and: [...newCurrentBody.and, body]
    }
  }

  return {
    and: [newCurrentBody, body]
  }
}

export function compensationrangeToString(compensation: any) {
  return `${compensation.currency} ${compensation.minAmount}-${compensation.maxAmount}/${compensation.periodicity}`
}