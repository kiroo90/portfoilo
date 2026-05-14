import './App.css'
import './assets/styles/fonts.css'
import { useRef, useEffect } from 'react';
import Cursor from './components/Cursor/Cursor';
import Header from './components/Header/Header'
import Home from './pages/Home'
import Footer from './components/Footer/Footer'

function App() {
  const footerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (footerRef.current) {
        const height = footerRef.current.offsetHeight;
        document.documentElement.style.setProperty('--footer-height', `${height}px`);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Cursor />
      <Header />
      <Home />
      <Footer ref={footerRef}/>
    </>
  )
}

export default App
