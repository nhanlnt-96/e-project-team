/* eslint-disable no-unused-vars */
export enum ScreenBreakPoints {
  SM_BREAKPOINT = 640,
  MD_BREAKPOINT = 768,
  LG_BREAKPOINT = 1024,
  XL_BREAKPOINT = 1280,
  XXL_BREAKPOINT = 1536,
  XXXL_BREAKPOINT = 1920
}

export enum AllowNumber {
  MIN_PRODUCT_PRICE = 1,

  MIN_ALLOW_UPLOAD_PRODUCT_IMAGE = 1,
  MAXIMUM_ALLOW_UPLOAD_PRODUCT_IMAGE = 5
}

export enum RouteBasePath {
  CLIENT_FIND_A_TEA_BASE_PATH = 'find-a-tea',
  CLIENT_PRODUCT_PAGE_BASE_PATH = 'shop',

  LOGIN_BASE_PATH = 'login',

  ADMIN_PAGE_BASE_PATH = '/admin',

  ADMIN_CATEGORY_MANAGE_PAGE_BASE_PATH = '/admin/category-manage',

  ADMIN_PRODUCT_MANAGE_PAGE_BASE_PATH = '/admin/product-manage',
  ADMIN_ADD_NEW_PRODUCT_PAGE_BASE_PATH = 'add-new-product',
  ADMIN_UPDATE_PRODUCT_PAGE_BASE_PATH = 'update-product',

  ADMIN_NET_WEIGHT_MANAGE_PAGE_BASE_PATH = '/admin/net-weight-manage'
}
