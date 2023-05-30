export interface IStoreOpenHourItem {
  id: number;
  day: string;
  fromTime: string;
  toTime: string;
}

export interface IStoreLocatorData {
  storeId: number;
  storeName: string;
  address: string;
  phoneNumber: string;
  storeImage: string;
  storeOpenHourDtos: IStoreOpenHourItem[];
}

export interface ICreateStoreInfo {
  storeName: string;
  address: string;
  phoneNumber: string;
}

export interface ICreateStoreOpenHour {
  day: string;
  fromTime: string;
  toTime: string;
}

export interface IUpdateStoreInfo {
  storeId: number;
  storeName?: string;
  address?: string;
  phoneNumber?: string;
}

export interface IUpdateStoreOpenHour {
  id?: number;
  day?: string;
  fromTime?: string;
  toTime?: string;
}
