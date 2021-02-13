import { capitalize } from 'lodash'
import { IAggregatorsType } from "../models/store.interfaces";

export function aggTypesStringFormat(item: IAggregatorsType = { value: '', total: 0 }) {
  const text = snakeTypesStringParse(item.value)
  return `${text} - ${item.total}`
}

export function snakeTypesStringParse(s: string = '') {
  return capitalize(s.replace(/-/g, ' '))
}
