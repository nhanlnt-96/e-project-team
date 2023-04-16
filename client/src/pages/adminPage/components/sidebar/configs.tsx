import { RouteBasePath } from 'constants/index';

interface ISidebarData {
  label: string;
  path: string;
}

export const sidebarData: ISidebarData[] = [
  {
    label: 'Category Manage',
    path: RouteBasePath.ADMIN_CATEGORY_MANAGE_PAGE_BASE_PATH
  },
  {
    label: 'Product Manage',
    path: RouteBasePath.ADMIN_PRODUCT_MANAGE_PAGE_BASE_PATH
  }
];
