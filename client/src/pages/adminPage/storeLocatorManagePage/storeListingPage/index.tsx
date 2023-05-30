import DataTable from 'components/datatable';
import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import AddNewStoreButton from 'pages/adminPage/storeLocatorManagePage/addNewStorePage/AddNewStoreButton';
import { columns } from 'pages/adminPage/storeLocatorManagePage/configs';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllStoreLocatorThunk } from 'redux/storeLocatorManage/getAllStoreLocatorSlice';
import { getAllStoreLocatorSelector } from 'redux/storeLocatorManage/selector';
import { IStoreLocatorData } from 'services/storeLocatorManage/types';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

const StoreListingPage = () => {
  const dispatch = useAppDispatch();
  const { storeLocatorData, isLoading } = useAppSelector(getAllStoreLocatorSelector);

  useEffectOnce(() => {
    if (!storeLocatorData.length) dispatch(getAllStoreLocatorThunk());
  });

  return (
    <SectionContainer>
      <Title title={'Store Locator listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
      <div className='w-ful flex justify-end items-center'>
        <AddNewStoreButton />
      </div>
      <DataTable<IStoreLocatorData>
        loading={isLoading}
        data={addPropertyKeyToArray<IStoreLocatorData>(storeLocatorData, 'storeId')}
        columns={columns}
      />
    </SectionContainer>
  );
};

export default StoreListingPage;
