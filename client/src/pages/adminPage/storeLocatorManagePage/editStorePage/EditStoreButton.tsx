import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  storeId: number;
}

const EditStoreButton: React.FC<IProps> = ({ storeId }) => {
  const navigate = useNavigate();

  return (
    <ButtonComp isPrimary={true} className='!px-4' onClick={() => navigate(`${RouteBasePath.ADMIN_UPDATE_STORE_LOCATOR_PAGE_BASE_PATH}/${storeId}`)}>
      {SvgIcons.PencilSquare}
    </ButtonComp>
  );
};

export default EditStoreButton;
