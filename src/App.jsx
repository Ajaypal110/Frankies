import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from './config';
import { getCache, setCache } from './utils/cacheHelper';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Loading from './components/Loading';
import Hero from './components/Hero';
import Hero2 from './components/Hero2';
import SecretSauce from './components/SecretSauce';
import TableTalk from './components/TableTalk';
import ImageGrid from './components/ImageGrid';
import FollowUs from './components/FollowUs';
import Footer from './components/Footer';
import AboutPage from './pages/AboutPage';
import LocationsPage from './pages/LocationsPage';
import AgouraHillsMenuPage from './pages/AgouraHillsMenuPage';
import PressPage from './pages/PressPage';
import AgouraHillsPage from './pages/AgouraHillsPage';

function HomePage() {
  const [data, setData] = useState(getCache('home') || {});
  const [isLoading, setIsLoading] = useState(!getCache('home'));

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/frankies/v1/home?t=${new Date().getTime()}`)
      .then(res => res.json())
      .then(json => {
        setData(json);
        setCache('home', json);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Could not fetch home data", err);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <Hero data={data} />
      <SecretSauce data={data} />
      <div style={{ position: 'relative' }}>
        <Hero2 data={data} />
        <TableTalk data={data} />
      </div>
      <ImageGrid data={data} />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    // Dynamic Title Logic
    const titles = {
      '/': "HOME | FRANKIE'S",
      '/about': "ABOUT | FRANKIE'S",
      '/locations': "LOCATIONS | FRANKIE'S",
      '/agourahillsmenu': "MENU | FRANKIE'S",
      '/press': "PRESS | FRANKIE'S",
      '/agoura': "AGOURA HILLS | FRANKIE'S"
    };
    document.title = titles[location.pathname] || "FRANKIE'S";

    // Redirect logic
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get('redirect');
    if (redirectPath) {
      window.history.replaceState({}, '', redirectPath);
    }
  }, [location]);

  return (
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/agourahillsmenu" element={<AgouraHillsMenuPage location="Agoura Hills" />} />
        <Route path="/press" element={<PressPage />} />
        <Route path="/agoura" element={<AgouraHillsPage />} />
      </Routes>
    </main>
  );
}

export default function Root() {
  return (
    <Router>
      <Navbar />
      <App />
      <Footer />
    </Router>
  );
}
