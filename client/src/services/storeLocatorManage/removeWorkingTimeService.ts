import { STORE_LOCATOR_ENDPOINT } from 'services/storeLocatorManage/configs';
import { axiosInstance } from 'services/utils';

const removeWorkingTimeService = async (storeId: number, workingHourId: number) =>
  await axiosInstance.delete(`${STORE_LOCATOR_ENDPOINT}/remove-store-working-hour`, {
    data: {
      storeId: storeId,
      workingHourId: workingHourId
    }
  });

export default removeWorkingTimeService;
