import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SlidingGallery from '../components/SlidingGallery';
import MediaElement from '../components/MediaElement';
import { API_BASE_URL } from '../config';
import { getCache, setCache } from '../utils/cacheHelper';
import Loading from '../components/Loading';

const AgouraHillsPage = () => {
  const [data, setData] = useState(getCache('agoura') || {});
  const [isLoading, setIsLoading] = useState(!getCache('agoura'));

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/frankies/v1/agoura?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setCache('agoura', json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Could not load agoura data:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  const heroImage = data?.hero_image_url || '/locations-agoura.png';
  const narrativeText = data?.narrative_text || "Nestled in the heart of the Santa Monica Mountains canyons, Frankies Agoura Hills brings the award-winning street food soul of MiMo to the West Coast. With a focus on rugged mountain aesthetics and modern rustic charm, it's a destination for those who appreciate pure quality and cinematic atmosphere.";
  const hoursText = data?.hours_text || "Sunday–Wednesday 11am–10pm\nThursday–Saturday 11am–11pm\n\n28708 Roadside Drive, Agoura Hills, CA";
  const happyHourText = data?.happy_hour || "Monday–Friday 3pm–6pm";

  return (
    <div style={{ background: '#F5F1EB', minHeight: '100vh', opacity: 1, visibility: 'visible' }}>
      <style>{`
        .agoura-grid-item { text-align: left; }
        .agoura-happy-hour { text-align: right; }
        @media (max-width: 768px) {
          .agoura-grid-container { grid-template-columns: 1fr !important; gap: 40px !important; text-align: left !important; }
          .agoura-grid-item, .agoura-happy-hour { text-align: left !important; }
          .agoura-narrative-section { padding: 60px 20px !important; }
        }
      `}</style>

      <section style={{ 
        position: 'relative', height: '60vh', width: '100%', display: 'flex', 
        alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
        background: '#1a1a1a', opacity: 1, visibility: 'visible'
      }}>
        <MediaElement 
          src={heroImage} 
          alt="Frankie's Agoura Hills" 
          loading="eager"
          style={{ 
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.8
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{
            color: '#ffffff', fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(40px, 8vw, 100px)', fontWeight: 900,
            letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1,
            textShadow: '2px 2px 20px rgba(0,0,0,0.3)'
          }}>
            AGOURA<br />HILLS
          </h1>
        </div>
      </section>

      <section className="agoura-narrative-section" style={{ background: '#ffffff', padding: '80px 40px 100px 40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{
              fontFamily: '"Courier Prime", monospace', fontSize: '17px',
              fontWeight: 400, lineHeight: 1.8, letterSpacing: '0.02em',
              color: '#333', marginBottom: '60px',
              whiteSpace: 'pre-wrap'
            }}>{narrativeText}</p>
            
            <div style={{ marginTop: '60px', marginBottom: '40px', display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Link to="/agourahillsmenu" className="agoura-menu-btn">View Menu</Link>
            </div>

            <div className="agoura-grid-container" style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '60px', borderTop: '1px solid #eee', paddingTop: '60px'
            }}>
              <div className="agoura-grid-item">
                <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '20px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '20px' }}>HOURS & LOCATION</h4>
                <p style={{ fontFamily: '"Courier Prime", monospace', fontSize: '14px', lineHeight: 1.6, color: '#333', whiteSpace: 'pre-wrap' }}>{hoursText}</p>
              </div>

              <div className="agoura-happy-hour">
                <h4 style={{ fontFamily: '"Courier Prime", monospace', fontSize: '20px', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '20px' }}>HAPPY HOUR</h4>
                <p style={{ fontFamily: '"Courier Prime", monospace', fontSize: '14px', lineHeight: 1.6, color: '#333', whiteSpace: 'pre-wrap' }}>{happyHourText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SlidingGallery galleryImages={
        data ? Object.keys(data)
          .filter(key => key.startsWith('agoura_gallery_') && key.endsWith('_image'))
          .sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
          })
          .map(key => data[key])
          .filter(Boolean) : []
      } />
    </div>
  );
};

export default AgouraHillsPage;
