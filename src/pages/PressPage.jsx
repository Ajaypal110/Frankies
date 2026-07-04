import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../config';
import { getCache, setCache } from '../utils/cacheHelper';
import MediaElement from '../components/MediaElement';
import Loading from '../components/Loading';

const PressPage = () => {
  const [data, setData] = useState(getCache('press') || {});
  const [isLoading, setIsLoading] = useState(!getCache('press'));

  useEffect(() => { 
    window.scrollTo(0, 0); 
    fetch(`${API_BASE_URL}/frankies/v1/press?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setCache('press', json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Could not load press data:", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  const pressItems = [
    {
      image: data?.press_1_image || 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      source: data?.press_1_source || 'WHAT NOW LOS ANGELES',
      headline: data?.press_1_headline || "Frankie's Breakfast Burritos Opening at The Roadside Plaza",
      description: data?.press_1_description || "The much-anticipated Frankie's Breakfast Burritos brings its iconic, award-winning street food flavors to Agoura Hills, expanding its footprint with a new permanent home.",
      url: data?.press_1_url || 'https://whatnow.com/los-angeles/restaurants/frankies-breakfast-burritos-opening-at-the-roadside-plaza/',
    },
    {
      image: data?.press_2_image || 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      source: data?.press_2_source || 'YOUTUBE / LOCAL NEWS',
      headline: data?.press_2_headline || "Watch Frankie's Breakfast Burritos Featured Live on Morning Broadcasting",
      description: data?.press_2_description || "Catch Frankie's on local TV as the team showcases the authentic marinades, fresh ingredients, and vibrant Mexican culture that go into perfectly rolling an award-winning breakfast burrito.",
      url: data?.press_2_url || 'https://www.youtube.com/watch?v=m9sP_EKcGOI',
    },
    {
      image: data?.press_3_image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      source: data?.press_3_source || 'INSTAGRAM',
      headline: data?.press_3_headline || "Join the Frankie's Community and Follow the Journey on Instagram",
      description: data?.press_3_description || "Follow us @frankiesburritos to catch our daily menu specials, vibrant community moments, and exclusive behind-the-scenes content straight from our lively West Coast kitchen.",
      url: data?.press_3_url || 'https://www.instagram.com/frankiesburritos/',
    },
    {
      image: data?.press_4_image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      source: data?.press_4_source || 'ORDER ONLINE',
      headline: data?.press_4_headline || "Craving Frankie's? Order Ahead for Pickup via Toast",
      description: data?.press_4_description || "Our integrated Toast platform makes it easier than ever to get your hands on our renowned burritos. Place your order online right now to skip the queue and grab your food hot and fresh.",
      url: data?.press_4_url || 'https://frankiesbreakfastburritos.toast.site/',
    },
  ];

  return (
    <div style={{ background: '#fff', overflowX: 'hidden' }}>
      <style>{`
        @media (max-width: 768px) {
          .press-header { padding-top: 120px !important; padding-bottom: 20px !important; }
          .press-grid-section { padding: 0 20px 60px 20px !important; }
          .press-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .press-image-container { height: 240px !important; }
        }
      `}</style>
      <section className="press-header" style={{
        background: '#ffffff', color: '#1a1a1a', textAlign: 'center',
        paddingTop: '160px', paddingBottom: '40px', paddingLeft: '24px', paddingRight: '24px',
      }}>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 400, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Press</h1>
      </section>

      <section className="press-grid-section" style={{ background: '#ffffff', padding: '0 40px 100px 40px' }}>
        <div className="press-grid" style={{ 
          maxWidth: '1200px', margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '60px 40px'
        }}>
          {pressItems.map((item, idx) => {
            if (!item.headline) return null; // If they empty a slot in WP, skip it
            return (
              <a key={idx} href={item.url} target="_blank" rel="noopener noreferrer" className="safe-hover-translate" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}>
                <div className="press-image-container" style={{ width: '100%', height: '320px', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#eee', marginBottom: '24px' }}>
                  <MediaElement src={item.image} alt={item.source} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <p style={{ fontFamily: '"Courier Prime", monospace', fontSize: 'clamp(14px, 2vw, 18px)', fontWeight: 700, textTransform: 'uppercase', color: '#000', marginBottom: '12px' }}>{item.source}</p>
                <h3 style={{ fontFamily: '"Courier Prime", monospace', fontSize: 'clamp(13px, 1.8vw, 16px)', fontWeight: 700, lineHeight: 1.6, color: '#1a1a1a', marginBottom: '12px' }}>{item.headline}</h3>
                <p style={{ fontFamily: '"Times New Roman", Times, serif', fontSize: '15px', fontWeight: 400, lineHeight: 1.6, color: '#444' }}>{item.description}</p>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default PressPage;
