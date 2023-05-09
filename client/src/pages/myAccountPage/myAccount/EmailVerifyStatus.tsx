import { Popover } from 'antd';
import { SvgIcons } from 'assets/icons/svgIcons';
import Loading from 'components/loading';
import GetEmailVerifySuccess from 'pages/myAccountPage/myAccount/GetEmailVerifySuccess';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { getAuthSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';
import { getEmailVerifyTokenService } from 'services/authenticate';

const EmailVerifyStatus: React.FC = () => {
  const { userData } = useAppSelector(getAuthSelector);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const buttonTitle = useMemo(() => {
    return userData?.verifyEmail ? 'Your email is verified' : 'Click to verify you email';
  }, [userData?.verifyEmail]);

  const handleGetEmailVerifyToken = async () => {
    setIsLoading(true);
    try {
      const response = await getEmailVerifyTokenService();
      if (response) {
        setIsOpenModal(true);
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Popover title={buttonTitle} rootClassName='my-account-popover'>
        <button type='button' className='cursor-pointer' onClick={handleGetEmailVerifyToken}>
          {React.cloneElement(SvgIcons.CheckCircle, {
            className: `w-5 h-5 ${userData?.verifyEmail ? 'text-green' : 'text-light-silver'}`
          })}
        </button>
      </Popover>
      {isLoading ? <Loading isLoadingMask /> : <></>}
      <GetEmailVerifySuccess isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </>
  );
};

export default EmailVerifyStatus;
