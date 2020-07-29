import Document, { Html, Head, Main, NextScript } from 'next/document'
import ReactGA from 'react-ga'

ReactGA.initialize('UA-173930791-1')

class MyDocument extends Document {

  render () {
    return (
      <Html lang="pt-br">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

}

export default MyDocument
