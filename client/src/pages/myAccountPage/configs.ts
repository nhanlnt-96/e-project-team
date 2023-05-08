import { RouteBasePath } from 'constants/index';
import { generateUuid } from 'utils/generateUuid';

export const myAccountTabsItems = [
  {
    key: generateUuid(),
    label: 'My Account',
    path: RouteBasePath.MY_ACCOUNT_PAGE_BASE_PATH
  },
  {
    key: generateUuid(),
    label: 'My Favorites',
    path: RouteBasePath.MY_FAVORITES_PAGE_BASE_PATH
  },
  {
    key: generateUuid(),
    label: 'My Orders',
    path: RouteBasePath.MY_ORDERS_PAGE_BASE_PATH
  }
];
