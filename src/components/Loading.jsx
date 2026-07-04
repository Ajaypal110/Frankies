import React from 'react';

const Loading = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: '#F5F1EB', // Matching site background
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      transition: 'opacity 0.5s ease'
    }}>
      <div style={{
        position: 'relative',
        width: '120px',
        height: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Simple elegant pulse animation for the logo placeholder */}
        <img 
          src="/logo.png" 
          alt="Loading..." 
          style={{
            width: '80px',
            height: 'auto',
            animation: 'pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            filter: 'grayscale(1)'
          }}
        />
        
        {/* Rotating outer ring for extra "premium" feel */}
        <div style={{
          position: 'absolute',
          inset: 0,
          border: '2px solid rgba(26, 26, 26, 0.05)',
          borderTop: '2px solid #1a1a1a',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
      </div>

      <p style={{
        marginTop: '24px',
        fontFamily: '"Montserrat", sans-serif',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: '#1a1a1a',
        opacity: 0.6
      }}>
        Loading Experience
      </p>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.95); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
