import { useState, useRef, useEffect } from 'react';

export default function MusicPlayer({ theme = 'dark' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef(null);

  // Khi component mount, thử autoplay (sẽ bị chặn nếu chưa có user gesture)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Bị chặn autoplay — nhạc sẽ tự phát khi user click vào Intro
          });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update volume khi state thay đổi
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle theme change to swap music seamlessly
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // Lắng nghe sự kiện click toàn trang để khởi phát nhạc (user gesture)
  useEffect(() => {
    const tryPlay = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    document.addEventListener('click', tryPlay, { once: true });
    return () => document.removeEventListener('click', tryPlay);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (e) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  return (
    <div className="music-player">
      <audio 
        ref={audioRef} 
        src={theme === 'dark' ? `${import.meta.env.BASE_URL}music.mp3` : `${import.meta.env.BASE_URL}music2.mp3`} 
        loop 
      />
      
      <button className="music-toggle" onClick={togglePlay} title={isPlaying ? 'Tạm dừng nhạc' : 'Phát nhạc'}>
        <span className="music-icon">{isPlaying ? '🎵' : '🔇'}</span>
        <span className="music-label">{isPlaying ? 'Playing' : 'Music'}</span>
        {isPlaying && (
          <span className="music-bars">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </span>
        )}
      </button>

      <input 
        type="range" 
        className="volume-slider" 
        min="0" max="1" step="0.01" 
        value={volume} 
        onChange={handleVolume}
        title="Chỉnh âm lượng"
      />
    </div>
  );
}
