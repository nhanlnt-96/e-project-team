import { SvgIcons } from 'assets/icons/svgIcons';
import InputComp from 'components/inputComp';
import { useFormik } from 'formik';
import { handleDisplayErrorMsg } from 'helpers/formik';
import React, { useCallback, useRef } from 'react';
import * as Yup from 'yup';

interface ISearchInputFormik {
  keyword: string;
}

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (keyword: string) => void;
}

const SearchInput: React.FC<IProps> = ({ onSearch }) => {
  const iconRef = useRef<HTMLDivElement>(null);

  const initialValues: ISearchInputFormik = {
    keyword: ''
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      keyword: Yup.string().trim().required('Please enter keyword for searching')
    }),
    onSubmit: (values) => onSearch(values.keyword)
  });
  const handleClearKeyword = useCallback(() => formik.resetForm(), [formik.values.keyword]);

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='w-full max-w-2xl mx-auto'>
        <div className='w-full relative'>
          <InputComp
            placeholder='Search'
            className='pr-14 sm:pr-16'
            id='keyword'
            name='keyword'
            value={formik.values.keyword}
            onChange={formik.handleChange}
          />
          <div ref={iconRef} className='absolute text-black flex justify-center items-center top-1/2 -translate-y-1/2 space-x-2 right-2 sm:right-4'>
            {formik.values.keyword ? (
              <button type='button' className='w-5 h-5 outline-none focus:ring-0 hover:text-antd-status-warning' onClick={handleClearKeyword}>
                {React.cloneElement(SvgIcons.XMark, {
                  className: 'w-full h-full'
                })}
              </button>
            ) : (
              <></>
            )}
            <button type='submit' className='w-5 h-5 outline-none focus:ring-0'>
              {React.cloneElement(SvgIcons.MagnifyingGlass, { className: 'w-5 h-5 cursor-pointer' })}
            </button>
          </div>
        </div>
        {handleDisplayErrorMsg<ISearchInputFormik>(formik, 'keyword')}
      </form>
    </>
  );
};

export default SearchInput;
