import DataTable from 'components/datatable';
import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import AddNewProductButton from 'pages/adminPage/productManagePage/addNewProductPage/AddNewProductButton';
import { columns } from 'pages/adminPage/productManagePage/configs';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { productDataSelector } from 'redux/productManage/selector';
import { IProductData } from 'services/product';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

const ProductListingPage = () => {
  const dispatch = useAppDispatch();
  const { productData, isLoading } = useAppSelector(productDataSelector);

  useEffectOnce(() => {
    if (!productData.length) dispatch(getAllProductThunk());
  });

  return (
    <SectionContainer>
      <Title title={'Product listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
      <div className='w-ful flex justify-end items-center'>
        <AddNewProductButton />
      </div>
      <DataTable<IProductData> loading={isLoading} data={addPropertyKeyToArray<IProductData>(productData, 'productId')} columns={columns} />
    </SectionContainer>
  );
};

export default ProductListingPage;
