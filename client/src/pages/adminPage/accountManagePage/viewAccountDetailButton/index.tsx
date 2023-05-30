import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  accountId: number;
}

const ViewAccountDetailButton: React.FC<IProps> = ({ accountId }) => {
  const navigate = useNavigate();

  const handleOpenAccountDetailPage = useCallback(() => {
    navigate(`${RouteBasePath.ADMIN_ACCOUNT_DETAIL_PAGE_BASE_PATH}/${accountId}`);
  }, [accountId]);

  return (
    <ButtonComp className='!px-4' onClick={handleOpenAccountDetailPage}>
      {SvgIcons.EyeIcon}
    </ButtonComp>
  );
};

export default ViewAccountDetailButton;
