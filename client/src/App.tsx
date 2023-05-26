import { ConfigProvider } from 'antd';
import MainLayout from 'components/mainLayout';
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
      <MainLayout />
    </ConfigProvider>
  );
}

export default App;
