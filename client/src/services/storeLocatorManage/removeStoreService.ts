import { STORE_LOCATOR_ENDPOINT } from 'services/storeLocatorManage/configs';
import { axiosInstance } from 'services/utils';

const removeStoreService = async (storeId: number) => await axiosInstance.delete(`${STORE_LOCATOR_ENDPOINT}/remove-store-locator/${storeId}`);

export default removeStoreService;
