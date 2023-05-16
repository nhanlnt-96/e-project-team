import ButtonComp from 'components/buttonComp';
import DobPicker, { dobDateFormat } from 'components/dobPicker';
import GenderSelect from 'components/genderSelect';
import InputComp from 'components/inputComp';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { handleDisplayErrorMsg } from 'helpers/formik';
import RoleSelect from 'pages/adminPage/accountManagePage/accountInfoForm/RoleSelect';
import { IAccountInFoValues, useAccountInfoFormik } from 'pages/adminPage/accountManagePage/accountInfoForm/useAccountInfoFormik';
import React, { useMemo } from 'react';
import { IUserData } from 'services/authenticate';

dayjs.extend(customParseFormat);

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onFormSubmit?: (values: IAccountInFoValues) => void;
  userData?: IUserData;
}

const AccountInfoForm: React.FC<IProps> = ({ onFormSubmit, userData }) => {
  const formik = useAccountInfoFormik(onFormSubmit, userData);

  const formItemClassName = useMemo(() => {
    return userData ? 'form-item' : 'form-item form-item__required';
  }, [userData]);

  return (
    <form onSubmit={formik.handleSubmit} className='form-control'>
      <div className='form-control__inline'>
        <div className={formItemClassName}>
          <label htmlFor='fullName'>Full Name</label>
          <InputComp
            type='text'
            placeholder='Full Name'
            id='fullName'
            name='fullName'
            disabled={Boolean(userData)}
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<IAccountInFoValues>(formik, 'fullName')}
        </div>
        <div className={formItemClassName}>
          {userData ? (
            <div className='flex justify-between'>
              <label htmlFor='email'>Email</label>
              userData.verifyEmail === VerifyEmailStatus.VERIFIED_EMAIL ? (<span className='font-medium block text-green'>Email is verified</span>) :
              (<span className='font-medium block text-antd-status-warning'>Email is not verified</span>)
            </div>
          ) : (
            <label htmlFor='email'>Email</label>
          )}
          <InputComp
            type='email'
            placeholder='Email'
            id='email'
            name='email'
            disabled={Boolean(userData)}
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<IAccountInFoValues>(formik, 'email')}
        </div>
      </div>
      <div className='form-control__inline'>
        <div className={formItemClassName}>
          <label htmlFor='gender'>Gender</label>
          <GenderSelect
            id='gender'
            value={formik.values.gender}
            disabled={Boolean(userData)}
            onChange={(value) => formik.setFieldValue('gender', value)}
          />
          {handleDisplayErrorMsg<IAccountInFoValues>(formik, 'gender')}
        </div>
        <div className={formItemClassName}>
          <label htmlFor='dob'>Date of Birth</label>
          {!userData ? (
            <DobPicker id='dob' name='dob' onChange={(_, dateString) => formik.setFieldValue('dob', dateString)} />
          ) : (
            <DobPicker id='dob' name='dob' disabled={Boolean(userData)} value={dayjs(formik.values.dob, dobDateFormat)} />
          )}
          <div className='w-full flex justify-between'>
            {handleDisplayErrorMsg<IAccountInFoValues>(formik, 'dob')}
            <span className='text-taupe-gray italic text-xs'>*User must be at least 16 years old</span>
          </div>
        </div>
      </div>
      <div className='form-control__inline'>
        <div className={formItemClassName}>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <InputComp
            type='text'
            placeholder='Phone Number'
            id='phoneNumber'
            name='phoneNumber'
            disabled={Boolean(userData)}
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<IAccountInFoValues>(formik, 'phoneNumber')}
        </div>
        <div className={formItemClassName}>
          <label htmlFor='addressDetail'>Address detail</label>
          <InputComp
            id='addressDetail'
            name='addressDetail'
            placeholder='Address detail'
            disabled={Boolean(userData)}
            value={formik.values.addressDetail}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<IAccountInFoValues>(formik, 'addressDetail')}
        </div>
      </div>
      <div className='form-control__inline'>
        <div className='form-item'>
          <label htmlFor='roleName'>Role</label>
          <RoleSelect
            id='roleName'
            value={formik.values.roleName}
            disabled={Boolean(userData)}
            onChange={(value) => formik.setFieldValue('roleName', value)}
          />
          {handleDisplayErrorMsg<IAccountInFoValues>(formik, 'roleName')}
        </div>
        <div className={formItemClassName}>
          {!userData ? (
            <>
              <label htmlFor='password'>Password</label>
              <InputComp
                type='password'
                placeholder='Password'
                id='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {handleDisplayErrorMsg<IAccountInFoValues>(formik, 'password')}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      {!userData ? (
        <div className='w-full flex flex-col space-y-2 justify-center items-center !mt-8'>
          <ButtonComp htmlType='submit' isPrimary={false}>
            Add account
          </ButtonComp>
        </div>
      ) : (
        <></>
      )}
    </form>
  );
};

export default AccountInfoForm;
