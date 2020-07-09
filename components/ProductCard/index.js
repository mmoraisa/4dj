import React from 'react';
import Link from 'next/link';
import { FiShoppingCart } from 'react-icons/fi';

const ProductCard = ({ product }) => (
  <>
    <article className="product-card">
      <div>
        <h1>{product.name}</h1>
        <h2>{product.slogan}</h2>
        <p>{product.shortDescription}</p>
        <div className="product-card__control">
          <Link href="/product/[slug]" as={`/product/${product.slug}`}>
            <button className="product-card__btn">Mais informações</button>
          </Link>
          <a
            target="_blank"
            href={product.link}
            className="product-card__btn product-card__btn__buy-now">
              <FiShoppingCart /><span>Quero a minha agora!</span>
          </a>
        </div>
      </div>
      <img src={product.featuredImage.url} alt={product.featuredImage.fileName} />
    </article>
    <style>{`
      .product-card {
        align-items: center;
        display: flex;
        margin-top: 5vh;
      }
      .product-card h1 {
        font-size: 3em;
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
        font-size: 1em;
        font-weight: 300;
        margin-bottom: 4em;
      }
      .product-card img {
        box-shadow: 5px 5px 50px rgba(0,0,0,.75);
        display: flex;
        margin-left: 10vh;
        height: 50vh;
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
    `}</style>
  </>
)

export default ProductCard;
