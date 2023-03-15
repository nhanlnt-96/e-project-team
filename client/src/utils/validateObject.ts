import _ from 'lodash';

export function validateObject<T extends Record<keyof T, any>>(object: T): boolean {
  return !_.isEmpty(object) ? Object.keys(object).every((key: string) => object[key as keyof T]) : false;
}
