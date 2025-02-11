import Head from 'next/head';
import '@styles/globals.css';
import '../styles/responsive.css';
import '../styles/board.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>  
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/732/732252.png" />
        <title>{pageProps.title || 'Trello Join "Comptabilité 24-25" Board'}</title>
        <meta name="robots" content="noindex nofollow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;