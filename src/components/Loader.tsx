import { useState, useEffect, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import * as THREE from 'three';
import './Loader.css';

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

function ProgressiveWireframeSphere({ progress }: { progress: number }) {
  const lineRef = useRef<THREE.LineSegments>(null);
  
  const geometry = useMemo(() => {
    const baseGeom = new THREE.IcosahedronGeometry(2.5, 3);
    return new THREE.WireframeGeometry(baseGeom);
  }, []);

  useFrame((state, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.x += delta * 0.15;
      lineRef.current.rotation.y += delta * 0.2;
      
      const totalCount = geometry.attributes.position.count;
      // Animate the amount of lines drawn based on loading progress
      const drawCount = Math.floor(totalCount * (progress / 100));
      geometry.setDrawRange(0, drawCount);
    }
  });

  return (
    <lineSegments ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color="#00e5ff" transparent opacity={0.8} />
    </lineSegments>
  );
}

export function Loader({ onComplete }: { onComplete: () => void }) {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [text, setText] = useState('SYSTEM BOOT');
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const logsEndRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);

  // References to keep track of the latest progress values inside our single interval
  const progressRef = useRef(progress);
  const activeRef = useRef(active);

  // Keep refs updated without triggering re-renders of the interval
  useEffect(() => {
    progressRef.current = progress;
    activeRef.current = active;
  }, [progress, active]);

  useEffect(() => {
    let current = 0;
    let logIndex = 0;
    
    // Terminal log simulator
    const logInterval = setInterval(() => {
      if (logIndex < BOOT_LOGS.length && current > (logIndex * 8)) {
        setLogs(prev => [...prev.slice(-4), BOOT_LOGS[logIndex]]);
        logIndex++;
      }
    }, 150);

    const interval = setInterval(() => {
      const p = progressRef.current;
      const a = activeRef.current;
      
      // Ease towards actual progress (prevents the jumping/resetting issue)
      if (current < p) {
         current += Math.max(1, (p - current) * 0.1);
      } else if (current < 100 && !a && p === 100) {
         current += 5; // Finish up quickly
      } else if (current < 99) {
         current += 0.5; // Artificial slow progress
         if (current > 90 && a) current = 90;
      }

      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        clearInterval(logInterval);
        setText('SYSTEM READY');
        
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          setHasCompleted(true);
          setLogs(prev => [...prev.slice(-4), "[SYS] Neural link established. Enjoy."]);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, 1000); 
          }, 1200); 
        }
      } else {
        if (current > 20 && current < 40) setText('LOADING ASSETS');
        if (current >= 40 && current < 60) setText('ESTABLISHING LINK');
        if (current >= 60 && current < 80) setText('CALIBRATING HUD');
        if (current >= 80 && current < 95) setText('FINALIZING BOOT');
        if (current >= 95) setText('ALIGNING SYNAPSES');
      }
      
      setDisplayProgress(current);
    }, 50);
    
    return () => {
      clearInterval(interval);
      clearInterval(logInterval);
    };
  }, [onComplete]); // Empty dependency array ensures interval only starts once

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  return (
    <div className={`loader-container ${isFadingOut ? 'fade-out' : ''}`}>
      <div className="loader-glitch-overlay"></div>
      <div className="loader-content">
        
        {/* Intricate Geometric Core */}
        <div className="loader-core">
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <ProgressiveWireframeSphere progress={displayProgress} />
          </Canvas>
        </div>
        
        {/* Main Status Text */}
        <div className="loader-status-container">
          <div className="loader-status glitch" data-text={text}>{text}</div>
        </div>
        
        {/* Laser Progress Bar */}
        <div className="loader-laser-container">
          <div className="loader-laser-bar" style={{ width: `${displayProgress}%` }}>
            <div className="loader-laser-flare"></div>
          </div>
        </div>

        {/* Terminal Boot Logs */}
        <div className="loader-terminal">
          {logs.map((log, index) => (
            <div key={index} className="terminal-line">{log}</div>
          ))}
          <div ref={logsEndRef} />
        </div>

      </div>
    </div>
  );
}
