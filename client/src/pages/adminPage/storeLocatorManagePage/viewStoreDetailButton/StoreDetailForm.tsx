import ImageResponsive from 'components/imageResponsive';
import React from 'react';
import { IStoreLocatorData } from 'services/storeLocatorManage/types';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  storeData: IStoreLocatorData;
}

const StoreDetailForm: React.FC<IProps> = ({ storeData }) => {
  return (
    <div className='w-full space-y-6'>
      <div className='w-full flex justify-between space-x-2'>
        <p className='text-gray-500 shrink-0'>Store Id</p>
        <p className='text-right'>{storeData.storeId}</p>
      </div>
      <div className='w-full flex flex-col justify-center space-y-2'>
        <p className='text-gray-500 shrink-0'>Store Name</p>
        <p className='text-left'>{storeData.storeName}</p>
      </div>
      <div className='w-full flex flex-col justify-center space-y-2'>
        <p className='text-gray-500 shrink-0'>Address</p>
        <p className='text-left'>{storeData.address}</p>
      </div>
      <div className='w-full flex flex-col justify-center space-y-2'>
        <p className='text-gray-500 shrink-0'>Phone Number</p>
        <p className='text-left'>{storeData.phoneNumber}</p>
      </div>
      {storeData.storeOpenHourDtos.length ? (
        <div className='w-full flex flex-col justify-center space-y-2'>
          <p className='text-gray-500 shrink-0'>Store Working Times</p>
          <table className='table-auto border-collapse border border-black'>
            <thead>
              <tr>
                <th className='border border-black'>Day</th>
                <th className='border border-black'>From Time</th>
                <th className='border border-black'>To Time</th>
              </tr>
            </thead>
            <tbody>
              {storeData.storeOpenHourDtos.map((workingTime) => (
                <tr key={workingTime.id}>
                  <td className='border border-black text-center'>{workingTime.day}</td>
                  <td className='border border-black text-center'>{workingTime.fromTime}</td>
                  <td className='border border-black text-center'>{workingTime.toTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <></>
      )}
      <div className='w-full flex flex-col space-y-2'>
        <p className='text-gray-500 shrink-0'>Store Image</p>
        <div className='w-full'>
          <ImageResponsive
            isPreview
            width={472}
            height={168}
            imageProps={{
              src: imageLinkGeneration(storeData.storeImage, ''),
              alt: 'image-preview',
              imageClassName: '!object-contain'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreDetailForm;
