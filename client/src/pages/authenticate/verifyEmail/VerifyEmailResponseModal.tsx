import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import Loading from 'components/loading';
import ModalComp from 'components/modalComp';
import Title from 'components/title';
import GetEmailVerifySuccess from 'pages/myAccountPage/myAccount/GetEmailVerifySuccess';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { verifyEmailSelector } from 'redux/authenticate/selector';
import { useAppSelector } from 'redux/hooks';
import { getEmailVerifyTokenService } from 'services/authenticate';

const VerifyEmailResponseModal: React.FC = () => {
  const navigate = useNavigate();
  const { isVerifySuccess, error } = useAppSelector(verifyEmailSelector);
  const [isOpenVerifyModal, setIsOpenVerifyModal] = useState<boolean>(false);
  const [isOpenGetVerifyEmailModal, setIsOpenGetVerifyEmailModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isVerifySuccess || error) setIsOpenVerifyModal(true);
  }, [isVerifySuccess, error]);

  const handleCloseVerifyResponseModal = () => {
    navigate('/');

    setIsOpenVerifyModal(false);
  };

  const handleGetEmailVerifyToken = async () => {
    setIsLoading(true);
    try {
      const response = await getEmailVerifyTokenService();
      if (response) {
        setIsOpenGetVerifyEmailModal(true);
      }
    } catch (error) {
      toast.error(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseGetEmailVerifyTokenModal = () => {
    navigate('/');

    setIsOpenGetVerifyEmailModal(false);
  };

  return (
    <>
      <ModalComp onCloseModal={handleCloseVerifyResponseModal} isOpenModal={isOpenVerifyModal}>
        <div className='w-full flex flex-col justify-center items-center space-y-6'>
          {isVerifySuccess ? React.cloneElement(SvgIcons.CheckCircle, { className: 'text-green mx-auto w-10 h-10 sm:w-20 sm:h-20' }) : <></>}
          {error ? React.cloneElement(SvgIcons.XCircle, { className: 'text-antd-status-error mx-auto w-10 h-10 sm:w-20 sm:h-20' }) : <></>}
          <Title
            variant='h6'
            title={(isVerifySuccess ? 'Verified email successfully!' : error && 'Your email is not verified!') as string}
            subtitle={
              (isVerifySuccess ? 'You have successfully verified email' : error && 'Click on re-send button to get new verification link.') as string
            }
            titleClassName='text-black'
            subTitleClassName='text-black'
            rootClassName='space-y-4'
          />
          <div className='w-full flex justify-center items-center flex-col space-y-2 md:flex-row md:space-x-4 md:space-y-0'>
            <ButtonComp onClick={handleCloseVerifyResponseModal} className='w-full md:w-fit'>
              Close
            </ButtonComp>
            {error ? (
              <ButtonComp isPrimary={false} loading={isLoading} onClick={handleGetEmailVerifyToken}>
                Re-send new verify email link
              </ButtonComp>
            ) : (
              <></>
            )}
          </div>
        </div>
      </ModalComp>
      <GetEmailVerifySuccess isOpen={isOpenGetVerifyEmailModal} onClose={handleCloseGetEmailVerifyTokenModal} />
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default VerifyEmailResponseModal;
