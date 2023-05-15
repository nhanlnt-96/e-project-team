import { RouteBasePath } from 'constants/index';

export const myAccountTabsItems = [
  {
    key: RouteBasePath.MY_ACCOUNT_PAGE_BASE_PATH,
    label: 'My Account',
    path: RouteBasePath.MY_ACCOUNT_PAGE_BASE_PATH
  },
  {
    key: `${RouteBasePath.MY_ACCOUNT_PAGE_BASE_PATH}/${RouteBasePath.MY_FAVORITES_PAGE_BASE_PATH}`,
    label: 'My Favorites',
    path: `${RouteBasePath.MY_ACCOUNT_PAGE_BASE_PATH}/${RouteBasePath.MY_FAVORITES_PAGE_BASE_PATH}`
  },
  {
    key: RouteBasePath.MY_ORDERS_PAGE_BASE_PATH,
    label: 'My Orders',
    path: RouteBasePath.MY_ORDERS_PAGE_BASE_PATH
  }
];
