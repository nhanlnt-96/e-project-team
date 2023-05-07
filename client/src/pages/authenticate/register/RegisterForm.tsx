import ButtonComp from 'components/buttonComp';
import DobPicker from 'components/dobPicker';
import GenderSelect from 'components/genderSelect';
import InputComp from 'components/inputComp';
import Loading from 'components/loading';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { handleDisplayErrorMsg } from 'helpers/formik';
import RegisterSuccessModal from 'pages/authenticate/register/RegisterSuccessModal';
import { IRegisterFormikValues, useRegisterFormik } from 'pages/authenticate/register/useRegisterFormik';
import React from 'react';
import { Link } from 'react-router-dom';
import { registerThunk } from 'redux/authenticate/registerSlice';
import { registerSelector } from 'redux/authenticate/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IRegisterData } from 'services/authenticate';

dayjs.extend(customParseFormat);

const RegisterForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(registerSelector);

  const handleRegister = (values: IRegisterFormikValues) => {
    const data: IRegisterData = {
      fullName: values.fullName,
      dob: values.dob,
      password: values.password,
      gender: values.gender as number,
      email: values.email,
      phoneNumber: values.phoneNumber,
      confirmPassword: values.confirmPassword
    };

    dispatch(registerThunk(data));
  };
  const formik = useRegisterFormik(handleRegister);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='form-control'>
        <div className='form-item form-item__required'>
          <label htmlFor='fullName'>Full Name</label>
          <InputComp
            type='text'
            placeholder='Full Name'
            id='fullName'
            name='fullName'
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<IRegisterFormikValues>(formik, 'fullName')}
        </div>
        <div className='form-item form-item__required'>
          <label htmlFor='email'>Email</label>
          <InputComp type='email' placeholder='Email' id='email' name='email' value={formik.values.email} onChange={formik.handleChange} />
          {handleDisplayErrorMsg<IRegisterFormikValues>(formik, 'email')}
        </div>
        <div className='form-item form-item__required'>
          <label htmlFor='gender'>Gender</label>
          <GenderSelect id='gender' value={formik.values.gender} onChange={(value) => formik.setFieldValue('gender', value)} />
          {handleDisplayErrorMsg<IRegisterFormikValues>(formik, 'gender')}
        </div>
        <div className='form-item form-item__required'>
          <label htmlFor='dob'>Date of Birth</label>
          <DobPicker id='dob' name='dob' onChange={(_, dateString) => formik.setFieldValue('dob', dateString)} />
          <div className='w-full flex justify-between'>
            {handleDisplayErrorMsg<IRegisterFormikValues>(formik, 'dob')}
            <span className='text-taupe-gray italic text-xs'>*User must be at least 16 years old</span>
          </div>
        </div>
        <div className='form-item form-item__required'>
          <label htmlFor='phoneNumber'>Phone Number</label>
          <InputComp
            type='text'
            placeholder='Phone Number'
            id='phoneNumber'
            name='phoneNumber'
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<IRegisterFormikValues>(formik, 'phoneNumber')}
        </div>
        <div className='form-item form-item__required'>
          <label htmlFor='password'>Password</label>
          <InputComp
            type='password'
            placeholder='Password'
            id='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<IRegisterFormikValues>(formik, 'password')}
        </div>
        <div className='form-item form-item__required'>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <InputComp
            type='password'
            placeholder='Confirm Password'
            id='confirmPassword'
            name='confirmPassword'
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {handleDisplayErrorMsg<IRegisterFormikValues>(formik, 'confirmPassword')}
        </div>
        <div className='w-full flex flex-col space-y-2 justify-center items-center !mt-8'>
          <ButtonComp loading={isLoading} htmlType='submit' isPrimary={false}>
            Register
          </ButtonComp>
          <p>
            Already have an account?{' '}
            <Link to='..' relative='path' className='font-medium hover:link-hover'>
              Login
            </Link>
          </p>
        </div>
      </form>
      {isLoading ? <Loading isLoadingMask /> : <></>}
      <RegisterSuccessModal userPassword={formik.values.password} />
    </>
  );
};

export default RegisterForm;
