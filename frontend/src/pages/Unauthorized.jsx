import React from 'react';

const Unauthorized = () => {
  const styles = {
    app: {
      padding: '1rem',
      background: 'black',
      display: 'flex',
      height: '100vh', // Menggunakan 100% viewport height untuk fullscreen
      width: '100vw', // Menggunakan 100% viewport width
      justifyContent: 'center',
      alignItems: 'center',
      color: '#54FE55',
      textShadow: '0px 0px 10px #54FE55',
      fontSize: '6rem',
      flexDirection: 'column',
      fontFamily: "'Press Start 2P', cursive", // Pastikan font ini digunakan
    },
    txt: {
      fontSize: '1.8rem',
    },
    blink: {
      animation: 'blink 1s infinite',
    },
  };

  return (
    <div id="app" style={styles.app}>
      <div>403</div>
      <div className="txt" style={styles.txt}>
        Forbidden<span className="blink" style={styles.blink}>_</span>
      </div>

      <style>{`
        @keyframes blink {
          0%   { opacity: 0; }
          49%  { opacity: 0; }
          50%  { opacity: 1; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Unauthorized;
