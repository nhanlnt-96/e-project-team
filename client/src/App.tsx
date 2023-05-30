import { ConfigProvider } from 'antd';
import MainLayout from 'components/mainLayout';
import SEO from 'components/seo';
import ToastifyProvider from 'components/toastifyProvider';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const theme = {
    token: {
      fontFamily: '\'Jost\', sans-serif',
      fontSize: 16
    }
  };

  return (
    <HelmetProvider>
      <SEO />
      <ConfigProvider theme={theme}>
        <ToastifyProvider />
        <MainLayout />
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
