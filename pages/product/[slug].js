import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactGA from 'react-ga'
import { createClient }  from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { FiShoppingCart } from 'react-icons/fi';
import { GrFormClose } from 'react-icons/gr';
import { ANALYTICS_ID } from '../../defaults';
import MainLayout from '../../layouts/Main';
import Head from '../../components/Head';
import ProductThumbImage from '../../components/ProductThumbImage';

const Product = ({ product, products, slug }) => {

  ReactGA.initialize(ANALYTICS_ID)
  ReactGA.pageview(`product/${slug}`)
  
  const [showingImage, setShowingImage] = useState(null);
  const [closingImage, setClosingImage] = useState(false);
  const [showingOptions, setShowingOptions] = useState(
    typeof window !== 'undefined' && window.location.hash === '#options'
  );
  const [selectedProductOption, setSelectedProductOption] = useState(product ? product.options[0] : null);

  const closeImage = useCallback(() => {
    setClosingImage(true);

    setTimeout(() => {
      setShowingImage(null)
      setClosingImage(false)
    }, 300)
  }, []);

  const productOptionsRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      if (productOptionsRef.current) {
        productOptionsRef.current.scrollIntoView();
      }
    }, 500)
  }, [])

  if (!product) {
    return null
  }
  
  return (
    <>
      <Head title={`4DJ - ${product.name}`} description={product.shortDescription} />
      <MainLayout products={products}>
        <div id="image-visualization" className={`${showingImage && !closingImage ? 'active' : ''}`}>
          <div>
            <button
              aria-label="Fechar visualizador de imagens"
              name="close"
              className="image-visualization__btn-close"
              onClick={closeImage}><GrFormClose /></button>
            <img
              src={showingImage && showingImage.url}
              alt={
                showingImage
                ? showingImage.fileName
                : "Visualizador de imagens"
              } />
          </div>
        </div>
        <div id="image-visualization__backdrop" className={`${showingImage && !closingImage ? 'active' : ''}`}></div>
        <h1>{product.name}</h1>
        <div id="product">
          <section id="product__info">
            <div dangerouslySetInnerHTML={{__html: documentToHtmlString(product.description) }}></div>
            {
              showingOptions
              ? (
                <>
                  <h1>Opções de cores</h1>
                  <div className="product__options" ref={productOptionsRef}>
                    {product.options.map((option, i) =>
                      <ProductThumbImage
                        key={i}
                        image={option.fields.photo.fields.file}
                        onClick={() => {
                          setSelectedProductOption(option)

                          ReactGA.event({
                            category: 'Product',
                            action: 'Select in product option',
                            label: `View product ${slug} option: ${option.fields.name}`
                          })

                        }}
                        selected={option === selectedProductOption} />
                    )}
                  </div>
                  <a
                    target="_blank"
                    href={selectedProductOption.fields.pagseguroLink}
                    rel="noopener noreferrer"
                    className="product__btn product__btn__buy-now"
                    onClick={() => {
                      ReactGA.event({
                        category: 'Product',
                        action: 'User asks to buy',
                        label: `Order Now (${slug})`
                      })
                    }}>
                      <FiShoppingCart /><span>Comprar</span>
                  </a>
                  </>
                )
              : (
                <div className="product__btn product__btn__buy-now" onClick={() => setShowingOptions(true)}>
                  <span>Quero a minha agora!</span>
                </div>
              )
            }
          </section>
          <section id="product__images">
            {product.images.map((image, i) =>
              <ProductThumbImage key={i} image={image} onClick={() => {
                setShowingImage(image)

                ReactGA.event({
                  category: 'Product',
                  action: 'Click in product thumb',
                  label: `View ${slug} image`
                })
              }} />
            )}
          </section>
        </div>
        <style>{`
          h1 {
            font-size: 2.5em;
            margin: 1em 0 .5em 0;
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
            width: 495px;
          }
          #product__images article {
            align-items: center;
            display: inline-flex;
            justify-content: center;
            margin: 5px;
            overflow: hidden;
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
            opacity: .6;
            padding: 5px;
            overflow: hidden;
            transition: .25s all ease;
          }
          .product__images__item.selected {
            border: 3px solid #24d7ff;
            box-shadow: 0 0 7px rgb(25, 213, 255);
            opacity: 1;
          }
          .product__images__item:hover {
            opacity: 1;
          }
          .product__images__item img:not(.loader) {
            max-width: 100%;
            height: 75%;
            transition: .3s all ease;
          }
          .product__images__item img:not(.loader):not(.loaded) {
            opacity: 0;
          }
          .loader {
            filter: brightness(0.1);
            opacity: .4;
            position: absolute;
            transition: .3s all ease;
            width: 150px;
          }
          .loader:not(.active) {
            opacity: 0;
          }
          .product__options {
            display: flex;
            flex-wrap: wrap;
          }
          .product__options .product__images__item {
            margin: 5px;
          }

          @media screen and (max-width: 1024px) {

            h1 {
              margin-top: 2em;
              font-size: 1.75em;
              text-align: center;
            }

            #product {
              flex-direction: column-reverse;
            }

            #product__images {
              width: 100%;
            }

            #product__info {
              margin: 0;
              display: flex;
              flex-direction: column;
            }

            .product__images__item {
              width: calc(25% - 10px);
            }

            .product__images__item .loader {
              width: calc(25% - 10px);
            }

          }

          @media screen and (max-width: 768px) {

            .product__images__item {
              width: calc(33% - 10px);
            }

            .product__images__item .loader {
              width: calc(33% - 10px);
            }

          }

          @media screen and (max-width: 425px) {

            .product__images__item {
              width: calc(50% - 10px);
            }

            .product__images__item .loader {
              width: calc(50% - 10px);
            }

          }
        `}</style>
      </MainLayout>
    </>
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
    order: 'fields.name'
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

  const filteredOptions = await client.getEntries({
    content_type: 'productOption',
    'fields.product.sys.id': entry.sys.id
  });

  const product = {
    name: entry.fields.name,
    slogan: entry.fields.slogan,
    description: entry.fields.description,
    shortDescription: entry.fields.shortDescription,
    link: entry.fields.link,
    images: entry.fields.images.map(({ fields }) => {
      const { url, fileName } = fields.file
      return { url, fileName }
    }),
    options: filteredOptions.items
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
