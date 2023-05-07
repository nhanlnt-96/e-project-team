import { ReactElement } from 'react';

interface IHeaderLink {
  label: string;
  path: string;
}

interface IHeaderToolbar {
  label: string;
  path: string;
  icon: ReactElement<'svg'>;
}

export const headerLinks: IHeaderLink[] = [
  {
    label: 'Homepage',
    path: '/'
  },
  {
    label: 'Find a Tea',
    path: '/find-a-tea'
  },
  {
    label: 'About us',
    path: '/about-us'
  },
  {
    label: 'Contact us',
    path: '/contact-us'
  }
];
