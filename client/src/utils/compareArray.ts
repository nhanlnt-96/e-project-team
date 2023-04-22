import _ from 'lodash';

export function compareArray<T>(array1: T[], array2: T[]): boolean {
  return _(array1).differenceWith(array2, _.isEqual).isEmpty();
}
