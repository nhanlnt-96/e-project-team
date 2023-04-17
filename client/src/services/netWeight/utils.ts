import _ from 'lodash';
import { INetWeightData } from 'services/netWeight/types';

export const generateNetWeightObject = (data: any): INetWeightData => ({
  netWeightId: _.get(data, 'netWeightId', 0),
  netWeightLabel: _.get(data, 'netWeightLabel', ''),
  netWeightValue: _.get(data, 'netWeightValue', 0)
});
