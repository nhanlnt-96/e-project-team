import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICartData } from 'services/cart';
import { convertPrice } from 'utils/convertPrice';

interface IProps {
  cartData: ICartData;
  isShowCheckoutButton?: boolean;
}

const CartTotal: React.FC<IProps> = ({ cartData, isShowCheckoutButton = true }) => {
  const navigate = useNavigate();

  const totalPrice = useMemo(() => {
    return cartData?.productsInCart.length
      ? cartData.productsInCart.reduce((prev, next) => prev + next.quantity * next.productQuantityDto.price, 0)
      : 0;
  }, [cartData]);

  return (
    <div className='w-full py-6 flex flex-col justify-center items-center space-y-6'>
      <h6 className='w-full flex justify-between items-center font-medium text-lg sm:text-xl'>
        TOTAL EXCL. DELIVERY
        <span>{convertPrice(totalPrice)}</span>
      </h6>
      {isShowCheckoutButton ? (
        <ButtonComp isPrimary={false} className='ml-auto' onClick={() => navigate(RouteBasePath.CLIENT_CHECKOUT_PAGE_BASE_PATH)}>
          Checkout now
        </ButtonComp>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartTotal;
