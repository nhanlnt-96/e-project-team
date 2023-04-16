import { Layout } from 'antd';
import Sidebar from 'pages/adminPage/components/sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AdminPage = () => {
  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content className='p-4'>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
