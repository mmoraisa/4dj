import React, { useState } from 'react';
import { createClient }  from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { FiShoppingCart } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import MainLayout from '../../layouts/Main';

const Product = ({ product, products }) => {
  
  const [showingImage, setShowingImage] = useState(null);
  const [closingImage, setClosingImage] = useState(false);

  const closeImage = () => {
    setClosingImage(true);

    setTimeout(() => {
      setShowingImage(null)
      setClosingImage(false)
    }, 300);
  }

  const showImage = image => {
    setShowingImage(image)
  }

  if (!product) {
    return null
  }

  return (
    <MainLayout products={products}>
      <div id="image-visualization" className={`${showingImage && !closingImage ? 'active' : ''}`}>
        <div>
          <button class="image-visualization__btn-close" onClick={closeImage}><GrFormClose /></button>
        <img src={showingImage && showingImage.url} alt={showingImage && showingImage.fileName} />
        </div>
      </div>
      <div id="image-visualization__backdrop" className={`${showingImage && !closingImage ? 'active' : ''}`}></div>
      <div id="product">
        <section id="product__info">
          <h1>{product.name}</h1>
          <div dangerouslySetInnerHTML={{__html: documentToHtmlString(product.description) }}></div>
          <a
            target="_blank"
            href={product.link}
            rel="noopener noreferrer"
            className="product__btn product__btn__buy-now">
              <FiShoppingCart /><span>Quero a minha agora!</span>
          </a>
        </section>
        <section id="product__images">
          {product.images.map((image, i) =>
            <article key={i} className="product__images__item" onClick={() => showImage(image)}>
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
          align-content: start;
        }
        .product__images__item {
          align-items: center;
          background: #fff;
          border-radius: 5px;
          box-sizing: border-box;
          cursor: pointer;
          display: flex;
          justify-content: center;
          height: 150px;
          width: 150px;
          opacity: .8;
          padding: 5px;
          overflow: hidden;
          transition: .25s all ease;
        }
        .product__images__item:hover {
          opacity: 1;
        }
        #product__images img {
          max-width: 100%;
          max-height: 100%;
        }
        .product__btn {
          align-items: center;
          background: rgba(255, 255, 255, .75);
          border: none;
          border-radius: 5px;
          color: #222;
          cursor: pointer;
          display: inline-flex;
          justify-content: flex-start;
          font-size: 16px;
          margin-top: 5vh;
          outline: none;
          text-decoration: none;
          padding: 10px 20px;
          transition: .3s all ease;
          opacity: .4;
        }
        .product__btn span {
          margin-left: 10px;
        }
        .product__btn__buy-now {
          background: #64ca62;
          font-weight: 600;
          opacity: 1;
        }
        .product__btn__buy-now:hover {
          background: #0aff05;
        }
        #image-visualization {
          align-items: center;
          box-shadow: 5px 5px 30px rgba(0,0,0,.6);
          border-radius: 5px;
          display: flex;
          justify-content: center;
          position: fixed;
          top: 5vh;
          left: 5vh;
          background: #fff;
          width: calc(100% - 10vh - 40px);
          max-height: calc(100% - 10vh - 40px);
          opacity: 1;
          padding: 20px;
          z-index: 10;
          transition: .3s all ease;
        }
        .image-visualization__btn-close {
          align-items: center;
          background: none;
          border: none;
          color: #333;
          cursor: pointer;
          display: flex;
          font-size: 2em;
          justify-content: center;
          outline: none;
          position: absolute;
          right: 1em;
          top: 1em;
        }
        #image-visualization img {
          max-height: calc(90vh - 20px);
          max-width: 100%;
        }
        #image-visualization__backdrop {
          background: rgba(0,0,0,.4);
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: .3s all ease;
        }
        #image-visualization:not(.active),
        #image-visualization__backdrop:not(.active) {
          opacity: 0;
          pointer-events: none;
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
    link: entry.fields.link,
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
