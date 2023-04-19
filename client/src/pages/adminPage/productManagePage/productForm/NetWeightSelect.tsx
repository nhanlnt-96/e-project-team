import SelectComp, { ISelectCompProps } from 'components/selectComp';
import { useProductFormContext } from 'context/index';
import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNetWeightThunk } from 'redux/netWeightManage/getAllNetWeightSlice';
import { getAllNetWeightSelector } from 'redux/netWeightManage/selector';

interface IProps extends ISelectCompProps {}

interface INetWeightSelect {
  value: number;
  label: string;
  disabled?: boolean;
}

const NetWeightSelect: React.FC<IProps> = ({ ...props }) => {
  const dispatch = useAppDispatch();
  const { isLoading, netWeightData } = useAppSelector(getAllNetWeightSelector);
  const { formik } = useProductFormContext();

  useEffectOnce(() => {
    if (!netWeightData.length) dispatch(getAllNetWeightThunk());
  });

  const netWeightSelect = useMemo(() => {
    const netWeightSelectData: INetWeightSelect[] = [
      {
        value: 0,
        label: 'Select net weight',
        disabled: true
      }
    ];

    for (const netWeight of netWeightData) {
      netWeightSelectData.push({
        value: netWeight.netWeightId,
        label: netWeight.netWeightLabel,
        disabled: Boolean(formik?.values.productQuantityList.find((quantity) => quantity.netWeightId === netWeight.netWeightId))
      });
    }

    return netWeightSelectData;
  }, [netWeightData]);

  return <SelectComp {...props} loading={isLoading} options={netWeightSelect} />;
};

export default NetWeightSelect;
