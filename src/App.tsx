import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { BrainModel } from './components/BrainModel';
import './index.css';

const STEPS = [
  { label: "Identity" },
  { label: "Skills & Stack" },
  { label: "Experience" },
  { label: "Project: CEREBRAL" },
  { label: "Project: NEON_CITY" },
  { label: "Education" },
  { label: "Contact" }
];

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Capture window scrolling and map it to 0.0 - 1.0 progress
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const totalScrollable = docHeight - winHeight;
      
      if (totalScrollable <= 0) return;
      
      const rawPct = window.scrollY / totalScrollable;
      
      // Magnetic slow-mo easing around target points (0.0, 1/7, 2/7, ..., 7/7)
      const easeScroll = (raw: number) => {
        const segments = 7;
        const y = raw * segments;
        const integerPart = Math.floor(y);
        const fractionalPart = y - integerPart;
        
        // Smootherstep interpolation: 6x^5 - 15x^4 + 10x^3
        const x = fractionalPart;
        const smoother = 6 * Math.pow(x, 5) - 15 * Math.pow(x, 4) + 10 * Math.pow(x, 3);
        
        // Blend linear scrolling with the flat plateaus
        const plateauStrength = 0.85; 
        const smoothedFraction = x * (1 - plateauStrength) + smoother * plateauStrength;
        
        const smoothedY = integerPart + smoothedFraction;
        return Math.min(1, Math.max(0, smoothedY / segments));
      };

      setScrollProgress(easeScroll(rawPct));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Run once initially to capture progress on refresh
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine active step based on scroll progress
  const getActiveStepIndex = () => {
    const targetY = scrollProgress * 7;
    if (targetY < 0.5) return -1; // Still in the "Dive" phase
    
    const nearestStep = Math.round(targetY);
    const distanceToCenter = Math.abs(targetY - nearestStep);
    
    // Only open the dot when the card is perfectly resting in the center plateau
    if (distanceToCenter < 0.05) {
      return Math.max(0, Math.min(6, nearestStep - 1));
    }
    
    return -1;
  };

  const activeIndex = getActiveStepIndex();

  return (
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
            <group position={[0, -0.2, 0]}>
              <BrainModel progress={scrollProgress} />
              <ContactShadows 
                position={[0, -2.5, 0]} 
                opacity={0.4} 
                scale={15} 
                blur={2} 
                far={4} 
                color="#9900ff" 
              />
            </group>
          </Suspense>
        </Canvas>
      </div>

      {/* Spacer to enable page scrolling (Animation is driven by this scroll) */}
      <div className="scroll-spacer" />

      {/* Sci-Fi HUD Layer Overlying the Canvas */}
      <div className="hud-layer">
        
        {/* Header */}
        <header className="hud-header hud-interactive">
          <div className="hud-logo">
            <span className="hud-logo-icon"></span>
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
        <footer className="hud-footer">
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
  );
}

export default App;
