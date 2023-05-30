import { Roles, RouteBasePath } from 'constants/index';
import CreateNewAccountPage from 'pages/adminPage/accountManagePage/createNewAccountPage';
import LoginPage from 'pages/authenticate/login';
import RegisterPage from 'pages/authenticate/register';
import ResetPasswordPage from 'pages/authenticate/resetPassword';
import CheckoutPage from 'pages/cartPage/checkoutPage';
import SearchPage from 'pages/clientPage/searchPage';
import PageNotFound from 'pages/pageNotFound';
import { lazy, ReactElement } from 'react';

export type TRoles = Roles.USER_ROLE | Roles.ADMIN_ROLE | Roles.EDITOR_ROLE;

interface IRoutes {
  path: string;
  element: ReactElement;
  requiredRole: TRoles[];
  children: IRoutesChildren[];
}

interface IRoutesChildren {
  path: string;
  element: ReactElement;
  isIndex: boolean;
  requiredRole: TRoles[];
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
const MyAccountPageLayout = lazy(() => import('pages/myAccountPage'));
const MyAccountPage = lazy(() => import('pages/myAccountPage/myAccount'));
const VerifyEmailPage = lazy(() => import('pages/authenticate/verifyEmail'));
const AccountManagePage = lazy(() => import('pages/adminPage/accountManagePage'));
const MyFavoritePage = lazy(() => import('pages/myAccountPage/myFavorite'));
const AccountDetailPage = lazy(() => import('pages/adminPage/accountManagePage/accountDetailPage'));
const AccountListingPage = lazy(() => import('pages/adminPage/accountManagePage/accountListingPage'));
const CartPage = lazy(() => import('pages/cartPage'));
const CartSummaryPage = lazy(() => import('pages/cartPage/cartSummaryPage'));
const NewsManagePage = lazy(() => import('pages/adminPage/newsManagePage'));
const NewsPageLayout = lazy(() => import('pages/newsPage'));
const NewsListingPage = lazy(() => import('pages/newsPage/newsListingPage'));
const NewsDetailPage = lazy(() => import('pages/newsPage/newsDetailPage'));
const MyOrderPage = lazy(() => import('pages/myAccountPage/myOrder'));
const AboutUsPage = lazy(() => import('pages/clientPage/aboutUsPage'));
const StoreLocatorManagePage = lazy(() => import('pages/adminPage/storeLocatorManagePage'));
const StoreLocatorListingPage = lazy(() => import('pages/adminPage/storeLocatorManagePage/storeListingPage'));
const AddNewStorePage = lazy(() => import('pages/adminPage/storeLocatorManagePage/addNewStorePage'));
const EditStorePage = lazy(() => import('pages/adminPage/storeLocatorManagePage/editStorePage'));
const LocationPage = lazy(() => import('pages/clientPage/storeLocatorPage'));

export const routes: IRoutes[] = [
  {
    path: '/',
    element: <ClientPage />,
    requiredRole: [],
    children: [
      {
        path: '',
        isIndex: true,
        requiredRole: [],
        element: <LandingPage />
      },
      {
        path: RouteBasePath.CLIENT_FIND_A_TEA_BASE_PATH,
        isIndex: false,
        requiredRole: [],
        element: <FindATeaPage />
      },
      {
        path: `${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/:categorySlug`,
        isIndex: false,
        requiredRole: [],
        element: <ProductPage />
      },
      {
        path: `${RouteBasePath.CLIENT_PRODUCT_PAGE_BASE_PATH}/:categorySlug/:productId`,
        isIndex: false,
        requiredRole: [],
        element: <ProductDetailPage />
      },
      {
        path: RouteBasePath.CLIENT_SEARCH_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [],
        element: <SearchPage />
      },
      {
        path: RouteBasePath.CLIENT_ABOUT_US_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [],
        element: <AboutUsPage />
      },
      {
        path: RouteBasePath.CLIENT_LOCATION_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [],
        element: <LocationPage />
      }
    ]
  },
  {
    path: RouteBasePath.CLIENT_NEWS_PAGE_BASE_PATH,
    element: <NewsPageLayout />,
    requiredRole: [],
    children: [
      {
        path: '',
        isIndex: true,
        requiredRole: [],
        element: <NewsListingPage />
      },
      {
        path: `${RouteBasePath.CLIENT_NEWS_DETAIL_PAGE_BASE_PATH}/:newsId`,
        isIndex: false,
        requiredRole: [],
        element: <NewsDetailPage />
      }
    ]
  },
  {
    path: RouteBasePath.LOGIN_BASE_PATH,
    requiredRole: [],
    element: <AuthenticatePage />,
    children: [
      {
        path: '',
        isIndex: true,
        requiredRole: [],
        element: <LoginPage />
      },
      {
        path: RouteBasePath.REGISTER_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [],
        element: <RegisterPage />
      },
      {
        path: RouteBasePath.VERIFY_EMAIL_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [Roles.USER_ROLE],
        element: <VerifyEmailPage />
      },
      {
        path: RouteBasePath.RESET_PASSWORD_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [],
        element: <ResetPasswordPage />
      }
    ]
  },
  {
    path: RouteBasePath.MY_ACCOUNT_PAGE_BASE_PATH,
    requiredRole: [Roles.USER_ROLE, Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
    element: <MyAccountPageLayout />,
    children: [
      {
        path: '',
        isIndex: true,
        requiredRole: [Roles.USER_ROLE, Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
        element: <MyAccountPage />
      },
      {
        path: RouteBasePath.MY_FAVORITES_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [Roles.USER_ROLE],
        element: <MyFavoritePage />
      },
      {
        path: RouteBasePath.MY_ORDERS_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [Roles.USER_ROLE],
        element: <MyOrderPage />
      }
    ]
  },
  {
    path: RouteBasePath.CLIENT_CART_PAGE_BASE_PATH,
    element: <CartPage />,
    requiredRole: [Roles.USER_ROLE],
    children: [
      {
        path: '',
        isIndex: true,
        requiredRole: [Roles.USER_ROLE],
        element: <CartSummaryPage />
      },
      {
        path: RouteBasePath.CLIENT_CHECKOUT_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [Roles.USER_ROLE],
        element: <CheckoutPage />
      }
    ]
  },
  {
    path: RouteBasePath.ADMIN_PAGE_BASE_PATH,
    requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
    element: <AdminPage />,
    children: []
  },
  {
    path: RouteBasePath.ADMIN_CATEGORY_MANAGE_PAGE_BASE_PATH,
    requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
    element: <CategoryManagePage />,
    children: []
  },
  {
    path: RouteBasePath.ADMIN_PRODUCT_MANAGE_PAGE_BASE_PATH,
    requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
    element: <ProductManagePage />,
    children: [
      {
        path: '',
        element: <ProductListingPage />,
        isIndex: true,
        requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE]
      },
      {
        path: RouteBasePath.ADMIN_ADD_NEW_PRODUCT_PAGE_BASE_PATH,
        element: <AddNewProductPage />,
        isIndex: false,
        requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE]
      },
      {
        path: `${RouteBasePath.ADMIN_UPDATE_PRODUCT_PAGE_BASE_PATH}/:productId`,
        element: <EditProductPage />,
        isIndex: false,
        requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE]
      }
    ]
  },
  {
    path: RouteBasePath.ADMIN_NET_WEIGHT_MANAGE_PAGE_BASE_PATH,
    requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
    element: <NetWeightManagePage />,
    children: []
  },
  {
    path: RouteBasePath.ADMIN_ACCOUNT_MANAGE_PAGE_BASE_PATH,
    requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
    element: <AccountManagePage />,
    children: [
      {
        path: '',
        isIndex: true,
        element: <AccountListingPage />,
        requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE]
      },
      {
        path: `${RouteBasePath.ADMIN_ACCOUNT_DETAIL_PAGE_BASE_PATH}/:userId`,
        isIndex: false,
        element: <AccountDetailPage />,
        requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE]
      },
      {
        path: RouteBasePath.ADMIN_CREATE_NEW_ACCOUNT_PAGE_BASE_PATH,
        isIndex: false,
        requiredRole: [Roles.ADMIN_ROLE],
        element: <CreateNewAccountPage />
      }
    ]
  },
  {
    path: RouteBasePath.ADMIN_NEWS_MANAGE_PAGE_BASE_PATH,
    requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
    element: <NewsManagePage />,
    children: []
  },
  {
    path: RouteBasePath.ADMIN_STORE_LOCATOR_PAGE_BASE_PATH,
    requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
    element: <StoreLocatorManagePage />,
    children: [
      {
        path: '',
        requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
        element: <StoreLocatorListingPage />,
        isIndex: true
      },
      {
        path: RouteBasePath.ADMIN_ADD_STORE_LOCATOR_PAGE_BASE_PATH,
        requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
        element: <AddNewStorePage />,
        isIndex: false
      },
      {
        path: `${RouteBasePath.ADMIN_UPDATE_STORE_LOCATOR_PAGE_BASE_PATH}/:storeId`,
        requiredRole: [Roles.ADMIN_ROLE, Roles.EDITOR_ROLE],
        element: <EditStorePage />,
        isIndex: false
      }
    ]
  },
  {
    path: '*',
    requiredRole: [],
    element: <PageNotFound />,
    children: []
  }
];
