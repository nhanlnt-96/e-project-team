import { NET_WEIGHT_ENDPOINT } from 'services/netWeight/configs';
import { ICreateNetWeightData } from 'services/netWeight/types';
import { axiosInstance } from 'services/utils';

const createNewNetWeightService = async (data: ICreateNetWeightData) => {
  return await axiosInstance.post(`${NET_WEIGHT_ENDPOINT}/create-net-weight`, {
    netWeightLabel: data.netWeightLabel,
    netWeightValue: data.netWeightValue
  });
};

export default createNewNetWeightService;
