import SelectComp, { ISelectCompProps } from 'components/selectComp';
import { Gender } from 'constants/index';
import React, { useMemo } from 'react';

interface IProps extends ISelectCompProps {}

const GenderSelect: React.FC<IProps> = ({ ...props }) => {
  const genderOptions = useMemo(() => {
    return [
      {
        value: Gender.FEMALE,
        label: 'Female'
      },
      {
        value: Gender.MALE,
        label: 'Male'
      }
    ];
  }, []);

  return <SelectComp {...props} options={genderOptions} placeholder='select gender' />;
};

export default GenderSelect;
