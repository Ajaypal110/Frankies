import React from 'react';
import MediaElement from './MediaElement';

const ImageGrid = ({ data }) => {
  const img1 = data?.grid_image_1_url || "/grid-cocktail.png";
  const img2 = data?.grid_image_2_url || "/grid-calamari.png";
  const img3 = data?.grid_image_3_url || "/grid-oysters.png";
  const img4 = data?.grid_image_4_url || "/grid-churros.png";

  return (
    <section style={{
      position: 'relative',
      zIndex: 40, 
      backgroundColor: '#ffffff',
      padding: '0 0 16px 0',
      width: '100%',
    }}>
      <style>{`
        /* Desktop Heights */
        .img-h-small { height: 450px; }
        .img-h-med { height: 600px; }
        .img-h-vsmall { height: 300px; }

        @media (max-width: 768px) {
          .image-grid-container {
            gap: 4px !important;
            padding: 0 4px !important;
          }
          .image-col {
            gap: 4px !important;
          }
          /* Scaled Mobile Heights */
          .img-h-small { height: 200px !important; }
          .img-h-med { height: 280px !important; }
          .img-h-vsmall { height: 120px !important; }
        }
      `}</style>
      <div 
        className="image-grid-container"
        style={{
          display: 'flex',
          width: '100%',
          gap: '8px',
          padding: '0',
          boxSizing: 'border-box'
        }}>
        {/* Left Column */}
        <div className="image-col" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MediaElement 
            className="image-item img-h-small"
            src={img1} 
            alt="Signature Cocktail" 
            style={{ width: '100%', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
          <MediaElement 
            className="image-item img-h-small"
            src={img2} 
            alt="Fried Calamari" 
            style={{ width: '100%', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
        </div>

        {/* Right Column */}
        <div className="image-col" style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <MediaElement 
            className="image-item img-h-med"
            src={img3} 
            alt="Oyster Platter" 
            style={{ width: '100%', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
          <MediaElement 
            className="image-item img-h-vsmall"
            src={img4} 
            alt="Churros with Chocolate" 
            style={{ width: '100%', objectFit: 'cover', display: 'block', background: '#eee' }}
          />
        </div>
      </div>
    </section>
  );
};

export default ImageGrid;
