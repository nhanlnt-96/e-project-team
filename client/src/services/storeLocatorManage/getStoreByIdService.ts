import { STORE_LOCATOR_ENDPOINT } from 'services/storeLocatorManage/configs';
import { axiosInstance } from 'services/utils';

const getStoreByIdService = async (storeId: number): Promise<any> => await axiosInstance.get(`${STORE_LOCATOR_ENDPOINT}/get-store-by-id/${storeId}`);

export default getStoreByIdService;
