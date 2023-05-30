import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import { RouteBasePath } from 'constants/index';
import Sidebar from 'pages/adminPage/components/sidebar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const { Content } = Layout;

const StoreLocatorManagePage = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content className='p-4 space-y-4'>
          <ButtonComp
            onClick={() =>
              navigate(
                pathname === RouteBasePath.ADMIN_STORE_LOCATOR_PAGE_BASE_PATH
                  ? RouteBasePath.ADMIN_PAGE_BASE_PATH
                  : RouteBasePath.ADMIN_STORE_LOCATOR_PAGE_BASE_PATH
              )
            }
          >
            Back
          </ButtonComp>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default StoreLocatorManagePage;
