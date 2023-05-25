import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { useRef } from 'react';

const PayPalButton: React.FC<IProps> = ({ description, amount, currency = 'USD' }) => {
  const payPalRef = useRef<HTMLDivElement>(null);

  useEffectOnce(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.paypal
      .Buttons({
        createOrder: (data: any, actions: any, err: any) => {
          return actions.order.create({
            intent: 'CAPTURE',
            // eslint-disable-next-line camelcase
            purchase_units: [
              {
                description: description,
                amount: {
                  // eslint-disable-next-line camelcase
                  currency_code: currency,
                  value: amount
                }
              }
            ]
          });
        },
        onApprove: async (data: any, actions: any) => {
          const order = await actions.order.capture();

          console.log(order);
        },
        onError: (error: any) => {
          console.log(error);
        }
      })
      .render(payPalRef?.current);
  });

  return <div ref={payPalRef} className='w-full flex justify-center items-center'></div>;
};

interface IProps {
  description: string;
  amount: number;
  currency?: string;
}

export default PayPalButton;
