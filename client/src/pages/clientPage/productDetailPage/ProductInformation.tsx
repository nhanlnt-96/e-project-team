import ButtonComp from 'components/buttonComp';
import AddToFavoriteButton from 'components/productCard/AddToFavoriteButton';
import SelectComp from 'components/selectComp';
import { AllowNumber } from 'constants/index';
import React, { useEffect, useMemo, useState } from 'react';
import { IProductData, IProductQuantity } from 'services/product';
import { convertPrice } from 'utils/convertPrice';

interface ISelectData {
  value: number;
  label: string;
}

interface IProps {
  productData: IProductData;
}

const ProductInformation: React.FC<IProps> = ({ productData }) => {
  const [netWeightOptions, setNetWeightOptions] = useState<ISelectData[]>([]);
  const [quantityOptions, setQuantityOptions] = useState<ISelectData[]>([]);

  const [productQuantityData, setProductQuantityData] = useState<{
    productId: string;
    quantity: number;
    netWeightId: number;
  }>({
    productId: String(productData.productId),
    quantity: 0,
    netWeightId: 0
  });

  useEffect(() => {
    if (productData?.productQuantityDtoList.length) {
      const netWeights: ISelectData[] = [];
      for (const item of productData.productQuantityDtoList as IProductQuantity[]) {
        netWeights.push({
          value: item.netWeightDto?.netWeightId as number,
          label: item.netWeightDto?.netWeightLabel as string
        });
      }

      setNetWeightOptions(netWeights);
    }
  }, [productData?.productQuantityDtoList]);

  useEffect(() => {
    if (netWeightOptions.length)
      setProductQuantityData((prevState) => ({
        ...prevState,
        netWeightId: netWeightOptions[0].value
      }));
  }, [netWeightOptions]);

  useEffect(() => {
    if (productData?.productQuantityDtoList.length && productQuantityData.netWeightId) {
      const productQuantity = productData.productQuantityDtoList.find((item) => item.netWeightDto?.netWeightId === productQuantityData.netWeightId);
      if (productQuantity) {
        const quantities: ISelectData[] = [];
        for (let i = 0; i < productQuantity.quantity; i++) {
          const value = i + 1;
          if (value <= AllowNumber.MAXIMUM_QUANTITY_SELECT) {
            quantities.push({
              value: value,
              label: String(value)
            });
          }
        }

        setQuantityOptions(quantities);
      }
    }
  }, [productData?.productQuantityDtoList, productQuantityData.netWeightId]);

  useEffect(() => {
    if (quantityOptions.length) {
      setProductQuantityData((prevState) => ({
        ...prevState,
        quantity: quantityOptions[0].value
      }));
    }
  }, [quantityOptions]);

  const netWeightLabel = useMemo(() => {
    return (
      productData?.productQuantityDtoList.find((item) => item.netWeightDto?.netWeightId === productQuantityData.netWeightId)?.netWeightDto
        ?.netWeightLabel ?? ''
    );
  }, [productData?.productQuantityDtoList, productQuantityData?.netWeightId]);

  const productPrice = useMemo(() => {
    return productData?.productQuantityDtoList.find((item) => item.netWeightDto?.netWeightId === productQuantityData.netWeightId)?.price ?? 0;
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
          {convertPrice(productPrice)} <span className='text-xs sm:text-sm lg:text-base'>per</span> {netWeightLabel}
        </h2>
        <div className='w-full flex flex-col space-y-4'>
          <div className='flex flex-wrap gap-3'>
            <div className='flex-1 space-y-2'>
              <label>Net Weight</label>
              <SelectComp
                value={productQuantityData.netWeightId}
                options={netWeightOptions}
                onChange={(value) =>
                  setProductQuantityData((prevState) => ({
                    ...prevState,
                    netWeightId: value
                  }))
                }
              />
            </div>
            <div className='flex-1 space-y-2'>
              <label>Quantity</label>
              <SelectComp
                value={productQuantityData.quantity}
                options={quantityOptions}
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
              <ButtonComp className='mx-auto'>Add to Cart</ButtonComp>
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
