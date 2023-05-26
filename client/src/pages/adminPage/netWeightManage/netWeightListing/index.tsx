import DataTable from 'components/datatable';
import { useEffectOnce } from 'hooks/useEffectOnce';
import { columns } from 'pages/adminPage/netWeightManage/configs';
import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllNetWeightThunk } from 'redux/netWeightManage/getAllNetWeightSlice';
import { getAllNetWeightSelector } from 'redux/netWeightManage/selector';
import { INetWeightData } from 'services/netWeight';
import { addPropertyKeyToArray } from 'utils/addPropertyKeyToArray';

const NetWeightListing: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, netWeightData } = useAppSelector(getAllNetWeightSelector);

  const netWeightDataTable = useMemo(() => {
    return addPropertyKeyToArray<INetWeightData>(netWeightData, 'netWeightValue');
  }, [netWeightData]);

  useEffectOnce(() => {
    if (!netWeightData.length) dispatch(getAllNetWeightThunk());
  });

  return <DataTable<INetWeightData> data={netWeightDataTable} columns={columns} loading={isLoading} />;
};

export default NetWeightListing;
