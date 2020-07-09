import Header from 'next/head';

const Head = ({ title = '4DJ', description = "Products 4 DJs" }) => (
  <Header>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <meta name="og:description" content={description} />
    <meta name="theme-color" content="#161e32"></meta>
    <meta charSet="utf-8" />
    <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400;700&display=swap" rel="stylesheet"></link>
    <style>{`
      html, body {
        color: #fff;
        font-family: 'Source Sans Pro', sans-serif;
        min-height: 100vh;
        width: 100%;
        overflow-x: hidden;
        padding: 5vw 10vw;
        margin: 0;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
      }
    `}</style>
  </Header>
);

export default Head;
