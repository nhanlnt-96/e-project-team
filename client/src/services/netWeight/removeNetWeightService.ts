import { NET_WEIGHT_ENDPOINT } from 'services/netWeight/configs';
import { axiosInstance } from 'services/utils';

const removeNetWeightService = async (netWeightId: number) => {
  return await axiosInstance.delete(`${NET_WEIGHT_ENDPOINT}/remove-net-weight/${netWeightId}`);
};

export default removeNetWeightService;
