interface IHeaderLink {
  label: string;
  path: string;
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
