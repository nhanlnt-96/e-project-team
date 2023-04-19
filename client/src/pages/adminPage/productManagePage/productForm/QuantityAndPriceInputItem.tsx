import ButtonComp from 'components/buttonComp';
import InputComp from 'components/inputComp';
import NetWeightSelect from 'pages/adminPage/productManagePage/productForm/NetWeightSelect';
import React, { useState } from 'react';
import { validateObject } from 'utils/validateObject';

export interface IQuantityPriceValue {
  netWeightId: number;
  quantity: number;
  price: number;
}

interface IProps {
  // eslint-disable-next-line no-unused-vars
  onAddQuantityAndPrice: (values: IQuantityPriceValue) => void;
}

const initialQuantityPriceValues: IQuantityPriceValue = {
  netWeightId: 0,
  quantity: 0,
  price: 0
};

const QuantityAndPriceInputItem: React.FC<IProps> = ({ onAddQuantityAndPrice }) => {
  const [quantityPriceValues, setQuantityPriceValues] = useState<IQuantityPriceValue>(initialQuantityPriceValues);
  const [isDisableField, setIsDisableField] = useState<boolean>(false);

  const handleChangeQuantityAndPrice = (id: string, value: number) => {
    setQuantityPriceValues((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleAddQuantityPrice = () => {
    // INFO: disable field after add
    setIsDisableField(true);

    onAddQuantityAndPrice(quantityPriceValues);
  };

  return (
    <div className='w-full flex space-x-4'>
      <div className='w-1/3 space-y-2'>
        <label htmlFor='netWeightId' className='text-sm text-taupe-gray'>
          Net Weight
        </label>
        <NetWeightSelect
          disabled={isDisableField}
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
            Add
          </ButtonComp>
        )}
      </div>
    </div>
  );
};

export default QuantityAndPriceInputItem;
