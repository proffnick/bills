import { useContext } from 'react';
import { AppContext } from '../context/context';
import { cors_url } from '../lib/config';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';


const InitPayment = ({
  amount = 0,
  callback = () => null,
  reset 
}) => {
  const { user }  = useContext(AppContext);

  const getConfig = () => {
    return {
      public_key: process.env.NEXT_PUBLIC_FLP,
      tx_ref: Date.now(),
      amount: parseFloat(amount),
      currency: 'NGN',
      payment_options: 'card,mobilemoney,ussd,banktransfer,account',
      customer: {
        email: user.email,
        phone_number: '',
        name: user.fullName,
      },
      customizations: {
        title: 'Quick Wallet Top-Up',
        description: 'Top up wallet for quick buys',
        logo: `${cors_url}/_next/image?url=%2Fmin.png&w=128&q=75`,
      },
    };
  }
  const config = getConfig();
  console.log(config);
  useFlutterwave(config)({
    callback: (response) => {
      closePaymentModal();
      callback(response);
      reset(0);
    },
    onClose: () => {
      closePaymentModal();
      reset(0);
    }
  });

  return null;
}

export default InitPayment;