import { NET_WEIGHT_ENDPOINT } from 'services/netWeight/configs';
import { INetWeightData } from 'services/netWeight/types';
import { axiosInstance } from 'services/utils';

const getAllNetWeightService = async (): Promise<INetWeightData[]> => await axiosInstance.get(`${NET_WEIGHT_ENDPOINT}/get-net-weight`);

export default getAllNetWeightService;
