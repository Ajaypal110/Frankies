import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Footer = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/frankies/v1/global?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(setSettings)
      .catch(err => console.error("Could not load global settings for footer:", err));
  }, []);

  const formatAddress = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        <br />
      </React.Fragment>
    ));
  };
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <Link to="/">
            <img 
              src={settings?.navbar_logo_url || "/logo.png"} 
              alt="Frankie's Logo" 
              style={{
                height: '80px',
                width: 'auto',
                filter: 'brightness(0) invert(1)',
                opacity: 0.9
              }} 
            />
          </Link>
        </div>

        <div className="footer-grid">
          {/* Column 1: Locations */}
          <div className="footer-column">
            <h4 className="footer-heading">LOCATIONS</h4>
            
            <div className="footer-location-block">
              <p className="footer-address">
                {settings ? formatAddress(settings.footer_address) : (
                  <>7100 BISCAYNE BLVD,<br />MIAMI, FL 33138</>
                )}
              </p>
            </div>

          </div>

          {/* Column 2: Navigation */}
          <div className="footer-column">
            <h4 className="footer-heading">EXPLORE</h4>
            <nav className="footer-nav">
              <Link to="/" className="footer-link">HOME</Link>
              <Link to="/about" className="footer-link">ABOUT</Link>
              <Link to="/locations" className="footer-link">LOCATIONS</Link>
              <Link to="/agourahillsmenu" className="footer-link">MENUS</Link>
              <Link to="/press" className="footer-link">PRESS</Link>
            </nav>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="footer-column">
            <h4 className="footer-heading">SAY HOLA</h4>
            <nav className="footer-nav">
              <span className="footer-link">{settings?.footer_email || "INFO@FRANKIESMEXICAN.COM"}</span>
              <a href={settings?.instagram_url || "https://instagram.com"} className="footer-link" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
              {settings?.facebook_url && <a href={settings.facebook_url} className="footer-link" target="_blank" rel="noopener noreferrer">FACEBOOK</a>}
              <a href={settings?.tiktok_url || "https://www.tiktok.com/@frankies_burritos"} className="footer-link" target="_blank" rel="noopener noreferrer">TIKTOK</a>
              <a href={settings?.order_online_url || "#"} className="footer-link" target="_blank" rel="noopener noreferrer">ORDER ONLINE</a>

            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            &copy; {new Date().getFullYear()} {settings?.copyright_text || "FRANKIE'S BURRITO. ALL RIGHTS RESERVED."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
