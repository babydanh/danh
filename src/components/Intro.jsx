import { useState, useEffect, useRef } from 'react';
import './Intro.css';

export default function Intro({ onEnter }) {
  const [phase, setPhase] = useState('idle'); // idle -> warping -> exiting -> done
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const starsRef = useRef([]);
  const speedRef = useRef(0.5);

  // ── Generate stars for the warp tunnel ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const STAR_COUNT = 800;
    const stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * w * 3,
        y: (Math.random() - 0.5) * h * 3,
        z: Math.random() * w,
        pz: 0,
      });
    }
    starsRef.current = stars;

    const draw = () => {
      const speed = speedRef.current;

      // Trail effect — more opacity = shorter trails
      ctx.fillStyle = speed > 5 ? 'rgba(0,0,0,0.08)' : 'rgba(0,0,0,0.25)';
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(w / 2, h / 2);

      for (const star of stars) {
        star.pz = star.z;
        star.z -= speed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * w * 3;
          star.y = (Math.random() - 0.5) * h * 3;
          star.z = w;
          star.pz = w;
        }

        const sx = (star.x / star.z) * (w / 4);
        const sy = (star.y / star.z) * (h / 4);

        const px = (star.x / star.pz) * (w / 4);
        const py = (star.y / star.pz) * (h / 4);

        const size = Math.max(0, (1 - star.z / w) * 3);

        // Color shifts from white to blue when warping
        const brightness = 1 - star.z / w;
        if (speed > 5) {
          const r = Math.floor(100 + brightness * 155);
          const g = Math.floor(180 + brightness * 75);
          ctx.strokeStyle = `rgba(${r}, ${g}, 255, ${brightness})`;
          ctx.lineWidth = size * 2;
        } else {
          ctx.strokeStyle = `rgba(255, 255, 255, ${brightness * 0.8})`;
          ctx.lineWidth = size;
        }

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      ctx.restore();
      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ── Handle the warp sequence ──
  const handleEnter = () => {
    if (phase !== 'idle') return;
    setPhase('warping');

    // Play whoosh sound using Web Audio API
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      
      // White noise burst for whoosh
      const bufferSize = audioCtx.sampleRate * 3; // 3 seconds of whoosh
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        const t = i / bufferSize;
        // Whoosh envelope: builds up then fades out
        const envelope = Math.sin(t * Math.PI) * Math.pow(1 - t * 0.5, 1.5);
        data[i] = (Math.random() * 2 - 1) * envelope * 0.25;
      }

      const source = audioCtx.createBufferSource();
      source.buffer = buffer;

      // Low-pass filter sweeping down for "woosh" feel
      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3000, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 3);

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.8, audioCtx.currentTime + 1);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 3);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      source.start();
    } catch (e) {
      // Audio not supported, continue silently
    }

    // ── SLOWER acceleration over ~3.5 seconds (120 frames at 60fps = 2s, then hold) ──
    let frame = 0;
    const totalFrames = 120; // ~2 seconds of acceleration
    const accel = () => {
      frame++;
      // Smooth exponential curve — builds slowly, then explodes
      const progress = frame / totalFrames;
      speedRef.current = 0.5 + Math.pow(progress, 3) * 40;

      if (frame < totalFrames) {
        requestAnimationFrame(accel);
      } else {
        // Hold at max speed for 0.8 seconds
        speedRef.current = 60;
        setTimeout(() => {
          setPhase('exiting');
          // After CSS fade-out animation completes (0.8s)
          setTimeout(() => {
            setPhase('done');
            onEnter();
          }, 800);
        }, 800);
      }
    };
    requestAnimationFrame(accel);
  };

  if (phase === 'done') return null;

  return (
    <div
      className={`intro-screen ${phase === 'warping' ? 'is-warping' : ''} ${phase === 'exiting' ? 'is-exiting' : ''}`}
      onClick={phase === 'idle' ? handleEnter : undefined}
    >
      <canvas ref={canvasRef} className="warp-canvas" />

      <div className={`intro-center ${phase !== 'idle' ? 'hide-content' : ''}`}>
        {/* Orbiting ring */}
        <div className="orbit-ring">
          <div className="orbit-dot" />
        </div>

        <h1 className="intro-title">
          <span className="intro-title-line">Nguyễn</span>
          <span className="intro-title-line accent">Minh Danh</span>
        </h1>

        <p className="intro-subtitle">IT Student • Developer • Creator</p>

        <button className="enter-btn" onClick={handleEnter}>
          <span className="enter-btn-text">ENTER PORTFOLIO</span>
          <span className="enter-btn-icon">→</span>
        </button>

        <p className="intro-hint">or click anywhere</p>
      </div>

      {/* Corner decorations */}
      <div className="corner-deco top-left" />
      <div className="corner-deco top-right" />
      <div className="corner-deco bot-left" />
      <div className="corner-deco bot-right" />
    </div>
  );
}
