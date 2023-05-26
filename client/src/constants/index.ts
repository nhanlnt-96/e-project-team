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
  MAXIMUM_ALLOW_UPLOAD_PRODUCT_IMAGE = 5,

  MIN_NET_WEIGHT_VALUE = 50,

  MAXIMUM_QUANTITY_SELECT = 20
}

export enum RouteBasePath {
  CLIENT_HOME_PAGE_BASE_PATH = '/',
  CLIENT_FIND_A_TEA_BASE_PATH = 'find-a-tea',
  CLIENT_PRODUCT_PAGE_BASE_PATH = 'shop',
  CLIENT_ABOUT_US_PAGE_BASE_PATH = 'about-us',
  CLIENT_CONTACT_US_PAGE_BASE_PATH = 'contact-us',

  CLIENT_NEWS_PAGE_BASE_PATH = '/news',
  CLIENT_NEWS_DETAIL_PAGE_BASE_PATH = 'news-detail',

  CLIENT_CART_PAGE_BASE_PATH = '/cart',
  CLIENT_CHECKOUT_PAGE_BASE_PATH = 'checkout',

  CLIENT_SEARCH_PAGE_BASE_PATH = '/search',

  LOGIN_BASE_PATH = '/authenticate',
  REGISTER_PAGE_BASE_PATH = 'register',
  VERIFY_EMAIL_PAGE_BASE_PATH = 'verify-email/:token',
  RESET_PASSWORD_PAGE_BASE_PATH = 'reset-password/:token',

  MY_ACCOUNT_PAGE_BASE_PATH = '/my-account',
  MY_FAVORITES_PAGE_BASE_PATH = 'my-favorites',
  MY_ORDERS_PAGE_BASE_PATH = 'my-orders',

  ADMIN_PAGE_BASE_PATH = '/admin',

  ADMIN_CATEGORY_MANAGE_PAGE_BASE_PATH = '/admin/category-manage',

  ADMIN_PRODUCT_MANAGE_PAGE_BASE_PATH = '/admin/product-manage',
  ADMIN_ADD_NEW_PRODUCT_PAGE_BASE_PATH = 'add-new-product',
  ADMIN_UPDATE_PRODUCT_PAGE_BASE_PATH = 'update-product',

  ADMIN_NET_WEIGHT_MANAGE_PAGE_BASE_PATH = '/admin/net-weight-manage',

  ADMIN_ACCOUNT_MANAGE_PAGE_BASE_PATH = '/admin/account-manage',
  ADMIN_ACCOUNT_DETAIL_PAGE_BASE_PATH = 'account-detail',
  ADMIN_CREATE_NEW_ACCOUNT_PAGE_BASE_PATH = 'create-new-account',

  ADMIN_NEWS_MANAGE_PAGE_BASE_PATH = '/admin/news-manage',

  PAGE_NOT_FOUND = '/page-not-found'
}

export enum Gender {
  MALE = 0,
  FEMALE = 1
}

export enum VerifyEmailStatus {
  NOT_VERIFY_EMAIL = 0,
  VERIFIED_EMAIL = 1
}

export enum Roles {
  ADMIN_ROLE = 'ROLE_ADMIN',
  USER_ROLE = 'ROLE_USER',
  EDITOR_ROLE = 'ROLE_EDITOR'
}

export enum LocalStorageName {
  ACCESS_TOKEN_NAME = 'twgTeaAccessToken',
  USER_DATA_NAME = 'twgTeaUserData',
  RECENTLY_VIEWED_PRODUCTS = 'twgTeaRecentlyViewedProducts'
}

export enum Checkout {
  SHIPPING_STATUS_DELIVERED = 0,
  SHIPPING_STATUS_SHIPPING = 1,
  SHIPPING_STATUS_CANCEL = 2,
  PAYMENT_METHOD_COD = 0,
  PAYMENT_METHOD_PAYPAL = 1,
  PAYMENT_STATUS_PAID = 0,
  PAYMENT_STATUS_PENDING = 1
}

export const FULL_NAME_REGEX = new RegExp(/^\p{Lu}\p{L}*\s((\p{Lu}\p{L}*)+\s)*\p{Lu}\p{L}*$/gu);

export const PHONE_NUMBER_REGEX = new RegExp(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g);

export const PASSWORD_REGEX = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,30}$/gm);
