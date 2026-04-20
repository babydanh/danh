import { useState, useEffect } from 'react';
import './App.css';
import ParticlesBackground from './components/ParticlesBackground';
import CloudsBackground from './components/CloudsBackground';
import MusicPlayer from './components/MusicPlayer';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Footer from './components/Footer';
import Intro from './components/Intro';

function App() {
  // Luôn bắt đầu bằng dark mode khi mới vào trang
  const [theme, setTheme] = useState('dark');
  const [hasEntered, setHasEntered] = useState(false);
  const [revealStage, setRevealStage] = useState(0); // 0=hidden, 1=header, 2=hero, 3=projects, 4=footer

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

  // ── Sequential reveal after entering ──
  const handleEnter = () => {
    setHasEntered(true);
    // Stagger the reveal of each section — cinematic pacing
    setTimeout(() => setRevealStage(1), 150);   // Header
    setTimeout(() => setRevealStage(2), 500);   // Hero
    setTimeout(() => setRevealStage(3), 1000);  // Projects
    setTimeout(() => setRevealStage(4), 1500);  // Footer
  };

  return (
    <>
      {/* Intro overlay — shows first, disappears after enter */}
      {!hasEntered && <Intro onEnter={handleEnter} />}

      {theme === 'dark' ? <ParticlesBackground /> : <CloudsBackground />}
      
      {/* Truyền theme xuống cho MusicPlayer để đổi nhạc */}
      <MusicPlayer theme={theme} />

      {/* Header bar */}
      <header className={`header reveal-item ${revealStage >= 1 ? 'revealed' : ''}`}>
        <span className="header-name">Nguyễn Minh Danh</span>
        <div className="header-actions">
          <button className="theme-toggle" onClick={toggleTheme} title="Chuyển chế độ Sáng/Tối">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <a href="mailto:Macter.970@gmail.com" className="header-email">Macter.970@gmail.com</a>
        </div>
      </header>

      <main className="content-wrapper">
        <div className={`reveal-item ${revealStage >= 2 ? 'revealed' : ''}`}>
          <Hero />
        </div>
        <div className={`reveal-item ${revealStage >= 3 ? 'revealed' : ''}`}>
          <Projects />
        </div>
      </main>

      {/* Footer không bọc trong reveal-item vì nó là position: fixed */}
      <Footer className={`footer-reveal ${revealStage >= 4 ? 'revealed' : ''}`} />
    </>
  );
}

export default App;