import _ from 'lodash';
import { IStoreLocatorData, IStoreOpenHourItem } from 'services/storeLocatorManage/types';

export const generateStoreOpenHourObjectData = (data: any): IStoreOpenHourItem => ({
  id: _.get(data, 'id', ''),
  day: _.get(data, 'day', ''),
  fromTime: _.get(data, 'fromTime', ''),
  toTime: _.get(data, 'toTime', '')
});

export const generateStoreLocatorObjectData = (data: any): IStoreLocatorData => ({
  storeId: _.get(data, 'id', ''),
  storeName: _.get(data, 'storeName', ''),
  address: _.get(data, 'address', ''),
  phoneNumber: _.get(data, 'phoneNumber', ''),
  storeImage: _.get(data, 'storeImage', ''),
  storeOpenHourDtos: data?.storeOpenHourDtos?.length ? data.storeOpenHourDtos.map((item: any) => generateStoreOpenHourObjectData(item)) : []
});
