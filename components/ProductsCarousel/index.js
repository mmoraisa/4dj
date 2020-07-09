import React, { useEffect, useState } from 'react';
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from 'react-icons/fa';
import ProductCard from '../ProductCard';

const ProductsCarousel = ({ products }) => {

  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [lastProductIndex, setLastProductIndex] = useState(null);

  useEffect(() => {
    setCurrentProductIndex(0)
    setLastProductIndex(null)
  }, [products])

  const callPreviousProduct = () => {

    const getPreviousProductIndex = () =>
      products[currentProductIndex - 1]
      ? currentProductIndex - 1
      : products.length - 1;

    setLastProductIndex(currentProductIndex)
    setCurrentProductIndex(getPreviousProductIndex())
  }

  const callNextProduct = () => {

    const getNextProductIndex = () =>
      products[currentProductIndex + 1]
      ? currentProductIndex + 1
      : 0;

    setLastProductIndex(currentProductIndex)
    setCurrentProductIndex(getNextProductIndex())
  }

  return (
    <>
      <section id="products-carousel">
        {
          products.map((product, index) =>
            <div className={`
              products-carousel__product
              ${index === currentProductIndex ? ' active ' : ''}
              ${index > currentProductIndex ? ' to-right ' : ' to-left '}
            `}>
              <ProductCard
                key={index}
                product={product} />  
            </div>
          )
        }
        <button
          className="products-carousel__btn-control products-carousel__btn-control__previous"
          onClick={callPreviousProduct}><FaRegArrowAltCircleLeft /></button>
        <button
          className="products-carousel__btn-control products-carousel__btn-control__next"
          onClick={callNextProduct}><FaRegArrowAltCircleRight /></button>
      </section>
      <style>{`
        #products-carousel {
          align-items: center;
          display: flex;
          height: 55vh;
          position: relative;
          will-change: left;
        }
        .products-carousel__product {
          position: absolute;
          pointer-events: none;
          transition: 1s all ease;
          top: 0;
          width: 80vw;
        }
        .products-carousel__product.active {
          left: 0;
        }
        .products-carousel__product:not(.active).to-left {
          left: -100vw;
        }
        .products-carousel__product:not(.active).to-right {
          left: 100vw;
        }
        .products-carousel__btn-control {
          align-items: center;
          background: rgba(255,255,255,.02);
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,.1);
          display: flex;
          font-size: 30px;
          height: 80px;
          justify-content: center;
          text-align: center;
          transition: .25s all ease;
          outline: none;
          position: relative;
          width: 60px;
        }
        .products-carousel__btn-control:hover {
          color: rgba(255,255,255,.5);
        }
        .products-carousel__btn-control__previous {
          border-radius: 10px 0 0 10px;
          left: -7vw;
        }
        .products-carousel__btn-control__next {
          border-radius: 0 10px 10px 0;
          left: 80vw;
        }
      `}</style>
    </>
  )
}

export default ProductsCarousel;
