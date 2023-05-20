import SelectComp, { ISelectCompProps } from 'components/selectComp';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { IProductQuantityData, ISelectData } from 'pages/clientPage/productDetailPage/ProductInformation';
import React, { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllProductThunk } from 'redux/productManage/getAllProductSlice';
import { productDataSelector } from 'redux/productManage/selector';
import { IProductQuantity } from 'services/product';

interface IProps extends ISelectCompProps {
  productId: number;
  setProductQuantityData?: Dispatch<SetStateAction<IProductQuantityData>>;
}

const ProductNetWeightSelect: React.FC<IProps> = ({ productId, setProductQuantityData, ...props }) => {
  const dispatch = useAppDispatch();
  const { productData: allProductsData, isLoading } = useAppSelector(productDataSelector);
  const [netWeightOptions, setNetWeightOptions] = useState<ISelectData[]>([]);

  const productData = useMemo(() => {
    return allProductsData.find((product) => product.productId === productId);
  }, [allProductsData, productId]);

  useEffectOnce(() => {
    if (!allProductsData.length) dispatch(getAllProductThunk());
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
    if (setProductQuantityData) {
      if (netWeightOptions.length)
        setProductQuantityData((prevState) => ({
          ...prevState,
          netWeightId: netWeightOptions[0].value
        }));
    }
  }, [netWeightOptions, setProductQuantityData]);

  return <SelectComp {...props} loading={isLoading} options={netWeightOptions} />;
};

export default ProductNetWeightSelect;
