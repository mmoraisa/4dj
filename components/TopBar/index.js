import React from 'react';
import Link from 'next/link';
import { FiMail } from 'react-icons/fi';

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
      <a className="contact-mail" href="mailto:info@4dj.com.br"><FiMail /><span>info@4dj.com.br</span></a>
    </ul>
    <style>{`     
      #top-bar {
        display: flex;
        justify-content: space-between;
      } 
      .contact-mail {
        align-items: center;
        background: rgba(255,255,255,.05);
        border: 1px solid rgba(255,255,255,.2);
        border-radius: 10px;
        color: #fff;
        display: flex;
        margin-left: 3vw;
        font-weight: 600;
        opacity: .75;
        outline: none;
        padding: 5px 10px;
        text-decoration: none;
        transition: .25s all ease;
      }
      .contact-mail:hover {
        opacity: 1;
      }
      .contact-mail span {
        margin-left: 10px;
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
        font-size: 1.3em;
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
