import _ from 'lodash';

export function addPropertyKeyToArray<T>(arrayData: T[], nameValueProperty: string): (T & { key: string })[] {
  return arrayData.map((item: T) => ({
    ...item,
    key: String(_.get(item, nameValueProperty, ''))
  }));
}
