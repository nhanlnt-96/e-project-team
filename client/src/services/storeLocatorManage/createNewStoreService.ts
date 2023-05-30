import { STORE_LOCATOR_ENDPOINT } from 'services/storeLocatorManage/configs';
import { ICreateStoreInfo, ICreateStoreOpenHour } from 'services/storeLocatorManage/types';
import { axiosInstance } from 'services/utils';

const createNewStoreService = async (storeInfo: ICreateStoreInfo, storeOpenHour: ICreateStoreOpenHour[], storeImgFile: File) => {
  const formData = new FormData();

  formData.append('storeInfo', JSON.stringify(storeInfo));

  formData.append('storeOpenHour', JSON.stringify({ storeOpenHours: storeOpenHour }));

  formData.append('storeImgFile', storeImgFile);

  return await axiosInstance.post(`${STORE_LOCATOR_ENDPOINT}/create`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default createNewStoreService;
