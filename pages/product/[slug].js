import React from 'react';
import MainLayout from '../../layouts/Main';
import { createClient }  from 'contentful';

const Product = ({ product, products }) => {
  
  if (!product) {
    return null
  }
  
  return (
    <MainLayout products={products}>
      <h1>{product.name}</h1>
      <h2>{product.slogan}</h2>
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
    content_type: 'product'
  });

  const filteredEntries = await client.getEntries({
    content_type: 'product',
    'fields.slug[in]': slug,
  });

  let entry = filteredEntries && filteredEntries.items && filteredEntries.items.length ? filteredEntries.items[0] : null;

  if (!entry) {
    return {
      props: {
        product: null,
        products: []
      }
    }
  }

  const product = {
    name: entry.fields.name,
    slogan: entry.fields.slogan,
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
      product,
      products:
        entries && entries.items && entries.items.length
        ? entries.items.map(({ fields }) => {
          const { name, slug } = fields
          return { name, slug }
        })
        : []
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
