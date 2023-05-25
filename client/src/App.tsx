import { ConfigProvider } from 'antd';
import MainLayout from 'components/mainLayout';
import PayPalButton from 'components/payPalButton';
import ToastifyProvider from 'components/toastifyProvider';

function App() {
  const theme = {
    token: {
      fontFamily: '\'Jost\', sans-serif',
      fontSize: 16
    }
  };

  return (
    <ConfigProvider theme={theme}>
      <ToastifyProvider />
      <PayPalButton description={'Test paypal'} amount={200} />
      <MainLayout />
    </ConfigProvider>
  );
}

export default App;
