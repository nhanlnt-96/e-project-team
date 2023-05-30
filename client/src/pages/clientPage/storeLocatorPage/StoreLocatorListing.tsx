import ImageResponsive from 'components/imageResponsive';
import Loading from 'components/loading';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { useCallback, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllStoreLocatorThunk } from 'redux/storeLocatorManage/getAllStoreLocatorSlice';
import { getAllStoreLocatorSelector } from 'redux/storeLocatorManage/selector';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

const StoreLocatorListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, storeLocatorData } = useAppSelector(getAllStoreLocatorSelector);
  const [isReadMore, setIsReadMore] = useState<number>(0);
  const [isViewingStore, setIsViewingStore] = useState<number>(0);

  useEffectOnce(() => {
    if (!storeLocatorData.length) dispatch(getAllStoreLocatorThunk());
  });
  const handleReadStoreInfo = useCallback((storeId: number) => (isReadMore ? setIsReadMore(0) : setIsReadMore(storeId)), [isReadMore]);
  const handleViewStore = (storeId: number) => setIsViewingStore(storeId);

  const viewingStoreData = useMemo(() => {
    return storeLocatorData.find((store) => store.storeId === isViewingStore);
  }, [isViewingStore]);

  console.log(viewingStoreData);

  return (
    <>
      <div className='w-full flex justify-center items-center bg-white px-6 py-12 flex-col-reverse sm:space-y-6 sm:flex-col md:space-x-4 md:space-y-0 md:flex-row store-locator__listing'>
        <div className='w-full px-2 overflow-y-auto max-h-96 mt-6 sm:mt-0 md:w-1/2 md:max-h-[500px]'>
          {storeLocatorData.length ? (
            storeLocatorData.map((store) => (
              <div
                key={store.storeId}
                className={`w-full p-4 border-t border-black/80 cursor-pointer first:border-t-0 ${
                  isViewingStore === store.storeId ? 'bg-taupe-gray/10' : ''
                }`}
                onClick={() => handleViewStore(store.storeId)}
              >
                <h6 className='font-medium text-lg'>{store.storeName}</h6>
                <div className='w-full space-y-2'>
                  <p>
                    <span className='font-medium'>Address: </span>
                    {store.address}
                  </p>
                  <p>
                    <span className='font-medium'>Tel: </span>
                    {store.phoneNumber}
                  </p>
                  {isReadMore === store.storeId ? (
                    <div className='w-full'>
                      <span className='font-medium'>Opening Hours: </span>
                      <ul className='list-disc list-inside'>
                        {store.storeOpenHourDtos.map((workingTime) => (
                          <li key={workingTime.id}>
                            {workingTime.day}: {workingTime.fromTime} - {workingTime.toTime}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <></>
                  )}
                  <div className='flex justify-end items-center'>
                    <button
                      className='outline-none uppercase underline mt-4 ml-auto text-sm spacing-4 transition duration-100 ease-in-out focus:ring-0 hover:no-underline about-us-page__item-btn'
                      onClick={() => handleReadStoreInfo(store.storeId)}
                    >
                      {!(isReadMore === store.storeId) ? 'Read More' : 'Read Less'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
        <div className='w-full md:w-1/2'>
          {viewingStoreData ? (
            <ImageResponsive
              width={576}
              height={506}
              imageProps={{
                src: imageLinkGeneration(viewingStoreData?.storeImage as string, ''),
                alt: viewingStoreData?.storeName
              }}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default StoreLocatorListing;
