import Loading from 'components/loading';
import PageContainer from 'components/pageContainer';
import ProductCard from 'components/productCard';
import Title from 'components/title';
import SearchInput from 'pages/clientPage/searchPage/SearchInput';
import React, { useState } from 'react';
import { generateProductDataObject } from 'redux/productManage/utils';
import { IProductData, productSearchByNameService } from 'services/product';

const SearchPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSearchComplete, setIsSearchComplete] = useState<boolean>(false);
  const [productSearchData, setProductSearchData] = useState<IProductData[]>([]);

  const handleSearchProduct = async (keyword: string) => {
    setIsLoading(true);

    setIsSearchComplete(false);
    try {
      const response = await productSearchByNameService(keyword);
      const productDataTemp: IProductData[] = [];
      if (response.length) {
        for (const product of response) {
          productDataTemp.push(generateProductDataObject(product));
        }
      }

      setProductSearchData(productDataTemp);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearchComplete(true);

      setIsLoading(false);
    }
  };

  return (
    <>
      <PageContainer isWideScreen={false} pageContainerClassName='space-y-14'>
        <div className='w-full space-y-6 sm:space-y-10'>
          <Title title='Search' titleClassName='text-white' />
          <SearchInput onSearch={handleSearchProduct} />
        </div>
        {isSearchComplete ? (
          <div className='w-full space-y-6'>
            {productSearchData.length ? (
              <div className='space-y-6'>
                <Title subtitle='Search result' subTitleClassName='uppercase text-xl font-medium' />
                <div className='w-full grid grid-cols-1 justify-center items-center text-white gap-x-8 gap-y-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'>
                  {productSearchData.map((product) => (
                    <ProductCard key={product.productId} productData={product} />
                  ))}
                </div>
              </div>
            ) : (
              <p className='text-white text-center'>No Products Found</p>
            )}
          </div>
        ) : (
          <></>
        )}
      </PageContainer>
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default SearchPage;
