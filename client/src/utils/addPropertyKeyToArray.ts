import _ from 'lodash';

export function addPropertyKeyToArray<T>(arrayData: T[], nameValueProperty: keyof T): (T & { key: string })[] {
  return arrayData.map((item: T) => ({
    ...item,
    key: String(_.get(arrayData, nameValueProperty, ''))
  }));
}
