import { NET_WEIGHT_ENDPOINT } from 'services/netWeight/configs';
import { IUpdateNetWeightData } from 'services/netWeight/types';
import { axiosInstance } from 'services/utils';

const updateNetWeightService = async (data: IUpdateNetWeightData) => {
  return await axiosInstance.put(`${NET_WEIGHT_ENDPOINT}/update-net-weight`, data);
};

export default updateNetWeightService;
