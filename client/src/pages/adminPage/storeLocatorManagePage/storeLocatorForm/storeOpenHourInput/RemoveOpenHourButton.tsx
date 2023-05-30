import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import ModalComp from 'components/modalComp';
import { FormikProps } from 'formik';
import _ from 'lodash';
import { IStoreLocatorFormikValues } from 'pages/adminPage/storeLocatorManagePage/storeLocatorForm/useStoreLocatorFormik';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IRemoveWorkingHourPayload, removeWorkingHourThunk } from 'redux/storeLocatorManage/removeWorkingHourSlice';
import { removeWorkingHourSelector } from 'redux/storeLocatorManage/selector';
import { IStoreOpenHourItem } from 'services/storeLocatorManage/types';

interface IProps {
  isDisabled: boolean;
  isHasStoreData: boolean;
  formik: FormikProps<IStoreLocatorFormikValues>;
  itemIndex: number;
}

const RemoveOpenHourButton: React.FC<IProps> = ({ isDisabled, isHasStoreData, formik, itemIndex }) => {
  const { storeId } = useParams();
  const dispatch = useAppDispatch();
  const { isRemoving, isSuccess } = useAppSelector(removeWorkingHourSelector);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) handleCloseModal();
  }, [isSuccess]);
  const handleCloseModal = () => setIsOpen(false);

  const handleRemoveOpenHour = useCallback(() => {
    if (!isHasStoreData || (isHasStoreData && formik.values.storeOpenHours.find((time) => time.index === itemIndex))) {
      const openHourTemp = _.clone(formik.values.storeOpenHours);
      const itemExist = openHourTemp.find((item) => item.index === itemIndex);
      if (itemExist) {
        const indexOfItem = openHourTemp.indexOf(itemExist);

        openHourTemp.splice(indexOfItem, 1);

        formik.setFieldValue('storeOpenHours', openHourTemp);
      }
    } else {
      setIsOpen(true);
    }
  }, [isHasStoreData, itemIndex, formik.values.storeOpenHours]);

  const handleAcceptRemoveWorkingHour = useCallback(() => {
    const storeOpenHours = [...formik.values.storeOpenHours];
    const workingHour: IStoreOpenHourItem = storeOpenHours[itemIndex] as IStoreOpenHourItem;

    const removeParams: IRemoveWorkingHourPayload = {
      workingHourId: workingHour.id,
      storeId: Number.parseInt(storeId as string)
    };

    dispatch(removeWorkingHourThunk(removeParams));
  }, [formik.values.storeOpenHours, itemIndex, storeId]);

  return (
    <>
      <div className='space-y-2 flex flex-col justify-center items-center w-fit'>
        <label className='text-sm text-taupe-gray invisible'>Remove</label>
        <button
          type='button'
          className='text-antd-status-error h-[38px] hover:text-antd-status-error/50'
          disabled={isDisabled}
          onClick={handleRemoveOpenHour}
        >
          {SvgIcons.Trash}
        </button>
      </div>
      <ModalComp onCloseModal={handleCloseModal} isOpenModal={isOpen} title='Remove working hour'>
        <div className='w-full space-y-6'>
          <h6 className='text-lg font-medium text-center'>You are going to delete store working hour. Are you sure you want to delete?</h6>
          <div className='w-full flex justify-center items-center space-x-2'>
            <ButtonComp disabled={isRemoving} className='flex-1' onClick={handleCloseModal}>
              Cancel
            </ButtonComp>
            <ButtonComp loading={isRemoving} isPrimary={false} className='flex-1' onClick={handleAcceptRemoveWorkingHour}>
              Ok
            </ButtonComp>
          </div>
        </div>
      </ModalComp>
    </>
  );
};

export default RemoveOpenHourButton;
