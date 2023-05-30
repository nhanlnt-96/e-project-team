import { RouteBasePath } from 'constants/index';

interface IHeaderLink {
  label: string;
  path: string;
}

export const headerLinks: IHeaderLink[] = [
  {
    label: 'Homepage',
    path: RouteBasePath.CLIENT_HOME_PAGE_BASE_PATH
  },
  {
    label: 'Find a Tea',
    path: `/${RouteBasePath.CLIENT_FIND_A_TEA_BASE_PATH}`
  },
  {
    label: 'News',
    path: RouteBasePath.CLIENT_NEWS_PAGE_BASE_PATH
  },
  {
    label: 'About us',
    path: `/${RouteBasePath.CLIENT_ABOUT_US_PAGE_BASE_PATH}`
  },
  {
    label: 'Locations',
    path: `/${RouteBasePath.CLIENT_LOCATION_PAGE_BASE_PATH}`
  }
];
