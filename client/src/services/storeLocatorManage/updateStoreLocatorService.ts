import { STORE_LOCATOR_ENDPOINT } from 'services/storeLocatorManage/configs';
import { IUpdateStoreInfo, IUpdateStoreOpenHour } from 'services/storeLocatorManage/types';
import { axiosInstance } from 'services/utils';

const updateStoreLocatorService = async (storeInfo: IUpdateStoreInfo, storeOpenHour?: IUpdateStoreOpenHour[] | null, storeImgFile?: File | null) => {
  const formData = new FormData();

  formData.append('storeInfo', JSON.stringify(storeInfo));
  if (storeOpenHour && storeOpenHour.length) formData.append('storeOpenHour', JSON.stringify({ storeOpenHours: storeOpenHour }));
  if (storeImgFile) formData.append('storeImgFile', storeImgFile);

  return await axiosInstance.put(`${STORE_LOCATOR_ENDPOINT}/update-store-locator`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
};

export default updateStoreLocatorService;
