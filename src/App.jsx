import { useState, useEffect } from 'react';
import './App.css';
import ParticlesBackground from './components/ParticlesBackground';
import CloudsBackground from './components/CloudsBackground';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio-theme') || 'dark');

  useEffect(() => {
    // Lưu theme vào local storage và cập nhật class body
    localStorage.setItem('portfolio-theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      {theme === 'dark' ? <ParticlesBackground /> : <CloudsBackground />}
      
      {/* Truyền theme xuống cho MusicPlayer để đổi nhạc */}
      <MusicPlayer theme={theme} />

      {/* Header bar */}
      <header className="header">
        <span className="header-name">Nguyễn Minh Danh</span>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Chuyển chế độ Sáng/Tối">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <a href="mailto:Macter.970@gmail.com" className="header-email">Macter.970@gmail.com</a>
        </div>
      </header>

      <main className="content-wrapper">
        <Hero />
        <Projects />
      </main>

      <Footer />
    </>
  );
}

export default App;