import ButtonComp from 'components/buttonComp';
import DobPicker, { dobDateFormat } from 'components/dobPicker';
import GenderSelect from 'components/genderSelect';
import InputComp from 'components/inputComp';
import Loading from 'components/loading';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { handleDisplayErrorMsg } from 'helpers/formik';
import EmailVerifyStatus from 'pages/myAccountPage/myAccount/EmailVerifyStatus';
import UpdateAccountSuccess from 'pages/myAccountPage/myAccount/UpdateAccountSuccess';
import { IMyAccountFormik, useMyAccountFormik } from 'pages/myAccountPage/myAccount/useMyAccountFormik';
import React, { useCallback, useEffect, useState } from 'react';
import { getAuthSelector, updateAccountSelector } from 'redux/authenticate/selector';
import { updateAccountThunk } from 'redux/authenticate/updateAccountSlice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IUpdateAccountData, IUserData } from 'services/authenticate';

dayjs.extend(customParseFormat);

const AccountInformation: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userData } = useAppSelector(getAuthSelector);
  const { isLoading, isUpdateSuccess } = useAppSelector(updateAccountSelector);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsEditing(false);
    }
  }, [isUpdateSuccess]);
  const handleToggleEditForm = () => setIsEditing(!isEditing);

  const handleUpdateAccount = useCallback(
    async (values: IMyAccountFormik) => {
      const updateData: IUpdateAccountData = {
        userId: userData?.userId as number
      };
      for (const [key, value] of Object.entries(values)) {
        if (value !== userData?.[key as keyof IUserData]) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          updateData[key as keyof IUpdateAccountData] = value;
        }
      }

      dispatch(updateAccountThunk(updateData));
    },
    [userData]
  );

  const formik = useMyAccountFormik(handleUpdateAccount);

  return (
    <>
      <div className='w-full space-y-8'>
        <h6 className='uppercase font-medium'>PERSONAL INFORMATION</h6>
        <div className='w-full flex justify-between items-center'>
          <p className='text-sm'>*All fields marked with an asterisk are mandatory</p>
          {!isEditing ? (
            <button className='uppercase underline transition-ease-in-out hover:no-underline' onClick={handleToggleEditForm}>
              edit
            </button>
          ) : (
            <></>
          )}
        </div>
        <form onSubmit={formik.handleSubmit} className='form-control'>
          <div className='form-control__inline'>
            <div className='form-item form-item__required'>
              <label htmlFor='fullName'>Full name</label>
              <InputComp
                id='fullName'
                name='fullName'
                placeholder='Full name'
                disabled={!isEditing}
                value={formik.values.fullName}
                onChange={formik.handleChange}
              />
              {handleDisplayErrorMsg<IMyAccountFormik>(formik, 'fullName')}
            </div>
            <div className='form-item'>
              <div className='w-full flex justify-between items-center'>
                <div className='flex space-x-2'>
                  <label htmlFor='email'>Email</label>
                  <EmailVerifyStatus />
                </div>
                <span className='text-sm text-pewter-blue'>(Email can not be changed)</span>
              </div>
              <InputComp id='email' name='email' disabled value={userData?.email} placeholder='Email' />
            </div>
          </div>
          <div className='form-control__inline'>
            <div className='form-item form-item__required'>
              <label htmlFor='gender'>Gender</label>
              <GenderSelect
                id='gender'
                placeholder='Gender'
                disabled={!isEditing}
                value={formik.values.gender}
                onChange={(value) => formik.setFieldValue('gender', value)}
              />
              {handleDisplayErrorMsg<IMyAccountFormik>(formik, 'gender')}
            </div>
            <div className='form-item form-item__required'>
              <label htmlFor='dob'>Date of birth</label>
              <DobPicker
                id='dob'
                name='dob'
                placeholder='Date of birth'
                disabled={!isEditing}
                value={dayjs(formik.values.dob, dobDateFormat)}
                onChange={(_, dateString) => formik.setFieldValue('dob', dateString)}
              />
              {handleDisplayErrorMsg<IMyAccountFormik>(formik, 'dob')}
            </div>
          </div>
          <div className='form-control__inline'>
            <div className='form-item form-item__required'>
              <label htmlFor='phoneNumber'>Phone number</label>
              <InputComp
                id='phoneNumber'
                name='phoneNumber'
                placeholder='Phone number'
                disabled={!isEditing}
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
              {handleDisplayErrorMsg<IMyAccountFormik>(formik, 'phoneNumber')}
            </div>
            <div className='form-item'></div>
          </div>
          <div className='form-item'>
            <label htmlFor='addressDetail'>Address detail</label>
            <InputComp
              id='addressDetail'
              name='addressDetail'
              placeholder='Address detail'
              disabled={!isEditing}
              value={formik.values.addressDetail}
              onChange={formik.handleChange}
            />
            {handleDisplayErrorMsg<IMyAccountFormik>(formik, 'addressDetail')}
          </div>
          {isEditing ? (
            <div className='w-full flex flex-row space-x-2 justify-end items-center !mt-8'>
              <ButtonComp onClick={handleToggleEditForm}>Cancel</ButtonComp>
              <ButtonComp htmlType='submit' isPrimary={false}>
                Save
              </ButtonComp>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
      {isLoading ? <Loading isLoadingMask /> : <></>}
      <UpdateAccountSuccess />
    </>
  );
};

export default AccountInformation;
