import React from 'react';
import MainLayout from '../layouts/Main';
import { createClient }  from 'contentful';

const Home = ({ products }) => (
  <MainLayout products={products}>
    <h1>
      Welcome to 4DJ
    </h1>
    <p>{JSON.stringify(products)}</p>
  </MainLayout>
)

export async function getStaticProps() {

  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
  });

  const entries = await client.getEntries({
    content_type: 'product'
  });

  return {
    props: {
      products:
        entries && entries.items && entries.items.length
        ? entries.items.map(({ fields }) => {
          const { featuredImage, name, shortDescription, slug } = fields
          return {
            name,
            shortDescription,
            slug,
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
