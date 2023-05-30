import SelectComp, { ISelectCompProps } from 'components/selectComp';
import { Roles } from 'constants/index';
import React, { useMemo } from 'react';

interface IProps extends ISelectCompProps {}

const RoleSelect: React.FC<IProps> = ({ ...props }) => {
  const roleOptions = useMemo(() => {
    return [
      {
        value: Roles.USER_ROLE,
        label: 'User'
      },
      {
        value: Roles.EDITOR_ROLE,
        label: 'Editor'
      },
      {
        value: Roles.ADMIN_ROLE,
        label: 'Admin'
      }
    ];
  }, []);

  return <SelectComp {...props} value={props.value.replace('[', '').replace(']', '')} options={roleOptions} placeholder='select role' />;
};

export default RoleSelect;
