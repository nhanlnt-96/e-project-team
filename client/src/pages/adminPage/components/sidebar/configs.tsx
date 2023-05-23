import { RouteBasePath } from 'constants/index';

interface ISidebarData {
  label: string;
  path: string;
}

export const sidebarData: ISidebarData[] = [
  {
    label: 'Account Manage',
    path: RouteBasePath.ADMIN_ACCOUNT_MANAGE_PAGE_BASE_PATH
  },
  {
    label: 'Category Manage',
    path: RouteBasePath.ADMIN_CATEGORY_MANAGE_PAGE_BASE_PATH
  },
  {
    label: 'Net Weight Manage',
    path: RouteBasePath.ADMIN_NET_WEIGHT_MANAGE_PAGE_BASE_PATH
  },
  {
    label: 'Product Manage',
    path: RouteBasePath.ADMIN_PRODUCT_MANAGE_PAGE_BASE_PATH
  },
  {
    label: 'News Manage',
    path: RouteBasePath.ADMIN_NEWS_MANAGE_PAGE_BASE_PATH
  }
];
