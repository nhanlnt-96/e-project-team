import Loading from 'components/loading';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import StoreLocatorForm from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm';
import { IStoreLocatorFormikValues } from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/useStoreLocatorFormik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from 'redux/hooks';
import { getAllStoreLocatorThunk } from 'redux/storeLocatorManage/getAllStoreLocatorSlice';
import { createNewStoreService } from 'services/storeLocatorManage';
import { ICreateStoreInfo, ICreateStoreOpenHour } from 'services/storeLocatorManage/types';

const AddNewStorePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCreatingStore, setIsCreatingStore] = useState<boolean>(false);

  const handleCreateNewStoreLocator = async (values: IStoreLocatorFormikValues) => {
    setIsCreatingStore(true);
    try {
      const storeInfo: ICreateStoreInfo = {
        address: values.address,
        storeName: values.storeName,
        phoneNumber: values.phoneNumber
      };
      const storeOpenHour: ICreateStoreOpenHour[] = [];
      for (const item of values.storeOpenHours) {
        storeOpenHour.push({
          day: item.day,
          fromTime: item.fromTime,
          toTime: item.toTime
        });
      }
      const response = await createNewStoreService(storeInfo, storeOpenHour, values.storeImgFile as File);
      if (response) {
        dispatch(getAllStoreLocatorThunk());

        toast.success('Created new store locator');

        navigate(RouteBasePath.ADMIN_STORE_LOCATOR_PAGE_BASE_PATH);
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsCreatingStore(false);
    }
  };

  return (
    <>
      <SectionContainer>
        <Title title={'Add new Store'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
        <StoreLocatorForm isLoading={isCreatingStore} onSubmit={handleCreateNewStoreLocator} />
      </SectionContainer>
      {isCreatingStore ? <Loading isLoadingMask={true} /> : <></>}
    </>
  );
};

export default AddNewStorePage;
