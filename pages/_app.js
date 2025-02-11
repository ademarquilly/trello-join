import Head from 'next/head';
import '@styles/globals.css';
import '../styles/responsive.css';
import '../styles/board.css';
import { key } from './get-link'; // Import the key
import { useEffect, useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [isValidInvite, setIsValidInvite] = useState(true);
  const [boardName, setBoardName] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const invite = searchParams.get('invite');
      const board = searchParams.get('board') || null;
      setBoardName(board);
      if (invite !== key) {
        setIsValidInvite(false);
      }
    }
  }, []);

  return (
    <>
      <Head>  
        <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/732/732252.png" />
        <title>{isValidInvite ? (pageProps.title || `Join "${boardName}" Board | Trello`) : 'Invitation invalide | Trello'}</title>
        <meta name="robots" content="noindex nofollow" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;