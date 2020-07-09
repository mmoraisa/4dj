import React from 'react';

const Footer = () => (
  <>
    <footer>
      <h1>Nos siga nas redes sociais</h1>
      <section id="social-media">
        <a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/4djoficial">
          <img alt="Instagram logo" src="/insta.png"/>
          <span>@4DJOficial</span>
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
        align-items: flex-start;
        display: flex;
        justify-content: center;
      }
      #social-media a {
        align-items: center;
        display: flex;
        margin: 20px;
        text-decoration: none;
      }
      #social-media img {
        width: 50px;
      }
      #social-media span {
        color: #fff;
        font-size: 20px;
        font-weight: 600;
        margin-left: 10px;
      }
    `}</style>
  </>
)

export default Footer;
