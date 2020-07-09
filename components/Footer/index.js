import React from 'react';

const Footer = () => (
  <>
    <footer>
      <h1>Nos siga nas redes sociais</h1>
      <section id="social-media">
        <a href="#">
          <img src="" width="100px" />
        </a>
        <a href="#">
          <img src="" width="120px" />
        </a>
        <a href="#">
          <img src="" width="50px" />
        </a>
      </section>
    </footer>
    <style>{`
      footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-top: 5vh;
        text-align: center;
      }
      footer h1 {
        text-transform: uppercase;
        font-size: 1.6em;
        font-weight: bold;
      }
      #social-media {
        display: flex;
        justify-content: center;
      }
      #social-media a {
        margin: 20px;
      }
      #social-media img {
        height: 50px;
      }
    `}</style>
  </>
)

export default Footer;
