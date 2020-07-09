import React from 'react';
import Link from 'next/link';

const TopBar = () => (
  <section id="top-bar">
    <img id="main-logo" src="/logo.png" alt="Logo da 4DJ" />
    <ul className="top-bar__menu">
      <Link href="/product/[slug]" as="/product/bag">
        <li>Mochila DJ</li>
      </Link>
      <Link href="/product/[slug]" as="/product/headphone-bag">
        <li>Porta fone</li>
      </Link>
    </ul>
    <style>{`     
      #top-bar {
        display: flex;
        justify-content: space-between;
      } 
      #main-logo {
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
        font-weight: 200;
        transition: .25s all ease;
      }
      .top-bar__menu li:hover {
        font-weight: bold;
        text-shadow: 0px 3px 9px rgba(0, 0, 0, 0.2);
      }
    `}</style>
  </section>
)

export default TopBar;
