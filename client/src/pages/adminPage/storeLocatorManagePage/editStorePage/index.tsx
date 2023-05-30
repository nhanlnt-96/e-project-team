import { SvgIcons } from 'assets/icons/svgIcons';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import { useEffectOnce } from 'hooks/useEffectOnce';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import StoreLocatorForm from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm';
import { IStoreLocatorFormikValues } from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/useStoreLocatorFormik';
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { updateProductSelector } from 'redux/productManage/selector';
import { getStoreByIdThunk } from 'redux/storeLocatorManage/getStoreByIdSlice';
import { getStoreLocatorByIdSelector } from 'redux/storeLocatorManage/selector';
import { IUpdateStorePayload, updateStoreLocatorThunk } from 'redux/storeLocatorManage/updateStoreLocatorSlice';
import { IUpdateStoreInfo, IUpdateStoreOpenHour } from 'services/storeLocatorManage/types';

const EditStorePage = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading: isFetchingStoreData, storeData } = useAppSelector(getStoreLocatorByIdSelector);
  const { isUpdating } = useAppSelector(updateProductSelector);

  useEffectOnce(() => {
    dispatch(getStoreByIdThunk(Number.parseInt(storeId as string)));
  });

  const handleUpdateStore = useCallback(
    async (values: IStoreLocatorFormikValues) => {
      if (storeData) {
        const storeInfo: IUpdateStoreInfo = {
          storeId: storeData.storeId as number
        };
        if (values.storeName !== storeData.storeName) storeInfo.storeName = values.storeName;
        if (values.address !== storeInfo.address) storeInfo.address = values.address;
        if (values.phoneNumber !== storeInfo.phoneNumber) storeInfo.phoneNumber = values.phoneNumber;

        const workingHour: IUpdateStoreOpenHour[] = [];
        for (const time of values.storeOpenHours) {
          const workingHourObject: IUpdateStoreOpenHour = {
            day: time.day,
            fromTime: time.fromTime,
            toTime: time.toTime
          };
          if ('id' in time) workingHourObject.id = time.id as unknown as number;

          workingHour.push(workingHourObject);
        }
        if (Object.keys(storeData).length > 1) {
          const payload: IUpdateStorePayload = {
            storeInfo: storeInfo,
            storeOpenHour: workingHour
          };
          if (values.storeImgFile !== null) payload.storeImgFile = values.storeImgFile;

          dispatch(updateStoreLocatorThunk(payload));
        }
      }
    },
    [storeData]
  );

  const handleGoToPrevPage = () => navigate(RouteBasePath.ADMIN_STORE_LOCATOR_PAGE_BASE_PATH);

  return !isFetchingStoreData ? (
    <>
      <SectionContainer>
        <Title title={'Update Store Locator'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
        {storeData ? (
          <StoreLocatorForm isLoading={isUpdating} onSubmit={handleUpdateStore} storeData={storeData} />
        ) : (
          <ModalComp onCloseModal={handleGoToPrevPage} isOpenModal={true}>
            <div className='w-full flex flex-col justify-center items-center space-y-2'>
              {React.cloneElement(SvgIcons.XCircle, { className: 'text-red-700 w-10 h-10' })}
              <h6 className='text-lg font-medium'>Store not found</h6>
            </div>
          </ModalComp>
        )}
      </SectionContainer>
    </>
  ) : (
    <Loading />
  );
};

export default EditStorePage;
