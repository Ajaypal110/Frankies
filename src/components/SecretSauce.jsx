import React, { useEffect, useRef } from 'react';

const SecretSauce = ({ data }) => {
  const sectionRef = useRef(null);
  
  const bottomBody = data?.secret_sauce_body || "WITH THE CELEBRATION OF OUR CULINARY PASSION, FRANKIE'S FEATURES HAND-PRESSED TORTILLAS MADE FROM HEIRLOOM CORN SOURCED FROM OAXACA AND SIGNATURE BARBACOA CRAFTED FROM SHORT-RIB, OXTAIL, AND BEEF CHEEK, ALL SLOW-BRAISED WITH MEXICAN CHILIS TO DEVELOP RICH, AUTHENTIC FLAVORS.";

  const topBody = data?.secret_sauce_intro || "FRANKIE'S IS AN EXPLORATION OF AUTHENTIC MEXICAN STREET FOOD THROUGH THE LENS OF CHEF NUNO. SOURCING FRESHEST LOCAL PRODUCE AND HIGHEST QUALITY MEATS AND SEAFOOD.";

  const heading = data?.secret_sauce_heading || "THE SECRET SAUCE OF FRANKIE'S";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.fade-in').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 150);
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="secret-sauce-section" style={{
      position: 'relative',
      zIndex: 10,
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      padding: '120px 40px',
      overflow: 'hidden'
    }}>
      <style>{`
        @media (max-width: 768px) {
          .secret-sauce-section {
            padding: 60px 20px !important;
          }
          .secret-sauce-row {
            flex-direction: column !important;
            gap: 20px !important;
            align-items: flex-start !important;
          }
          .secret-sauce-row h2, .secret-sauce-row p {
            flex: none !important; /* Fix: prevents flex-basis being used as height */
            width: 100% !important;
          }
          .skull-container {
            gap: 40px !important;
          }
          .skull-animate, .skull-animate-reverse {
            height: 120px !important;
          }
        }
      `}</style>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '80px' }}>
        
        {/* Top Row */}
        <div 
          className="secret-sauce-row fade-in"
          style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <h2 style={{
            flex: '1 1 300px',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(32px, 4vw, 42px)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            {data?.secret_sauce_title || "FRANKIE'S"}
          </h2>
          <p style={{
            flex: '2 1 500px',
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: 'clamp(14px, 1.5vw, 18px)',
            fontWeight: 600,
            lineHeight: 1.8,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            {topBody}
          </p>
        </div>

        {/* Skulls Row */}
        <div className="fade-in skull-container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 'clamp(20px, 8vw, 250px)',
          flexWrap: 'wrap',
          padding: '20px 0',
          width: '100%',
        }}>
          {[...Array(4)].map((_, i) => (
            <div key={i} style={{
              transform: `translateY(${i % 2 === 0 ? '20px' : '-20px'})`
            }}>
              <img 
                className={i % 2 === 0 ? "skull-animate" : "skull-animate-reverse"}
                src="/skull.avif" 
                alt="Artistic Skull Logo" 
                style={{
                  width: 'auto',
                  height: 'clamp(100px, 18vw, 220px)',
                  objectFit: 'contain'
                }}
              />
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div 
          className="secret-sauce-row fade-in"
          style={{ display: 'flex', justifyContent: 'space-between', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <h2 style={{
            flex: '1 1 300px',
            fontFamily: '"Playfair Display", Georgia, serif',
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            {heading}
          </h2>
          <p style={{
            flex: '2 1 500px',
            fontFamily: '"Montserrat", sans-serif',
            fontSize: 'clamp(11px, 1.2vw, 14px)',
            fontWeight: 500,
            lineHeight: 2,
            letterSpacing: '0.15em',
            textTransform: 'uppercase'
          }}>
            {bottomBody}
          </p>
        </div>

      </div>
    </section>
  );
};

export default SecretSauce;
