import MetaImage from 'assets/images/logo-meta.png';
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface IProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

const SEO: React.FC<IProps> = ({
  title = 'TWG Tea Online Boutique | Shop Luxury Teas & Accessories | TWG Tea',
  description = 'Buy high quality luxury tea online from the finest tea brand in the world. Discover 800+ varieties of loose leaf teas and accessories. Ships internationally.',
  url = 'http://localhost:3000',
  image = MetaImage
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={url} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content={image} />
    </Helmet>
  );
};

export default SEO;
