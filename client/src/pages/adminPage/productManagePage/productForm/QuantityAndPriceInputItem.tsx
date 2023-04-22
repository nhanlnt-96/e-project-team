import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import _ from 'lodash';
import NetWeightSelect from 'pages/adminPage/productManagePage/productForm/NetWeightSelect';
import RemoveProductQuantityButton from 'pages/adminPage/productManagePage/productForm/RemoveProductQuantityButton';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from 'redux/hooks';
import { removeProductQuantityThunk } from 'redux/productManage/removeProductQuantitySlice';
import { validateObject } from 'utils/validateObject';

export interface IQuantityPriceValue {
  netWeightId: number;
  quantity: number;
  price: number;
}

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onAddQuantityAndPrice: (values: IQuantityPriceValue) => void;
  defaultValues?: IQuantityPriceValue;
  productId?: number;
  quantityId?: number;
}

const initialQuantityPriceValues: IQuantityPriceValue = {
  netWeightId: 0,
  quantity: 0,
  price: 0
};

const QuantityAndPriceInputItem: React.FC<IProps> = ({ onAddQuantityAndPrice, defaultValues, productId, quantityId }) => {
  const dispatch = useAppDispatch();
  const [quantityPriceValues, setQuantityPriceValues] = useState<IQuantityPriceValue>(initialQuantityPriceValues);
  const [isDisableField, setIsDisableField] = useState<boolean>(false);

  useEffect(() => {
    if (defaultValues) {
      setQuantityPriceValues({
        netWeightId: _.get(defaultValues, 'netWeightId', 0),
        quantity: _.get(defaultValues, 'quantity', 0),
        price: _.get(defaultValues, 'price', 0)
      });

      // INFO: disable field after set state for quantity price values
      setIsDisableField(true);
    }
  }, [defaultValues]);

  const handleChangeQuantityAndPrice = (id: string, value: number) => {
    setQuantityPriceValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleAddQuantityPrice = () => {
    // INFO: disable field after add
    setIsDisableField(true);

    onAddQuantityAndPrice(quantityPriceValues);
  };

  const handleRemoveProductQuantity = useCallback(() => {
    if (productId && quantityId) {
      dispatch(removeProductQuantityThunk({ quantityId, productId }));
    }
  }, [quantityId, productId]);

  return (
    <div className='w-full flex space-x-4'>
      <RemoveProductQuantityButton
        disabled={!validateObject<IQuantityPriceValue>(quantityPriceValues)}
        onRemoveProductQuantity={handleRemoveProductQuantity}
      />
      <div className='w-1/3 space-y-2'>
        <label htmlFor='netWeightId' className='text-sm text-taupe-gray'>
          Net Weight
        </label>
        <NetWeightSelect
          disabled={isDisableField || Boolean(productId && quantityId)}
          id='netWeightId'
          value={quantityPriceValues.netWeightId}
          onChange={(value) => handleChangeQuantityAndPrice('netWeightId', value)}
        />
      </div>
      <div className='w-1/3 space-y-2'>
        <label htmlFor='quantity' className='text-sm text-taupe-gray'>
          Quantity
        </label>
        <InputComp
          placeholder='Quantity'
          type='number'
          id='quantity'
          name='quantity'
          value={quantityPriceValues.quantity}
          disabled={isDisableField}
          onChange={(event) => handleChangeQuantityAndPrice('quantity', Number.parseInt(event.target.value))}
        />
      </div>
      <div className='w-1/3 space-y-2'>
        <label htmlFor='price' className='text-sm text-taupe-gray'>
          Price
        </label>
        <InputComp
          placeholder='Price'
          type='number'
          id='price'
          name='price'
          disabled={isDisableField}
          value={quantityPriceValues.price}
          onChange={(event) => handleChangeQuantityAndPrice('price', Number.parseInt(event.target.value))}
        />
      </div>
      <div className='space-y-2'>
        <label className='text-sm text-taupe-gray invisible'>Add</label>
        {isDisableField ? (
          <ButtonComp htmlType='button' className='h-[38px] !py-1.5' onClick={() => setIsDisableField(false)}>
            Edit
          </ButtonComp>
        ) : (
          <ButtonComp
            htmlType='button'
            className='h-[38px] !py-1.5'
            onClick={handleAddQuantityPrice}
            disabled={!validateObject<IQuantityPriceValue>(quantityPriceValues)}
          >
            {defaultValues ? 'Update' : 'Add'}
          </ButtonComp>
        )}
      </div>
    </div>
  );
};

export default QuantityAndPriceInputItem;
