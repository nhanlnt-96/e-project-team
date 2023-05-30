import AddToCartButton from 'components/productCard/AddToCartButton';
import AddToFavoriteButton from 'components/productCard/AddToFavoriteButton';
import ProductNetWeightSelect from 'pages/clientPage/productDetailPage/ProductNetWeightSelect';
import ProductQuantitySelect from 'pages/clientPage/productDetailPage/ProductQuantitySelect';
import React, { useMemo, useState } from 'react';
import { IProductData } from 'services/product';
import { convertPrice } from 'utils/convertPrice';

export interface ISelectData {
  value: number;
  label: string;
}

interface IProps {
  productData: IProductData;
}

export interface IProductQuantityData {
  productId: string;
  quantity: number;
  netWeightId: number;
}

const ProductInformation: React.FC<IProps> = ({ productData }) => {
  const [productQuantityData, setProductQuantityData] = useState<IProductQuantityData>({
    productId: String(productData.productId),
    quantity: 0,
    netWeightId: 0
  });

  const netWeightLabel = useMemo(() => {
    return (
      productData?.productQuantityDtoList.find((item) => item.netWeightDto?.netWeightId === productQuantityData.netWeightId)?.netWeightDto
        ?.netWeightLabel ?? ''
    );
  }, [productData?.productQuantityDtoList, productQuantityData?.netWeightId]);

  const productPrice = useMemo(() => {
    return (
      productData?.productQuantityDtoList.find((item) => item.netWeightDto?.netWeightId === productQuantityData.netWeightId)?.price ??
      productData?.productQuantityDtoList?.[0]?.price
    );
  }, [productData?.productQuantityDtoList, productQuantityData?.netWeightId]);

  const productTotalPrice = useMemo(() => {
    return productPrice * productQuantityData.quantity;
  }, [productPrice, productQuantityData.quantity]);

  return (
    <>
      <div className='w-full'>
        <h1 className='font-bold text-xl uppercase text-secondary sm:text-2xl lg:text-3xl'>{productData.productName}</h1>
        <p className='text-taupe-gray font-playfair-display'>{productData.productId}</p>
      </div>
      <div className='space-y-4'>
        <h6 className='uppercase font-medium text-xs text-secondary sm:text-sm'>{productData.category.categoryName}</h6>
        <h2 className='text-lg font-playfair-display sm:text-xl lg:text-2xl'>
          {convertPrice(productPrice)}{' '}
          {netWeightLabel ? (
            <>
              <span className='text-xs sm:text-sm lg:text-base'>per</span> {netWeightLabel}
            </>
          ) : (
            <></>
          )}
        </h2>
        <div className='w-full flex flex-col space-y-4'>
          <div className='flex flex-wrap gap-3'>
            {productData.productQuantityDtoList.length === 1 &&
            productData.productQuantityDtoList.find((quantity) => quantity.netWeightDto?.netWeightValue === 0) ? (
              <></>
            ) : (
              <div className='flex-1 space-y-2'>
                <label>Net Weight</label>
                <ProductNetWeightSelect
                  productId={productData.productId}
                  setProductQuantityData={setProductQuantityData}
                  value={productQuantityData.netWeightId}
                  onChange={(value) =>
                    setProductQuantityData((prevState) => ({
                      ...prevState,
                      netWeightId: value
                    }))
                  }
                />
              </div>
            )}
            <div className='flex-1 space-y-2'>
              <label>Quantity</label>
              <ProductQuantitySelect
                productId={productData.productId}
                netWeightId={productQuantityData.netWeightId || (productData?.productQuantityDtoList?.[0]?.netWeightDto?.netWeightId as number)}
                setProductQuantityData={setProductQuantityData}
                value={productQuantityData.quantity}
                onChange={(value) =>
                  setProductQuantityData((prevState) => ({
                    ...prevState,
                    quantity: value
                  }))
                }
              />
            </div>
            <div className='flex-2 space-y-2'>
              <label className='invisible'>Total</label>
              <h2 className='text-lg font-playfair-display text-center sm:text-xl lg:text-2xl'>Total {convertPrice(productTotalPrice)}</h2>
            </div>
            <div className='flex-1 space-y-2'>
              <label className='hidden sm:block sm:invisible'>Add to cart</label>
              <AddToCartButton productData={productData} isButton={true} quantity={productQuantityData.quantity} />
            </div>
          </div>
          <div className='w-full flex justify-center items-center sm:justify-start'>
            <AddToFavoriteButton productId={productData.productId} variant='text' />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductInformation;
