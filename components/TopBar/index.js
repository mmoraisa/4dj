import React from 'react';
import Link from 'next/link';

const TopBar = ({ products }) => (
  <section id="top-bar">
    <Link href="/">
      <img id="main-logo" src="/logo.png" alt="Logo da 4DJ" />
    </Link>
    <ul className="top-bar__menu">
      <Link href="/">
        <li>Início</li>
      </Link>
      {
        products && products.map(product => (
          <Link key={product.slug} href="/product/[slug]" as={`/product/${product.slug}`}>
            <li>{product.name}</li>
          </Link>
        ))
      }
    </ul>
    <style>{`     
      #top-bar {
        display: flex;
        justify-content: space-between;
      } 
      #main-logo {
        cursor: pointer;
        width: 150px;
      }
      .top-bar__menu {
        align-items: center;
        display: flex;
      }
      .top-bar__menu li {
        cursor: pointer;
        list-style: none;
        padding: 20px;
        text-transform: uppercase;
        font-size: .9em;
        font-weight: 600;
        opacity: .6;
        transition: .25s all ease;
      }
      .top-bar__menu li:hover {
        opacity: 1;
        text-shadow: 0px 3px 9px rgba(0, 0, 0, 0.2);
      }
    `}</style>
  </section>
)

export default TopBar;
