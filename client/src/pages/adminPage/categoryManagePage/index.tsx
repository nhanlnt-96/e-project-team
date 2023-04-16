import { Layout } from 'antd';
import ButtonComp from 'components/buttonComp';
import Title from 'components/title';
import { RouteBasePath } from 'constants/index';
import CategoryListing from 'pages/adminPage/categoryManagePage/categoryListing';
import CreateNewCategoryButton from 'pages/adminPage/categoryManagePage/createNewCategoryButton';
import SectionContainer from 'pages/adminPage/components/sectionContainer';
import Sidebar from 'pages/adminPage/components/sidebar';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const CategoryManagePage = () => {
  const navigate = useNavigate();

  return (
    <Layout className='min-h-screen'>
      <Layout>
        <Sidebar />
        <Content className='p-4 space-y-4'>
          <ButtonComp onClick={() => navigate(RouteBasePath.ADMIN_CATEGORY_MANAGE_PAGE_BASE_PATH)}>Back</ButtonComp>
          <SectionContainer>
            <Title title={'Category listing'} titleClassName='text-black' rootClassName='border-b border-black pb-2' />
            <div className='w-ful flex justify-end items-center'>
              <CreateNewCategoryButton />
            </div>
            <CategoryListing />
          </SectionContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CategoryManagePage;
