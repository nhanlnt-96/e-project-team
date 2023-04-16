import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import Sidebar from 'pages/adminPage/components/sidebar';
import { Outlet, useNavigate } from 'react-router-dom';

const { Content } = Layout;

const ProductManagePage = () => {
  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content className='p-4 space-y-4'>
          <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_PRODUCT_MANAGE_PAGE_BASE_PATH)}>Back</ButtonComp>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProductManagePage;
