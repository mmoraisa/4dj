import React from 'react';
import ReactGA from 'react-ga'
import { createClient }  from 'contentful';
import Head from '../components/Head';
import MainLayout from '../layouts/Main';
import ProductsCarousel from '../components/ProductsCarousel';

const Home = ({ products }) => {

  ReactGA.initialize('UA-173930791-1')
  ReactGA.pageview('home')  

  return (
    <>
      <Head />
      <MainLayout products={products}>
        {
          products &&
          <ProductsCarousel products={products} />
        }
      </MainLayout>
    </>
  )
}

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });

  const entries = await client.getEntries({
    content_type: 'product',
    order: 'fields.name'
  });

  return {
    props: {
      products:
        entries && entries.items && entries.items.length
        ? entries.items.map(({ fields }) => {
          const { featuredImage, name, slogan, shortDescription, slug, link } = fields
          return {
            name,
            slogan,
            shortDescription,
            slug,
            link,
            featuredImage: {
              url: featuredImage.fields.file.url,
              fileName: featuredImage.fields.file.fileName
            }
          }
        })
        : []
    }
  }

}


export default Home;
