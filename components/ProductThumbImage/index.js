import React, { useEffect, useRef, useState } from 'react';

const ProductThumbImage = ({ image, onClick }) => {

  const imageRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (imageRef && imageRef.current) {

      if (imageRef.current.complete) {
        setLoading(false)
        setLoaded(true)
      }
      else {
        setLoading(true)
        setLoaded(false)
      }

    }
    else {
      setLoading(false)
      setLoaded(false)
    }

  }, [imageRef])

  return (
    <>
      <article className="product__images__item" onClick={loading ? () => {} : onClick}>
        <img
          alt="Indicador de carregamento"
          className={`loader ${loading && 'active'}`}
          src="/loading.svg" />
        <img
          className={loaded ? 'loaded' : ''}
          src={image.url}
          alt={image.fileName}
          onLoad={() => {
            setLoading(false)
            setLoaded(true)
          }}
          ref={imageRef} />
      </article>
      <style>{`
        .product__images__item {
          align-items: center;
          background: #fff;
          border-radius: 5px;
          box-sizing: border-box;
          cursor: ${loading ? 'wait' : 'pointer'};
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
        .product__images__item img {
          max-width: 100%;
          max-height: 100%;
          transition: .3s all ease;
        }
        .product__images__item img:not(.loader):not(.loaded) {
          opacity: 0;
        }
        .loader {
          filter: brightness(0.1);
          opacity: .4;
          position: absolute;
          margin-left: -100px;
          margin-top: -100px;
          transition: .3s all ease;
        }
        .loader:not(.active) {
          opacity: 0;
        }
      `}</style>
    </>
)
}

export default ProductThumbImage;
