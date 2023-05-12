import { Collapse } from 'antd';
import ButtonComp from 'components/buttonComp';
import CollapseComp from 'components/collapseComp';
import InputComp from 'components/inputComp';
import Loading from 'components/loading';
import { PASSWORD_REGEX } from 'constants/index';
import { useFormik } from 'formik';
import { handleDisplayErrorMsg } from 'helpers/formik';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { changePasswordService, IChangePasswordData } from 'services/authenticate';
import * as Yup from 'yup';

interface IChangePasswordValues {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

const { Panel } = Collapse;

const ChangePasswordSection: React.FC = () => {
  const [isUpdatingPassword, setIsUpdatingPassword] = useState<boolean>(false);

  const initialValues: IChangePasswordValues = {
    oldPassword: '',
    password: '',
    confirmPassword: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      oldPassword: Yup.string().trim().required('Please enter your old password'),
      password: Yup.string()
        .trim()
        .required('Please enter your password')
        .matches(
          PASSWORD_REGEX,
          'Password must have: at least 8 characters, maximum 30 characters; at least one uppercase; at least one number; no special character. Please try again'
        ),
      confirmPassword: Yup.string()
        .trim()
        .required('Please enter confirm password')
        .oneOf([Yup.ref('password')], 'Password confirmation does not match')
    }),
    onSubmit: async (values, formikHelpers) => {
      setIsUpdatingPassword(true);
      try {
        const data: IChangePasswordData = {
          oldPassword: values.oldPassword,
          password: values.password,
          confirmPassword: values.confirmPassword
        };
        const response = await changePasswordService(data);
        if (response) {
          formikHelpers.resetForm();

          toast.success('Change password successfully');
        }
      } catch (error) {
        toast.error(error as string);
      } finally {
        setIsUpdatingPassword(false);
      }
    }
  });

  const handleDisableButton = useMemo(() => {
    return !Object.keys(formik.values).every((key) => formik.values[key as keyof IChangePasswordValues]);
  }, [formik]);

  return (
    <>
      <CollapseComp>
        <Panel header='Change password' key='1'>
          <form onSubmit={formik.handleSubmit} className='form-control'>
            <div className='form-item form-item__required w-full md:w-1/2'>
              <label htmlFor='password'>Old Password</label>
              <InputComp
                type='password'
                placeholder='Old Password'
                id='oldPassword'
                name='oldPassword'
                value={formik.values.oldPassword}
                onChange={formik.handleChange}
              />
              {handleDisplayErrorMsg<IChangePasswordValues>(formik, 'oldPassword')}
            </div>

            <div className='form-item form-item__required w-full md:w-1/2'>
              <label htmlFor='password'>Password</label>
              <InputComp
                type='password'
                placeholder='Password'
                id='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
              />
              {handleDisplayErrorMsg<IChangePasswordValues>(formik, 'password')}
            </div>

            <div className='form-item form-item__required w-full md:w-1/2'>
              <label htmlFor='confirmPassword'>Confirm Password</label>
              <InputComp
                type='password'
                placeholder='Confirm Password'
                id='confirmPassword'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
              />
              {handleDisplayErrorMsg<IChangePasswordValues>(formik, 'confirmPassword')}
            </div>

            <div className='w-full flex justify-center items-center'>
              <ButtonComp htmlType='submit' isPrimary={false} loading={isUpdatingPassword} disabled={handleDisableButton}>
                Save
              </ButtonComp>
            </div>
          </form>
        </Panel>
      </CollapseComp>
      {isUpdatingPassword ? <Loading isLoadingMask /> : <></>}
    </>
  );
};

export default ChangePasswordSection;
