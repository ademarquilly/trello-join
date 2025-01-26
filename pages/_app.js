import Head from 'next/head';
import '@styles/globals.css';
import '../styles/responsive.css';
import '../styles/inscription.css';
import '../styles/dashboard.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>  
        <link rel="icon" href="https://www.phenixconcilium.fr/wp-content/uploads/2024/05/cropped-favicon-phenix-logo-192x192.webp" />
        <title>{pageProps.title || 'Mise en relation - Phenix Recrutement'}</title>
        <meta name="robots" content="noindex nofollow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;