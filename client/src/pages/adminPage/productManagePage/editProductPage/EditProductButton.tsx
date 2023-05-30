import { SvgIcons } from 'assets/icons/svgIcons';
import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  productId: number;
}

const EditProductButton: React.FC<IProps> = ({ productId }) => {
  const navigate = useNavigate();

  return (
    <ButtonComp isPrimary={true} className='!px-4' onClick={() => navigate(`${RouteBasePath.ADMIN_UPDATE_PRODUCT_PAGE_BASE_PATH}/${productId}`)}>
      {SvgIcons.PencilSquare}
    </ButtonComp>
  );
};

export default EditProductButton;
