import React from 'react';
import MainLayout from '../../layouts/Main';
import { createClient }  from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const Product = ({ product, products }) => {
  
  if (!product) {
    return null
  }

  return (
    <MainLayout products={products}>
      <div id="product">
        <section id="product__info">
          <h1>{product.name}</h1>
          <h2>{product.slogan}</h2>
          <div dangerouslySetInnerHTML={{__html: documentToHtmlString(product.description) }}></div>
        </section>
        <section id="product__images">
          {product.images.map((image, i) =>
            <article key={i} className="product__images__item">
              <img src={image.url} alt={image.fileName} />
            </article>
          )}
        </section>
      </div>
      <style>{`
        h1 {
          font-size: 3em;
          margin: 1em 0 0 0;
          text-transform: uppercase;
        }
        h2 {
          font-size: 1em;
          margin: 0;
          text-transform: uppercase;
        }
        p {
          line-height: 1.5em;
          font-size: 1.2em;
          font-weight: 300;
        }
        #product {
          display: flex;
        }
        #product__info {
          flex: 2;
          margin-right: 10vw;
        }
        #product__images {
          margin-top: 5vw;
          display: grid;
          grid-template-columns: 150px 150px 150px;
          grid-gap: 10px;
        }
        .product__images__item {
          align-items: center;
          background: #fff;
          display: flex;
          justify-content: center;
        }
        #product__images img {
          width: 100%;
        }
      `}</style>
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
