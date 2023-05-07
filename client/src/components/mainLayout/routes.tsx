import { Roles, RouteBasePath } from 'constants/index';
import LoginPage from 'pages/authenticate/login';
import RegisterPage from 'pages/authenticate/register';
import PageNotFound from 'pages/pageNotFound';
import { lazy, ReactElement } from 'react';

export type TRoles = Roles.USER_ROLE | Roles.ADMIN_ROLE;

interface IRoutes {
  path: string;
  element: ReactElement;
  isPrivate: boolean;
  requiredRole?: TRoles;
  children: IRoutesChildren[];
}

interface IRoutesChildren {
  path: string;
  element: ReactElement;
  isIndex: boolean;
}

const ClientPage = lazy(() => import('pages/clientPage'));
const LandingPage = lazy(() => import('pages/clientPage/landingPage'));
const AuthenticatePage = lazy(() => import('pages/authenticate'));
const FindATeaPage = lazy(() => import('pages/clientPage/findATeaPage'));
const ProductPage = lazy(() => import('pages/clientPage/productPage'));
const AdminPage = lazy(() => import('pages/adminPage'));
const CategoryManagePage = lazy(() => import('pages/adminPage/categoryManagePage'));
const ProductManagePage = lazy(() => import('pages/adminPage/productManagePage'));
const ProductListingPage = lazy(() => import('pages/adminPage/productManagePage/productListingPage'));
const AddNewProductPage = lazy(() => import('pages/adminPage/productManagePage/addNewProductPage'));
const EditProductPage = lazy(() => import('pages/adminPage/productManagePage/editProductPage'));
const NetWeightManagePage = lazy(() => import('pages/adminPage/netWeightManage'));
const ProductDetailPage = lazy(() => import('pages/clientPage/productDetailPage'));

export const routes: IRoutes[] = [
  {
    path: '/',
    element: <ClientPage />,
    isPrivate: false,
    children: [
      {
        path: '',
        isIndex: true,
        element: <LandingPage />
      },
      {
        path: RouteBasePath.CLIENT_FIND_A_TEA_BASE_PATH,
        isIndex: false,
        element: <FindATeaPage />
      },
      {
        path: `${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/:categorySlug`,
        isIndex: false,
        element: <ProductPage />
      },
      {
        path: `${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/:categorySlug/:productId`,
        isIndex: false,
        element: <ProductDetailPage />
      }
    ]
  },
  {
    path: RouteBasePath.LOGIN_BASE_PATH,
    isPrivate: false,
    element: <AuthenticatePage />,
    children: [
      {
        path: '',
        isIndex: true,
        element: <LoginPage />
      },
      {
        path: RouteBasePath.REGISTER_PAGE_BASE_PATH,
        isIndex: false,
        element: <RegisterPage />
      }
    ]
  },
  {
    path: RouteBasePath.ADMIN_PAGE_BASE_PATH,
    isPrivate: true,
    requiredRole: Roles.ADMIN_ROLE,
    element: <AdminPage />,
    children: []
  },
  {
    path: RouteBasePath.ADMIN_CATEGORY_MANAGE_PAGE_BASE_PATH,
    isPrivate: true,
    requiredRole: Roles.ADMIN_ROLE,
    element: <CategoryManagePage />,
    children: []
  },
  {
    path: RouteBasePath.ADMIN_PRODUCT_MANAGE_PAGE_BASE_PATH,
    isPrivate: true,
    requiredRole: Roles.ADMIN_ROLE,
    element: <ProductManagePage />,
    children: [
      {
        path: '',
        element: <ProductListingPage />,
        isIndex: true
      },
      {
        path: RouteBasePath.ADMIN_ADD_NEW_PRODUCT_PAGE_BASE_PATH,
        element: <AddNewProductPage />,
        isIndex: false
      },
      {
        path: `${RouteBasePath.ADMIN_UPDATE_PRODUCT_PAGE_BASE_PATH}/:productId`,
        element: <EditProductPage />,
        isIndex: false
      }
    ]
  },
  {
    path: RouteBasePath.ADMIN_NET_WEIGHT_MANAGE_PAGE_BASE_PATH,
    isPrivate: true,
    requiredRole: Roles.ADMIN_ROLE,
    element: <NetWeightManagePage />,
    children: []
  },
  {
    path: '*',
    isPrivate: false,
    element: <PageNotFound />,
    children: []
  }
];
