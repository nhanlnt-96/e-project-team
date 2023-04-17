export interface INetWeightData {
  netWeightId: number;
  netWeightLabel: string;
  netWeightValue: number;
}

export interface ICreateNetWeightData {
  netWeightLabel: string;
  netWeightValue: number;
}

export interface IUpdateNetWeightData {
  netWeightId: number;
  netWeightLabel?: string;
  netWeightValue?: number;
}
