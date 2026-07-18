import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './Loader.css';
import { useTheme } from '../theme/ThemeContext';

const BOOT_LOGS = [
  "[SYS] Kernel bootstrap initiated...",
  "[SYS] Mounting virtual file systems... OK",
  "[NET] Establishing neural uplink...",
  "[NET] Handshake with proxy server... OK",
  "[SEC] Bypassing firewall protocols...",
  "[SEC] Encryption key accepted.",
  "[MEM] Allocating 4096MB VRAM...",
  "[MEM] Memory check passed.",
  "[SYS] Initializing WebGL context...",
  "[SYS] Loading 3D assets and shaders...",
  "[SYS] Calibrating spatial tracking...",
  "[SYS] Boot sequence complete."
];

function ProgressiveWireframeSphere({ progressRef }: { progressRef: React.MutableRefObject<number> }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const baseGeom = new THREE.IcosahedronGeometry(2.5, 3);
    return new THREE.WireframeGeometry(baseGeom);
  }, []);

  useFrame((_state, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.x += delta * 0.15;
      lineRef.current.rotation.y += delta * 0.2;
      
      const totalCount = geometry.attributes.position.count;
      const drawCount = Math.floor(totalCount * (progressRef.current / 100));
      geometry.setDrawRange(0, drawCount);
    }
  });

  const { colors } = useTheme();

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={colors.primary} transparent opacity={0.8} />
    </lineSegments>
  );
}

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  
  // DOM refs to update UI WITHOUT React re-renders!
  const currentProgressRef = useRef(0);
  const laserBarRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrameId: number;
    let logIndex = 0;
    
    // Exactly 5 seconds duration
    const DURATION_MS = 5000;
    const startTime = performance.now();
    let isFinished = false;
    
    // Create an array to hold the DOM elements for the terminal logs
    const logNodes: HTMLDivElement[] = [];
    if (terminalRef.current) {
      terminalRef.current.innerHTML = '';
      for (let i = 0; i < 5; i++) {
        const div = document.createElement('div');
        div.className = 'terminal-line';
        div.style.display = 'none'; // hidden initially
        terminalRef.current.appendChild(div);
        logNodes.push(div);
      }
    }

    const pushLog = (text: string) => {
      // Shift texts up
      for (let i = 0; i < logNodes.length - 1; i++) {
        logNodes[i].innerText = logNodes[i + 1].innerText;
        logNodes[i].style.display = logNodes[i + 1].style.display;
      }
      // Set bottom text
      const bottomNode = logNodes[logNodes.length - 1];
      bottomNode.innerText = text;
      bottomNode.style.display = 'block';
    };
    
    const updateLoop = (time: number) => {
      if (isFinished) return;

      const elapsed = time - startTime;
      
      // Calculate purely time-based progress (0 to 100)
      let current = Math.min(100, (elapsed / DURATION_MS) * 100);

      if (current >= 100) {
        current = 100;
        isFinished = true;
        
        if (statusTextRef.current) {
          statusTextRef.current.innerText = 'SYSTEM READY';
          statusTextRef.current.setAttribute('data-text', 'SYSTEM READY');
        }
        
        if (laserBarRef.current) {
          laserBarRef.current.style.transform = `scaleX(1)`;
        }
        
        pushLog("[SYS] Neural link established. Awaiting manual override...");
        
        // Instead of auto-fading out, we show the interactive Enter button
        // Since the 5s loop is completely finished, this state update is perfectly safe and won't cause lag.
        setIsReadyToEnter(true);
      } else {
        // Update text efficiently via DOM
        if (statusTextRef.current) {
          let newText = 'SYSTEM BOOT';
          if (current > 20 && current < 40) newText = 'LOADING ASSETS';
          else if (current >= 40 && current < 60) newText = 'ESTABLISHING LINK';
          else if (current >= 60 && current < 80) newText = 'CALIBRATING HUD';
          else if (current >= 80 && current < 95) newText = 'FINALIZING BOOT';
          else if (current >= 95) newText = 'ALIGNING SYNAPSES';
          
          if (statusTextRef.current.innerText !== newText) {
            statusTextRef.current.innerText = newText;
            statusTextRef.current.setAttribute('data-text', newText);
          }
        }
      }
      
      currentProgressRef.current = current;
      
      // Update DOM directly to avoid React layout thrashing
      if (laserBarRef.current) {
        // Use scaleX for hardware-accelerated CSS rendering on the compositor thread
        laserBarRef.current.style.transform = `scaleX(${current / 100})`;
      }
      
      // Log logic - distribute evenly across the 5 seconds without React state updates
      const expectedLogs = Math.floor((elapsed / DURATION_MS) * BOOT_LOGS.length);
      if (logIndex < BOOT_LOGS.length && expectedLogs > logIndex) {
        pushLog(BOOT_LOGS[logIndex]);
        logIndex++;
      }
      
      if (!isFinished) {
        animationFrameId = requestAnimationFrame(updateLoop);
      }
    };
    
    animationFrameId = requestAnimationFrame(updateLoop);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleEnter = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  };

  return (
    <div className={`loader-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-glitch-overlay"></div>
      <div className="loader-content">
        
        {/* Intricate Geometric Core */}
        <div className="loader-core">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            {/* Pass ref instead of state to prevent R3F canvas reconciliations */}
            <ProgressiveWireframeSphere progressRef={currentProgressRef} />
          </Canvas>
        </div>
        
        {/* Main Status Text */}
        <div className="loader-status-container">
          <div className="loader-status glitch" ref={statusTextRef} data-text="SYSTEM BOOT">SYSTEM BOOT</div>
        </div>
        
        {/* Laser Progress Bar */}
        <div className="loader-laser-container">
          <div className="loader-laser-bar" ref={laserBarRef}>
            <div className="loader-laser-flare"></div>
          </div>
        </div>

        {/* Terminal Boot Logs */}
        <div className="loader-terminal" ref={terminalRef}>
          {/* Logs are injected here purely via DOM manipulation to prevent Layout Thrashing */}
        </div>
        
        {/* Interactive Enter Button Inline */}
        <div className={`loader-enter-inline ${isReadyToEnter ? 'visible' : ''}`}>
          <button className="cyber-enter-btn" onClick={handleEnter}>
            <span className="btn-glitch-layer"></span>
            INITIALIZE LINK
          </button>
        </div>

      </div>
    </div>
  );
}
