import Head from 'next/head';
import '@styles/globals.css';
import '../styles/responsive.css';
import '../styles/board.css';

//http://localhost:3000/board?invite=32fdG17bHvc2O9vZ&owner=Antonin%20Bourard&board=Compta%20Semophors%2024-25&members=7&tasks=64&creation=19/12/2024

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