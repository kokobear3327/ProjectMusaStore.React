import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

// This is how you implement server-side rendering.  See the docs for next.js, you need to add this custom document.  Then copy the logic for styled-components to inject the server-side rendered
//   styles into the head.  Using getInitialProps is integrated, where this runs before the render.  The ...collectStyles method is also important

// Note:  This is literally copy/pasted from the next.js documentation

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html>
        <Head>{this.props.styleTags}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}