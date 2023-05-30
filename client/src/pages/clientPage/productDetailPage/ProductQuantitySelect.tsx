import SelectComp, { ISelectCompProps } from 'components/selectComp';
import { AllowNumber } from 'constants/index';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { IProductQuantityData, ISelectData } from 'pages/clientPage/productDetailPage/ProductInformation';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { productDataSelector } from 'redux/productManage/selector';

interface IProps extends ISelectCompProps {
  productId: number;
  netWeightId: number;
  setProductQuantityData?: Dispatch<SetStateAction<IProductQuantityData>>;
}

const ProductQuantitySelect: React.FC<IProps> = ({ productId, netWeightId, setProductQuantityData, ...props }) => {
  const dispatch = useAppDispatch();
  const { productData: allProductsData, isLoading } = useAppSelector(productDataSelector);
  const [quantityOptions, setQuantityOptions] = useState<ISelectData[]>([]);

  const productData = useMemo(() => {
    return allProductsData.find((product) => product.productId === productId);
  }, [allProductsData, productId]);

  useEffectOnce(() => {
    if (!allProductsData.length) dispatch(getAllProductThunk());
  });

  useEffect(() => {
    if (productData?.productQuantityDtoList.length && netWeightId) {
      const productQuantity = productData.productQuantityDtoList.find((item) => item.netWeightDto?.netWeightId === netWeightId);
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
  }, [productData?.productQuantityDtoList, netWeightId]);

  useEffect(() => {
    if (setProductQuantityData) {
      if (quantityOptions.length) {
        setProductQuantityData((prevState) => ({
          ...prevState,
          quantity: quantityOptions[0].value
        }));
      }
    }
  }, [quantityOptions, setProductQuantityData]);

  return <SelectComp {...props} loading={isLoading} options={quantityOptions} />;
};

export default ProductQuantitySelect;
