import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MediaElement from '../components/MediaElement';
import { API_BASE_URL } from '../config';
import { getCache, setCache } from '../utils/cacheHelper';
import Loading from '../components/Loading';

const LocationsPage = () => {
  const [data, setData] = useState(getCache('locations') || {});
  const [isLoading, setIsLoading] = useState(!getCache('locations'));

  useEffect(() => { 
    window.scrollTo(0, 0); 
    fetch(`${API_BASE_URL}/frankies/v1/locations?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setCache('locations', json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Could not load locations data:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  const introTitle = data?.intro_title || 'LOCATIONS';

  const locations = data ? Object.keys(data)
    .filter(key => key.startsWith('location_') && key.endsWith('_name'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    })
    .map(key => {
      const index = key.match(/\d+/)[0];
      return {
        name: data[key],
        city: data[`location_${index}_city`],
        address: data[`location_${index}_address`],
        menuLink: data[`location_${index}_link`],
        image: data[`location_${index}_image`],
      };
    })
    .filter(loc => loc.name) : [
      {
        name: 'Agoura Hills',
        city: 'Agoura Hills',
        address: '28708 Roadside Drive, Agoura Hills, CA',
        menuLink: '/agoura',
        image: '/locations-agoura.png',
      },
    ];

  return (
    <div style={{ overflowX: 'hidden' }}>
      <section className="locations-hero" style={{
        position: 'relative', 
        height: '35vh',
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center', 
        overflow: 'hidden',
        background: '#1a1a1a',
      }}>
        <h1 style={{
          color: '#F5F1EB', 
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(32px, 8vw, 48px)',
          fontWeight: 400,
          letterSpacing: '0.15em', 
          textTransform: 'uppercase',
          marginTop: '60px',
          textAlign: 'center',
          padding: '0 20px'
        }}>Locations</h1>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .locations-hero {
            height: 25vh !important;
          }
        }
      `}</style>

      <section className="section-padding" style={{ background: '#F5F1EB', padding: 'clamp(40px, 10vw, 80px) 20px' }}>
        <div style={{
          maxWidth: '600px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr',
          gap: '60px',
        }}>
          {locations.map((loc, idx) => (
            <Link key={idx} to={loc.menuLink || '/agoura'} style={{ textDecoration: 'none', color: 'inherit', display: 'block', opacity: 1, visibility: 'visible' }}>
              <div style={{
                overflow: 'hidden', position: 'relative',
                aspectRatio: '4/3', marginBottom: '24px',
              }}>
                <MediaElement src={loc.image} alt={loc.name} className="safe-hover-scale" style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                }} />
              </div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 5vw, 28px)',
                fontWeight: 400, letterSpacing: '0.12em', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>{loc.name}</h3>
              <p style={{
                fontFamily: '"Montserrat", sans-serif', fontSize: '10px',
                fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase',
                color: '#8a8580', marginBottom: '4px',
              }}>{loc.city}</p>
              <p style={{
                fontFamily: '"Cormorant Garamond", serif', fontSize: '15px',
                fontWeight: 300, color: '#2d2d2d', letterSpacing: '0.02em',
                marginBottom: '24px'
              }}>{loc.address}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LocationsPage;
