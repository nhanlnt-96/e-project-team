import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import Sidebar from 'pages/adminPage/components/sidebar';
import CreateNewNetWeightButton from 'pages/adminPage/netWeightManage/createNewNetWeightButton';
import NetWeightListing from 'pages/adminPage/netWeightManage/netWeightListing';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const NetWeightManage = () => {
  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content className='p-4 space-y-4'>
          <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_PAGE_BASE_PATH)}>Back</ButtonComp>
          <SectionContainer>
            <Title title={'Net Weight listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
            <div className='w-ful flex justify-end items-center'>
              <CreateNewNetWeightButton />
            </div>
            <NetWeightListing />
          </SectionContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default NetWeightManage;
