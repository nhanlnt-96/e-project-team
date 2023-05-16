import { Collapse } from 'antd';
import CollapseComp from 'components/collapseComp';
import Loading from 'components/loading';
import Title from 'components/title';
import { useEffectOnce } from 'hooks/useEffectOnce';
import AccountInformation from 'pages/adminPage/accountManagePage/accountDetailPage/AccountInformation';
import ProductFavorite from 'pages/adminPage/accountManagePage/accountDetailPage/ProductFavorite';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { generateUserDataObject } from 'redux/authenticate/utils';
import { getAccountDetailService } from 'services/accountManage';
import { IUserData } from 'services/authenticate';

const { Panel } = Collapse;

const AccountDetailPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accountData, setAccountData] = useState<IUserData | null>(null);

  useEffectOnce(() => {
    setIsLoading(true);

    (async () => {
      try {
        const response = await getAccountDetailService(Number.parseInt(userId as string));
        if (response) {
          setAccountData(generateUserDataObject(response));
        }
      } catch (error) {
        toast.error(error as string);

        navigate('..');
      } finally {
        setIsLoading(false);
      }
    })();
  });

  return !isLoading ? (
    accountData ? (
      <>
        <Title title={`${accountData.fullName}'s profile`} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
        <CollapseComp>
          <Panel header='Account Information' key='1'>
            <AccountInformation userData={accountData} />
          </Panel>
          <Panel header='Product Favorite' key='2'>
            <ProductFavorite userId={Number.parseInt(userId as string)} />
          </Panel>
        </CollapseComp>
      </>
    ) : (
      <></>
    )
  ) : (
    <Loading isLoadingMask />
  );
};

export default AccountDetailPage;
