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

export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug
    }
  }
}

export async function getStaticPaths() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });

  return {
    paths: ['/product/bag','/product/headphone-bag'],
    fallback: true
  };
}

export default Product;
