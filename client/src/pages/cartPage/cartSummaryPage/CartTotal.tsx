import ButtonComp from 'components/buttonComp';
import React, { useMemo } from 'react';
import { ICartData } from 'services/cart';
import { convertPrice } from 'utils/convertPrice';

interface IProps {
  cartData: ICartData;
}

const CartTotal: React.FC<IProps> = ({ cartData }) => {
  const totalPrice = useMemo(() => {
    return cartData?.productsInCart.length
      ? cartData.productsInCart.reduce((prev, next) => prev + next.quantity * next.productQuantityDto.price, 0)
      : 0;
  }, [cartData]);

  return (
    <div className='w-full py-6 flex flex-col justify-center items-center space-y-6'>
      <h6 className='w-full flex justify-between items-center text-xl font-medium'>
        TOTAL EXCL. DELIVERY
        <span>{convertPrice(totalPrice)}</span>
      </h6>
      <ButtonComp isPrimary={false} className='ml-auto'>
        Checkout now
      </ButtonComp>
    </div>
  );
};

export default CartTotal;
