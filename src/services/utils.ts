import { capitalize } from 'lodash'
import { IAggregatorsType } from "../models/store.interfaces";

export function aggTypesStringFormat(item: IAggregatorsType = { value: '', total: 0 }) {
  const text = capitalize(item.value.replace(/-/g, ' '))
  return `${text} - ${item.total}`
}
