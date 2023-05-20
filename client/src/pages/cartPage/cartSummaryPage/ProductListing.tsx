import { SvgIcons } from 'assets/icons/svgIcons';
import ImageResponsive from 'components/imageResponsive';
import Loading from 'components/loading';
import ProductNetWeightSelect from 'pages/clientPage/productDetailPage/ProductNetWeightSelect';
import ProductQuantitySelect from 'pages/clientPage/productDetailPage/ProductQuantitySelect';
import React, { useCallback } from 'react';
import { addToCartThunk } from 'redux/cartManage/addToCartSlice';
import { removeFromCartThunk } from 'redux/cartManage/removeFromCartSlice';
import { removeFromCartSelector } from 'redux/cartManage/selector';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IAddToCartData, IProductInCart, IRemoveFromCart } from 'services/cart';
import { convertPrice } from 'utils/convertPrice';
import { imageLinkGeneration } from 'utils/imageLinkGeneration';

interface IProps {
  productInCart: IProductInCart[];
}

const ProductListing: React.FC<IProps> = ({ productInCart }) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(removeFromCartSelector);

  const handleRemoveFromCart = useCallback((productId: number, netWeightId: number) => {
    const removeFromData: IRemoveFromCart = {
      productId: productId,
      netWeightId: netWeightId
    };

    dispatch(removeFromCartThunk(removeFromData));
  }, []);

  const handleChangeProductQuantity = useCallback((productId: number, quantity: number, netWeightId: number) => {
    const addToCartData: IAddToCartData = {
      productId: productId,
      quantity: quantity,
      netWeightId: netWeightId
    };

    dispatch(addToCartThunk({ ...addToCartData, isUpdateCart: true }));
  }, []);

  return (
    <div className='w-full'>
      {productInCart.length ? (
        productInCart.map((product) => (
          <div key={product.productId} className='relative flex justify-start items-center py-6 border-b border-black space-x-3 first:border-t'>
            <button
              type='button'
              className='absolute outline-none top-6 right-6 focus:ring-0 hover:text-antd-status-error'
              onClick={() => handleRemoveFromCart(product.productId, product.netWeightDto.netWeightId)}
            >
              {React.cloneElement(SvgIcons.XMark, { className: 'w-5 h-5' })}
            </button>
            <div className='max-w-[200px] w-full'>
              <ImageResponsive
                width={200}
                height={200}
                imageProps={{ src: imageLinkGeneration(product.images[0].storageName, product.images[0].imageName) }}
              />
            </div>
            <div className='w-full space-y-4'>
              <h6 className='font-bold uppercase'>{product.productName}</h6>
              <div className='w-full flex justify-start items-center space-x-2 sm:w-1/2'>
                <div className='flex-1 space-y-2'>
                  <label htmlFor='quantity'>Quantity</label>
                  <ProductQuantitySelect
                    id='quantity'
                    productId={product.productId}
                    netWeightId={product.netWeightDto.netWeightId}
                    value={product.quantity}
                    onChange={(value) => handleChangeProductQuantity(product.productId, value, product.netWeightDto.netWeightId)}
                  />
                </div>
                <div className='flex-1 space-y-2'>
                  <label htmlFor='netWeight'>Net Weight</label>
                  <ProductNetWeightSelect id='netWeight' productId={product.productId} disabled={true} value={product.netWeightDto.netWeightId} />
                </div>
              </div>
              <p className='text-right font-medium'>{convertPrice(product.quantity * product.productQuantityDto.price)}</p>
            </div>
          </div>
        ))
      ) : (
        <></>
      )}
      {isLoading ? <Loading isLoadingMask /> : <></>}
    </div>
  );
};

export default ProductListing;
