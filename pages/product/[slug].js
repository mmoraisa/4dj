import React from 'react';
import MainLayout from '../../layouts/Main';
import { createClient }  from 'contentful';

const Product = ({ slug }) => {
  return (
    <MainLayout>
      <h1>
        Produto [{slug}]
      </h1>
    </MainLayout>
  )
}

Product.getInitialProps = async ({ query }) => {
  const { slug } = query;

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });

  const entries = await client.getEntries({
    content_type: 'product',
    'fields.slug[in]': slug,
  });

  return {
    slug,
    product: entries.items[0]
  };
}

export default Product;
