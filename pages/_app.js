import Head from 'next/head';
import '@styles/globals.css';
import '../styles/responsive.css';
import '../styles/inscription.css';
import '../styles/dashboard.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>  
        <link rel="icon" href="https://www.keltis.fr/wp-content/uploads/2021/08/cropped-logo-2-290x290.png" />
        <title>{pageProps.title || 'Mise en relation - Keltis'}</title>
        <meta name="robots" content="noindex nofollow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;