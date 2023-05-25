import { useEffectOnce } from 'hooks/useEffectOnce';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { toast } from 'react-toastify';

interface IProps {
  description: string;
  amount: number;
  currency?: string;
  className?: string;
  setApprovePayPalSuccess: Dispatch<SetStateAction<any>>;
}

const PayPalButton: React.FC<IProps> = ({ description, amount, setApprovePayPalSuccess, currency = 'USD', className = '' }) => {
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

          setApprovePayPalSuccess(order);
        },
        onError: (error: any) => {
          toast.error(error);
        }
      })
      .render(payPalRef?.current);
  });

  return <div ref={payPalRef} className={`w-full flex justify-center items-center ${className}`}></div>;
};

export default PayPalButton;
