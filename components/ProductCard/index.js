import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => {

  const [imageLoading, setImageLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef && imageRef.current) {
      
      if (imageRef.current.complete) {
        setImageLoading(false)
        setImageLoaded(true)
      }
      else {
        setImageLoading(true)
        setImageLoaded(false)
      }

    }
    else {
      setImageLoading(false)
      setImageLoaded(false)
    }
  }, [imageRef])

  return (
    <>
      <article className="product-card">
        <div>
          <h1>{product.name}</h1>
          <p>{product.shortDescription}</p>
          <div className="product-card__control">
            <Link href="/product/[slug]" as={`/product/${product.slug}`}>
              <button className="product-card__btn">Mais informações</button>
            </Link>
            <a
              target="_blank"
              href={product.link}
              rel="noopener noreferrer"
              className="product-card__btn product-card__btn__buy-now">
                <FiShoppingCart /><span>Quero a minha agora!</span>
            </a>
          </div>
        </div>
        <div className="product-image">
          <img
            alt="Indicador de carregamento"
            className={`loader ${imageLoading && 'active'}`}
            src="loading.svg" />
          <img
            alt={product.featuredImage.fileName}
            className={imageLoaded ? 'loaded' : ''}
            onLoad={() => {
              setImageLoading(false)
              setImageLoaded(true)
            }}
            ref={imageRef}
            src={product.featuredImage.url}
            />
        </div>
      </article>
      <style>{`
        .product-card {
          align-items: center;
          display: flex;
          margin-top: 5vh;
          height: 50vh;
        }
        .product-card > div {
          flex: 1;
        }
        .product-card h1 {
          font-size: 2.5em;
          font-weight: bold;
          margin: 0;
          text-transform: uppercase;
        }
        .product-card h2 {
          font-size: 2em;
          font-weight: 400;
          margin: 0;
          text-transform: uppercase;
        }
        .product-card p {
          font-size: 1.5em;
          font-weight: 300;
          margin-bottom: 4em;
        }
        .product-card img {
          display: flex;
          margin-left: 10vh;
          max-height: 50vh;
        }
        .product-card__control {
          display: flex;
          pointer-events: all;
          z-index: 1;
        }
        .product-card__btn {
          align-items: center;
          background: rgba(255, 255, 255, .75);
          border: none;
          border-radius: 5px;
          color: #222;
          cursor: pointer;
          display: flex;
          font-size: 16px;
          outline: none;
          text-decoration: none;
          padding: 10px 20px;
          transition: .3s all ease;
          opacity: .4;
        }
        .product-card__btn:hover {
          box-shadow: 3px 3px 15px rgba(0,0,0,.5);
          opacity: .75;
        }
        .product-card__btn span {
          margin-left: 10px;
        }
        .product-card__btn:not(:first-child) {
          margin-left: 10px;
        }
        .product-card__btn__buy-now {
          background: #64ca62;
          font-weight: 600;
          opacity: 1;
        }
        .product-card__btn__buy-now:hover {
          background: #0aff05;
        }
        .product-image {
          align-items: center;
          display: flex;
          justify-content: center;
        }
        .product-image img:not(.loader) {
          transition: .3s all ease;
        }
        .product-image img:not(.loader):not(.loaded) {
          opacity: 0;
        }
        .loader {
          opacity: .4;
          position: absolute;
          transition: .3s all ease;
          width: 250px;
        }
        .loader:not(.active) {
          opacity: 0;
        }
      `}</style>
    </>
  )
}

export default ProductCard;
