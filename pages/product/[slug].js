import React from 'react';
import MainLayout from '../../layouts/Main';
import { createClient }  from 'contentful';

const Product = ({ product, slug }) => {
  
  console.log('product', product)
  return (
  <MainLayout>
    <h1>{product.name}</h1>
    <p>{JSON.stringify(product)}</p>
  </MainLayout>
)
  }

export async function getStaticProps({ params }) {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });

  const { slug } = params

  const entries = await client.getEntries({
    content_type: 'product',
    'fields.slug[in]': slug,
  });

  let entry = entries && entries.items && entries.items.length ? entries.items[0] : null;

  const product = {
    name: entry.fields.name,
    description: entry.fields.description,
    shortDescription: entry.fields.description,
    images: entry.fields.images.map(({ fields }) => {
      const { url, fileName } = fields.file
      return { url, fileName }
    })
  }

  return {
    props: {
      slug: params.slug,
      product
    }
  }
}

export async function getStaticPaths() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });
  
  const entries = await client.getEntries({
    content_type: 'product'
  });

  return {
    paths: entries.items.map(({ fields }) => `/product/${fields.slug}`),
    fallback: true
  };

}

export default Product;
