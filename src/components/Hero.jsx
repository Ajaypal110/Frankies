import React, { useEffect, useRef } from 'react';
import MediaElement from './MediaElement';

const Hero = ({ data }) => {
  const mediaRef = useRef(null);
  const src = data?.hero_image_url || "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (mediaRef.current) mediaRef.current.classList.add('loaded');
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero-section">
      <MediaElement
        ref={mediaRef}
        className="hero-bg"
        src={src}
        alt="Mexican street food spread"
        loading="eager"
      />
    </section>
  );
};

export default Hero;
