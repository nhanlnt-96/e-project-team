import { STORE_LOCATOR_ENDPOINT } from 'services/storeLocatorManage/configs';
import { axiosInstance } from 'services/utils';

const getAllStoreLocatorService = async (): Promise<any> => await axiosInstance.get(`${STORE_LOCATOR_ENDPOINT}/get-all`);

export default getAllStoreLocatorService;
