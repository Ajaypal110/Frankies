import React, { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../config';
import MediaElement from '../components/MediaElement';
import { getCache, setCache } from '../utils/cacheHelper';
import Loading from '../components/Loading';

const AboutPage = () => {
  const sectionRef = useRef(null);
  const [data, setData] = useState(getCache('about') || {});
  const [isLoading, setIsLoading] = useState(!getCache('about'));

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Fetch dynamic about page data (appended timestamp to prevent aggressive browser caching)
    fetch(`${API_BASE_URL}/frankies/v1/about?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setCache('about', json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Failed to load About page content:", err);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isLoading || !sectionRef.current) return;

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
      { threshold: 0.1 }
    );

    sectionRef.current.querySelectorAll('section').forEach(s => observer.observe(s));
    
    return () => observer.disconnect();
  }, [isLoading]);

  // Set up fallbacks gracefully matching the original static content
  const introTitle = data?.intro_title || "GET TO KNOW US";
  const intro = data?.intro_text || "Inspired by our creators, Frankie's is an exploration of authentic Mexican street food. Sourcing the freshest local produce and highest quality meats and seafood.";
  const story = data?.story_text || "Frankie's has become a standard for quality and consistency for locals and visitors alike. Our atmosphere evolves throughout the day, from family, friends and colleagues sharing a great meal in the afternoon, to a bustling happy hour where you can enjoy our signature margaritas and top quality oysters for half the price, all the way through dinner to late night.";
  
  const heroImage = data?.hero_image_url || "https://images.unsplash.com/photo-1504544750208-dc0358e63f7f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
  
  const chefTitle = data?.chef_title || "CHEF NUNO GRULLON:";
  const chefSubtitle = data?.chef_subtitle || "PASSIONATE CREATIVITY\nFROM THE BRONX TO MIAMI";
  const chefImageUrl = data?.chef_image_url || "/chef-about.png";
  const chefBio = data?.chef_bio || "Chef Nuno Grullon, A New York native started working in restaurants at the early age of sixteen. Over the years while continuing expand his culinary knowledge and skill, started receiving recognition and accolades, appearing on Bravo's television show \"Best New Restaurant\" produced by Gordon Ramsay and has also toured central America with the culinary magazine \"Buen Provecho\". In 2019 Chef Nuno Grullon decided to put his skill and vision into his first business, on a unique corner of Biscayne Boulevard and NE 66th Street. Uptown 66 would become a welcome addition to Miami's Upper east Side MiMo District. Uptown 66 is an exploration of authentic Mexican street food through the lens of Chef Nuno.\n\nReceiving national accreditation from Good Morning America with their birria taco winning \"Best Taco in America\". Despite the success of his first venture, Grullon had a vision for a much broader impact in Miami culinary and hospitality. Grullon set forward to bring a concept that would challenge him to push the boundaries of his skillset and creativity and showcase his culinary passion in a way Miami has yet to see fully. Grand Central would become the outlet for that passion. Opting for pure quality and perfect execution over innovation, Grullon would present American classics with subtle French influence raising the bar for what should be expected from the young restaurant group.";
  
  const passionText = data?.passion_text || "At Frankie's, every dish we serve is a testament to our unwavering passion for food and authentic Mexican tradition. It begins with our hand-pressed tortillas, crafted from heirloom corn sourced directly from Oaxaca, and extends to our award-winning Birria—slow-braised for hours with a proprietary blend of Mexican chilis.\n\nWhether it's the notorious steak burrito or our famous loaded nachos layered with house-made cheese sauce, every ingredient is chosen for its quality and flavor. And of course, we always invite you to leave room for dessert: light, airy churros dipped in silky chocolate sauce, creamy caramel flan, and a tres leches cake that redefines the classic.";
  const passionImageUrl = data?.passion_image_url || "/food-passion.png";
  
  const lifestyleImageUrl = data?.lifestyle_image_url || "/about-lifestyle.png";

  if (isLoading) return <Loading />;

  return (
    <div ref={sectionRef} style={{ background: '#fff' }}>
      <style>{`
        /* STICKY HELPERS */
        .sticky-fix {
          position: -webkit-sticky !important; /* Safari */
          position: sticky !important;
          top: 0 !important;
          z-index: 5 !important;
        }

        @media (max-width: 1024px) {
          .about-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .about-hero-section {
            height: 50vh !important;
          }
          .editorial-image-container {
            height: 400px !important;
          }
          .intro-section {
            padding: 120px 20px 60px 20px !important;
          }
          /* On mobile, don't stack sticky individually into each other */
          .sticky-fix {
            position: relative !important;
            top: auto !important;
          }
        }
      `}</style>

      {/* Intro Section - Layer 10 */}
      <section className="intro-section" style={{ 
        position: 'relative',
        zIndex: 10,
        background: '#ffffff', 
        textAlign: 'left',
        padding: '180px 40px 100px 40px',
        width: '100%'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <h1 className="fade-in" style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(28px, 6vw, 42px)',
            fontWeight: 700,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '40px',
            color: '#1a1a1a'
          }}>{introTitle}</h1>
          
          <div style={{ maxWidth: '1250px' }}>
            <p className="fade-in" style={{
              fontFamily: '"Courier Prime", monospace', 
              fontSize: '15px',
              lineHeight: 2, 
              color: '#333',
              marginBottom: '30px',
              whiteSpace: 'pre-wrap'
            }}>{intro}</p>
            
            <p className="fade-in" style={{
              fontFamily: '"Courier Prime", monospace', 
              fontSize: '15px',
              lineHeight: 2, 
              color: '#333',
              whiteSpace: 'pre-wrap'
            }}>{story}</p>
          </div>
        </div>
      </section>

      {/* Hero Banner - Layer 1 (Sticks behind Intro) */}
      <section className="about-hero-section" style={{ 
        position: 'sticky',
        top: 0,
        height: '80vh', 
        zIndex: 1,
        width: '100%'
      }}>
        <MediaElement
          src={heroImage}
          alt="Restaurant interior"
          className="hero-bg"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />
      </section>

      {/* Chef Section - Layer 10 (Scrolls over Hero) */}
      <section style={{ 
        position: 'relative',
        zIndex: 10,
        background: '#ffffff', 
        padding: '120px 40px 80px 40px', 
        width: '100%' 
      }} className="section-padding">
        <div className="about-editorial-grid" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr 1fr',
          gap: '60px',
          alignItems: 'flex-start'
        }}>
          
          {/* Chef Title - Sticky on Desktop */}
          <div className="fade-in sticky-fix">
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: 'clamp(28px, 4vw, 36px)',
              fontWeight: 700,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              color: '#1a1a1a',
              marginBottom: '16px'
            }}>{chefTitle}</h2>
            <div style={{
              fontFamily: '"Montserrat", sans-serif',
              fontSize: '11px',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#8a8580',
              lineHeight: 2,
              whiteSpace: 'pre-wrap'
            }}>{chefSubtitle}</div>
          </div>

          {/* Chef Image - Sticky on Desktop */}
          <div className="fade-in editorial-image-container sticky-fix" style={{ position: 'relative', overflow: 'hidden', height: '600px' }}>
            <MediaElement 
              src={chefImageUrl} 
              alt="Chef Nuno Grullon" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>

          {/* Narrative Bio - Normal Scroll */}
          <div className="fade-in" style={{ textAlign: 'left' }}>
            <p style={{
              fontFamily: '"Courier Prime", monospace',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: '0.02em',
              color: '#333',
              whiteSpace: 'pre-wrap'
            }}>{chefBio}</p>
          </div>

        </div>
      </section>

      {/* Passion for Food Section */}
      <section style={{ 
        position: 'relative',
        zIndex: 10,
        background: '#ffffff', 
        padding: '40px 40px 120px 40px', 
        width: '100%' 
      }} className="section-padding">
        <div className="about-editorial-grid" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '0.8fr 1.2fr 1fr',
          gap: '60px',
          alignItems: 'flex-start'
        }}>
          <div style={{ textAlign: 'left', paddingTop: '40px' }} className="fade-in">
            {/* UPDATED SVG TO MATCH IMAGE 2 STYLE */}
            <svg width="100" height="auto" viewBox="0 0 80 100" fill="none" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 35 V80 C20 85.5 24.5 90 30 90 C35.5 90 40 85.5 40 80 V35 H20Z" />
              <rect x="26" y="25" width="8" height="10" rx="1" />
              <line x1="28" y1="29" x2="32" y2="29" strokeWidth="1.5" />
              <line x1="28" y1="31" x2="32" y2="31" strokeWidth="1.5" />
              <path d="M50 35 V80 C50 85.5 54.5 90 60 90 C65.5 90 70 85.5 70 80 V35 H50Z" />
              <rect x="56" y="25" width="8" height="10" rx="1" />
              <line x1="58" y1="29" x2="62" y2="29" strokeWidth="1.5" />
              <line x1="58" y1="31" x2="62" y2="31" strokeWidth="1.5" />
            </svg>
          </div>
          <div style={{ textAlign: 'left' }} className="fade-in">
            <p style={{
              fontFamily: '"Courier Prime", monospace',
              fontSize: '15px',
              fontWeight: 400,
              lineHeight: 2.2,
              letterSpacing: '0.02em',
              color: '#333',
              whiteSpace: 'pre-wrap'
            }}>{passionText}</p>
          </div>
          <div className="fade-in editorial-image-container" style={{ position: 'relative', overflow: 'hidden', height: '650px' }}>
            <MediaElement 
              src={passionImageUrl} 
              alt="Frankie's food" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
        </div>
      </section>

      {/* Stretching Lifestyle Banner */}
      <section style={{ position: 'relative', zIndex: 10, height: '70vh', background: '#fff' }}>
        <MediaElement 
          src={lifestyleImageUrl} 
          alt="Outdoor dining" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </section>
      
      <div style={{ position: 'relative', zIndex: 10, height: '20px', background: '#ffffff' }} />
    </div>
  );
};

export default AboutPage;
