import { Suspense, useEffect, useState, useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { BrainModel } from './components/BrainModel';
import { Loader } from './components/Loader';
import './index.css';

const STEPS = [
  { label: "Identity" },
  { label: "Skills & Stack" },
  { label: "Internships" },
  { label: "Project: Codexa" },
  { label: "Project: FeedBack Analyzer" },
  { label: "Project: GrooveBox" },
  { label: "Project: Audio Vis" },
  { label: "Education" },
  { label: "Contact" }
];

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAppLoaded, setIsAppLoaded] = useState(false);
  const scrollProgressRef = useRef(0);
  const dragRotationRef = useRef({ x: 0, y: 0 });

  // Capture window scrolling and map it to 0.0 - 1.0 progress
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;
      
      if (totalScrollable <= 0) return;
      
      const rawPct = window.scrollY / totalScrollable;
      
      // Strict magnetic scroll pause around target points
      const easeScroll = (raw: number) => {
        const segments = 9;
        const y = raw * segments;
        const integerPart = Math.floor(y);
        const x = y - integerPart;
        
        let mappedX = 0;
        const pauseSize = 0.22; // 44% of scroll distance around nodes is a dead-frozen pause
        
        if (x < pauseSize) {
          mappedX = 0;
        } else if (x > 1 - pauseSize) {
          mappedX = 1;
        } else {
          // Normalize to 0-1
          const t = (x - pauseSize) / (1 - 2 * pauseSize);
          // Smootherstep for buttery smooth acceleration and deceleration between pauses
          mappedX = t * t * t * (t * (t * 6 - 15) + 10);
        }
        
        const smoothedY = integerPart + mappedX;
        return Math.min(1, Math.max(0, smoothedY / segments));
      };

      const val = easeScroll(rawPct);
      setScrollProgress(val);
      scrollProgressRef.current = val;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to capture progress on refresh
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // 2. Interactive Drag Rotation Logic (Rubber-band physics)
    let isDragging = false;
    let prev = { x: 0, y: 0 };
    const currentRot = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent | TouchEvent) => {
      // Don't intercept clicks on buttons, links, or active HUD elements
      if ((e.target as HTMLElement).closest('a') || (e.target as HTMLElement).closest('.hud-interactive') || (e.target as HTMLElement).closest('.hud-launch-btn')) return;
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prev = { x: clientX, y: clientY };
      document.body.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent | TouchEvent) => {
      if (!isDragging) return;
      
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - prev.x;
      const deltaY = clientY - prev.y;
      
      // Map vertical drag to X tilt, horizontal drag to Y spin. Clamp to prevent breaking framing.
      currentRot.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, currentRot.x + deltaY * 0.008));
      currentRot.y = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, currentRot.y - deltaX * 0.008));
      
      dragRotationRef.current = { ...currentRot };
      prev = { x: clientX, y: clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      // Spring back to dead center instantly on release
      currentRot.x = 0;
      currentRot.y = 0;
      dragRotationRef.current = { x: 0, y: 0 };
      document.body.style.cursor = 'default';
    };

    window.addEventListener('pointerdown', onPointerDown as any);
    window.addEventListener('pointermove', onPointerMove as any);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);
    
    // Explicit Mobile Touch Fallbacks (Crucial for iOS Safari)
    window.addEventListener('touchstart', onPointerDown as any, { passive: true });
    window.addEventListener('touchmove', onPointerMove as any, { passive: true });
    window.addEventListener('touchend', onPointerUp);
    
    return () => {
      window.removeEventListener('pointerdown', onPointerDown as any);
      window.removeEventListener('pointermove', onPointerMove as any);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      window.removeEventListener('touchstart', onPointerDown as any);
      window.removeEventListener('touchmove', onPointerMove as any);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, []);

  // Determine active step based on scroll progress
  const getActiveStepIndex = () => {
    const stepsCount = STEPS.length;
    const targetY = scrollProgressRef.current * stepsCount;
    if (targetY < 0.5) return -1; // Still in the "Dive" phase
    
    const nearestStep = Math.round(targetY);
    const distanceToCenter = Math.abs(targetY - nearestStep);
    
    // Open the dot when the card is in the pause plateau
    if (distanceToCenter < 0.25) {
      return Math.max(0, Math.min(stepsCount - 1, nearestStep - 1));
    }
    
    return -1;
  };

  const activeIndex = getActiveStepIndex();

  const canvasContent = useMemo(() => (
    <group position={[0, -0.2, 0]}>
      <BrainModel progressRef={scrollProgressRef} dragRotationRef={dragRotationRef} />
      <ContactShadows 
        position={[0, -2.5, 0]} 
        opacity={0.4} 
        scale={15} 
        blur={2} 
        far={4} 
        color="#9900ff" 
        frames={1}
        resolution={512}
      />
    </group>
  ), []);

  return (
    <>
      {!isAppLoaded && <Loader onComplete={() => setIsAppLoaded(true)} />}
      <div className="app-container">
      {/* Background Cyber Grid */}
      <div className="cyber-grid" />

      {/* Full-viewport Fixed Canvas for 3D Brain rendering */}
      <div className="canvas-container">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#88aaff" />
          <pointLight position={[0, 5, 5]} intensity={0.8} />
          
          <Suspense fallback={null}>
            {canvasContent}
          </Suspense>
        </Canvas>
      </div>

      {/* Spacer to enable page scrolling (Animation is driven by this scroll) */}
      <div className="scroll-spacer" />

      {/* Sci-Fi HUD Layer Overlying the Canvas */}
      <div className="hud-layer">
        
        {/* Header */}
        <header className="hud-header hud-interactive">
          <div className="hud-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '28px', marginRight: '12px', filter: 'drop-shadow(0 0 8px var(--cyan-glow))' }} />
            <span>PORTFOLIO // SAMEER</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/sam-eer31/portfolio" target="_blank" rel="noopener noreferrer" className="hud-badge">
              GITHUB
            </a>
          </div>
        </header>

        {/* Dynamic Sidebar showing Active Tour Steps */}
        <div className="hud-sidebar hud-interactive">
          {STEPS.map((_, idx) => (
            <div 
              key={idx} 
              className={`sidebar-step ${activeIndex === idx ? 'active' : ''}`}
            >
              <span className="step-dot"></span>
            </div>
          ))}
        </div>

        {/* Footer info panels */}
        <footer className="app-footer">
          {/* Telemetry panel */}
          <div className="telemetry-panel">
            <div>SYS_SYS: SYNC_LEVEL_{Math.round(scrollProgress * 100)}%</div>
          </div>

          {/* Mouse Scroll Indicator (Fades out once user starts scrolling) */}
          <div 
            className="scroll-indicator" 
            style={{ 
              opacity: Math.max(0, 1 - scrollProgress * 10), 
              transition: 'opacity 0.3s ease-out' 
            }}
          >
            <span className="scroll-text">Scroll to Dive</span>
            <div className="scroll-mouse">
              <span className="scroll-wheel"></span>
            </div>
          </div>
        </footer>

      </div>
    </div>
    </>
  );
}

export default App;
