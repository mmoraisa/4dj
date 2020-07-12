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
      setLoading(true)
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
    </>
)
}

export default ProductThumbImage;
