import React from 'react';
import { INetWeightData } from 'services/netWeight';

interface IProps {
  netWeightData: INetWeightData;
}

const NetWeightDetailForm: React.FC<IProps> = ({ netWeightData }) => {
  return (
    <div className='w-full space-y-6'>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Net Weight Id</p>
        <p className='text-right'>{netWeightData.netWeightId}</p>
      </div>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Net Weight Label</p>
        <p className='text-right'>{netWeightData.netWeightLabel}</p>
      </div>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Net Weight Value</p>
        <p className='text-right'>{netWeightData.netWeightValue}</p>
      </div>
    </div>
  );
};

export default NetWeightDetailForm;
