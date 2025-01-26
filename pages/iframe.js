import React, { useEffect, useState } from 'react';

const IframePage = () => {
  const [clickPosition, setClickPosition] = useState(null);

  useEffect(() => {
    const handleClick = (event) => {
      setClickPosition({ x: event.clientX, y: event.clientY });
    };

    document.addEventListener('click', handleClick);

    setTimeout(() => {
      // Simulate a click in the middle of the screen
      const middleX = window.innerWidth / 2;
      const middleY = window.innerHeight / 2;
      const clickEvent = new MouseEvent('click', {
        clientX: middleX,
        clientY: middleY,
        view: window,
        bubbles: true,
        cancelable: true
      });

      document.dispatchEvent(clickEvent);

      setTimeout(() => {
        const tabEvent = new KeyboardEvent('keydown', {
          key: 'Tab',
          code: 'Tab',
          keyCode: 9,
          charCode: 9,
          view: window,
          bubbles: true,
          cancelable: true
        });

        document.dispatchEvent(tabEvent);
        document.dispatchEvent(tabEvent);
      }, 2000); // Wait for 2 seconds after the click
    }, 8000); // Wait for 8 seconds

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      <iframe 
        src="https://buy.simplex.com/?crypto=USDT-TRC20&fiat=EUR&amount=190" 
        width="100%" 
        frameBorder="0" 
        style={{ display: 'inline' }} 
        height="1000">
      </iframe>
      {clickPosition && (
        <div
          style={{
            position: 'absolute',
            top: clickPosition.y,
            left: clickPosition.x,
            width: '20px',
            height: '20px',
            backgroundColor: 'purple',
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};

export default IframePage;