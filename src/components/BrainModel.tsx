import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import EdgesWorker from './EdgesWorker?worker';

const TOUR_NODES = [
  {
    id: 0,
    pos: new THREE.Vector3(0.5, 0.5, 0.5),
    title: "Identity",
    subtitle: "Sameer Shahid Siddiqui",
    description: "AI-based application developer with experience building complete web projects using AI tools. I use AI to generate, modify, debug, and deploy backend and frontend code, and focus on turning ideas into fully working applications. Familiar with APIs, databases, and AI integrations through hands-on project development.",
    tags: ["AI-Assisted Dev", "Full-Stack", "Problem Solver"]
  },
  {
    id: 1,
    pos: new THREE.Vector3(-0.6, 0.2, 0.4),
    title: "Cognitive Core",
    subtitle: "Skills & Stack",
    description: "Skills and Stack overview.",
    customDescription: (
      <div className="hud-description" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.75em', lineHeight: '1.4' }}>
        <div>
          <strong style={{ color: '#fff', fontSize: '1.1em' }}>Core Tech Stack</strong>
          <div style={{ margin: '0.3rem 0 0 0.5rem', opacity: 0.9, paddingLeft: '0.5rem', borderLeft: '2px solid rgba(0, 229, 255, 0.4)' }}>
            <strong>Programming:</strong> Python (strong logic building & problem solving)<br />
            <strong>Frontend:</strong> HTML, CSS, JS, React, Next.js, Tailwind CSS<br />
            <strong>Backend:</strong> FastAPI, Flask, Node.js<br />
            <strong>Databases:</strong> MongoDB, MySQL, SQLite
          </div>
        </div>
        <div>
          <strong style={{ color: '#fff', fontSize: '1.1em' }}>AI-Assisted Development</strong>
          <ul style={{ margin: '0.3rem 0 0 1.2rem', opacity: 0.9, padding: 0 }}>
            <li style={{ marginBottom: '0.2rem' }}>Extensive AI usage for code generation, debugging, and iteration</li>
            <li style={{ marginBottom: '0.2rem' }}>Experienced in full-stack creation from planning to deployment</li>
            <li style={{ marginBottom: '0' }}>Skilled at componentizing projects and building systems step-by-step</li>
          </ul>
        </div>
      </div>
    ),
    tags: ["Python Core", "Full-Stack Web", "AI-Assisted"]
  },
  {
    id: 2,
    pos: new THREE.Vector3(0.0, -0.4, 0.6),
    title: "Synaptic Pathways",
    subtitle: "Internships",
    description: "Internships completed at Eisystems Services.",
    customDescription: (
      <div className="hud-description" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        <div>
          <strong style={{ color: '#fff' }}>Python Programming Intern</strong><br />
          <span style={{ opacity: 0.8 }}>Eisystems Services | Feb 2026 – Apr 2026</span>
          <ul style={{ margin: '0.25rem 0 0 1.2rem', opacity: 0.9 }}>
            <li>Learned core Python concepts and problem-solving</li>
            <li>Practiced building small programs and debugging logic</li>
          </ul>
        </div>
        <div>
          <strong style={{ color: '#fff' }}>Data Science Intern</strong><br />
          <span style={{ opacity: 0.8 }}>Eisystems Services | Aug 2025 – Sep 2025</span>
          <ul style={{ margin: '0.25rem 0 0 1.2rem', opacity: 0.9 }}>
            <li>Learned basics of data analysis and preprocessing using Python</li>
            <li>Worked on simple data science tasks and report submission</li>
          </ul>
        </div>
      </div>
    ),
    tags: ["Eisystems", "Python Intern", "Data Science"]
  },
  {
    id: 3,
    pos: new THREE.Vector3(0.4, -0.2, -0.5),
    title: "Project",
    subtitle: "Codexa AI Suite",
    description: "Codexa AI Suite Overview.",
    customDescription: (
      <div className="hud-description" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85em', lineHeight: '1.4' }}>
        <p style={{ margin: 0, fontStyle: 'italic', opacity: 0.9 }}>
          An integrated AI-powered productivity suite designed to provide a unified, flexible, and privacy-aware solution.
        </p>
        <div>
          <strong style={{ color: 'var(--cyan-primary)', fontSize: '1.05em' }}>CORE CAPABILITIES</strong>
          <ul style={{ margin: '0.3rem 0 0 1.2rem', opacity: 0.9, padding: 0 }}>
            <li style={{ marginBottom: '0.2rem' }}><strong>4-in-1 AI Modules:</strong> Document Generator, Code Generator, Document Analyzer, and an interactive AI Teacher.</li>
            <li style={{ marginBottom: '0.2rem' }}><strong>Hybrid LLM Inference:</strong> Seamlessly switch between local processing (via <span style={{ color: '#fff' }}>Ollama</span> for privacy) and Cloud processing for performance.</li>
            <li style={{ marginBottom: '0' }}><strong>Advanced Architecture:</strong> Built on <span style={{ color: '#fff' }}>FastAPI</span> & <span style={{ color: '#fff' }}>MongoDB</span> with real-time WebSocket streaming, sandboxed execution, and TTS.</li>
          </ul>
        </div>
      </div>
    ),
    tags: ["FastAPI", "WebSockets", "Hybrid LLMs", "MongoDB"]
  },
  {
    id: 4,
    pos: new THREE.Vector3(-0.3, 0.6, -0.4),
    title: "Project",
    subtitle: "FeedBack Analyzer",
    description: "FeedBack Analyzer Project Overview.",
    customDescription: (
      <div className="hud-description" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85em', lineHeight: '1.4' }}>
        <p style={{ margin: 0, fontStyle: 'italic', opacity: 0.9 }}>
          Feedback Analyzer turns text feedback into insights with sentiment analysis, AI summaries, word clouds, and CSV/PDF exports in a modern web app.
        </p>
        <div>
          <strong style={{ color: 'var(--cyan-primary)', fontSize: '1.05em' }}>CORE CAPABILITIES</strong>
          <ul style={{ margin: '0.3rem 0 0 1.2rem', opacity: 0.9, padding: 0 }}>
            <li style={{ marginBottom: '0.2rem' }}><strong>NLP Pipelines:</strong> Sentiment analysis via <span style={{ color: '#fff' }}>Transformers (RoBERTa, DistilBERT)</span>.</li>
            <li style={{ marginBottom: '0.2rem' }}><strong>AI Summaries:</strong> Contextual summaries using local/cloud LLMs (<span style={{ color: '#fff' }}>Gemini/Ollama</span>).</li>
            <li style={{ marginBottom: '0' }}><strong>Data Visualization:</strong> Interactive dashboards, word clouds, and CSV/PDF reports.</li>
          </ul>
        </div>
      </div>
    ),
    tags: ["FastAPI", "NLP", "Transformers", "Ollama"],
    link: "https://github.com/sam-eer31/FeedBack_Analyzer"
  },
  {
    id: 5,
    pos: new THREE.Vector3(0.2, 0.7, -0.2),
    title: "Project",
    subtitle: "GrooveBox",
    description: "GrooveBox Project Overview.",
    customDescription: (
      <div className="hud-description" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85em', lineHeight: '1.4' }}>
        <p style={{ margin: 0, fontStyle: 'italic', opacity: 0.9 }}>
          A real-time synchronized media platform for listening to music and watching YouTube videos together.
        </p>
        <div>
          <strong style={{ color: 'var(--cyan-primary)', fontSize: '1.05em' }}>CORE CAPABILITIES</strong>
          <ul style={{ margin: '0.3rem 0 0 1.2rem', opacity: 0.9, padding: 0 }}>
            <li style={{ marginBottom: '0.2rem' }}><strong>Precision Sync:</strong> Millisecond-accurate synchronized playback across all connected clients via <span style={{ color: '#fff' }}>WebSockets</span>.</li>
            <li style={{ marginBottom: '0.2rem' }}><strong>Room Management:</strong> Access-controlled rooms with locking, user approvals, and strict host privileges.</li>
            <li style={{ marginBottom: '0' }}><strong>Interactive Chat:</strong> Live messaging integrated seamlessly with embedded chat-based playback commands.</li>
          </ul>
        </div>
      </div>
    ),
    tags: ["Real-time Sync", "WebSockets", "Chat Commands"],
    link: "https://grooveboxplayer.vercel.app/"
  },
  {
    id: 6,
    pos: new THREE.Vector3(-0.4, -0.2, 0.5),
    title: "Project",
    subtitle: "Audio Visualizer",
    description: "Audio Visualizer Project Overview.",
    customDescription: (
      <div className="hud-description" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85em', lineHeight: '1.4' }}>
        <p style={{ margin: 0, fontStyle: 'italic', opacity: 0.9 }}>
          A high-performance, browser-based engine for rendering stunning 3D audio visualizations in real-time.
        </p>
        <div>
          <strong style={{ color: 'var(--cyan-primary)', fontSize: '1.05em' }}>CORE CAPABILITIES</strong>
          <ul style={{ margin: '0.3rem 0 0 1.2rem', opacity: 0.9, padding: 0 }}>
            <li style={{ marginBottom: '0.2rem' }}><strong>Live 3D Rendering:</strong> 20 distinct dynamic visualizer effects powered by <span style={{ color: '#fff' }}>Three.js</span>.</li>
            <li style={{ marginBottom: '0.2rem' }}><strong>Audio Processing:</strong> Real-time frequency analysis via the native <span style={{ color: '#fff' }}>Web Audio API</span>.</li>
            <li style={{ marginBottom: '0' }}><strong>Studio Export:</strong> Built-in <span style={{ color: '#fff' }}>MediaRecorder</span> integration for exporting high-quality videos instantly.</li>
          </ul>
        </div>
      </div>
    ),
    tags: ["Web Audio API", "Three.js", "MediaRecorder API"],
    link: "https://audrix.vercel.app/"
  },
  {
    id: 7,
    pos: new THREE.Vector3(0.6, -0.6, -0.2),
    title: "Education",
    subtitle: "Academic History",
    description: "Academic history and education.",
    customDescription: (
      <div className="hud-description" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85em', lineHeight: '1.4' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ width: '80px', flexShrink: 0, fontWeight: 'bold', color: 'var(--cyan-primary)' }}>2022-2026</div>
          <div style={{ flex: 1 }}>
            <strong style={{ color: '#fff' }}>Computer Science and Engineering | Bachelor of Technology</strong><br />
            <span style={{ opacity: 0.8, fontStyle: 'italic' }}>Khwaja Moinuddin Chishti Language University, Lucknow</span><br />
            <span style={{ opacity: 0.9 }}>B.Tech in Computer Science & Engineering (AI & Data Science)</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ width: '80px', flexShrink: 0, fontWeight: 'bold', color: 'var(--cyan-primary)' }}>2022</div>
          <div style={{ flex: 1 }}>
            <strong style={{ color: '#fff' }}>Intermediate</strong><br />
            <span style={{ opacity: 0.8, fontStyle: 'italic' }}>Kendriya Vidyalaya IIM, Lucknow</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ width: '80px', flexShrink: 0, fontWeight: 'bold', color: 'var(--cyan-primary)' }}>2020</div>
          <div style={{ flex: 1 }}>
            <strong style={{ color: '#fff' }}>High school</strong><br />
            <span style={{ opacity: 0.8, fontStyle: 'italic' }}>Kendriya Vidyalaya IIM, Lucknow</span>
          </div>
        </div>
      </div>
    ),
    tags: ["B.Tech CSE (AI&DS)", "KMCLU", "Kendriya Vidyalaya"]
  },
  {
    id: 8,
    pos: new THREE.Vector3(-0.5, -0.5, -0.5),
    title: "Transmit Signal",
    subtitle: "Contact & Network",
    description: "Contact & Network details.",
    customDescription: (
      <div className="hud-description" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85em', lineHeight: '1.4' }}>
        <p style={{ margin: 0, fontStyle: 'italic', opacity: 0.9 }}>
          Ready to orchestrate AI tools for your next big idea. Open to internships, collaborations, and visionary software engineering projects.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr', gap: '0.5rem', alignItems: 'center', background: 'rgba(0, 229, 255, 0.05)', padding: '1rem', border: '1px solid rgba(0, 229, 255, 0.2)', borderRadius: '4px' }}>
          <strong style={{ color: 'var(--cyan-primary)' }}>EMAIL:</strong>
          <span style={{ color: '#fff', userSelect: 'all', pointerEvents: 'auto' }}>sameershahidsiddiqui365@gmail.com</span>

          <strong style={{ color: 'var(--cyan-primary)' }}>PHONE:</strong>
          <span style={{ color: '#fff', userSelect: 'all', pointerEvents: 'auto' }}>+91 9335847773</span>

          <strong style={{ color: 'var(--cyan-primary)' }}>GITHUB:</strong>
          <a href="https://github.com/sam-eer31" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', pointerEvents: 'auto', textDecoration: 'none' }}>
            github.com/sam-eer31 <span style={{ color: 'var(--cyan-primary)', marginLeft: '4px' }}>↗</span>
          </a>
        </div>
      </div>
    ),
    tags: ["Open to Work", "Available for Hire", "Collaborations"],
  }
];

const BackgroundStars = ({ starsMatRef }: { starsMatRef: React.RefObject<THREE.PointsMaterial | null> }) => {
  const points = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 30 + Math.random() * 50;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points geometry={points}>
      <pointsMaterial ref={starsMatRef} color="#ffffff" size={0.08} transparent opacity={0} sizeAttenuation={true} depthWrite={false} />
    </points>
  );
};
const getGPUName = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      const debugInfo = (gl as any).getExtension('WEBGL_debug_renderer_info');
      if (debugInfo) {
        const renderer = (gl as any).getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        let shortName = renderer.replace(/ANGLE \([^,]+,\s*([^,]+),.*\)/, '$1').trim();
        shortName = shortName.split('Direct3D')[0].split('OpenGL')[0].trim();
        shortName = shortName.replace(/\s*\([^)]*\)/g, '').trim();
        return shortName.toUpperCase();
      }
    }
  } catch (e) { }
  return 'GENERIC GPU';
};
const gpuName = getGPUName();
const connType = ((navigator as any).connection?.effectiveType || '4G').toUpperCase();

const LiveTelemetryPanel = () => {
  const fpsRef = useRef<HTMLSpanElement>(null);
  const coordsRef = useRef<HTMLSpanElement>(null);
  const networkRef = useRef<HTMLSpanElement>(null);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);

    let animId: number;
    const updateLoop = () => {
      const now = performance.now();
      const delta = now - lastTime.current;
      frameCount.current++;

      if (delta >= 500) {
        const fps = Math.round((frameCount.current * 1000) / delta);
        if (fpsRef.current) fpsRef.current.innerText = `${fps} FPS`;
        frameCount.current = 0;
        lastTime.current = now;

        const ping = Math.floor(Math.random() * 8 + 12);
        if (networkRef.current) networkRef.current.innerText = `SYNC (${connType}) ${ping}ms`;
      }

      if (coordsRef.current) {
        const rx = mouseRef.current.x.toFixed(2);
        const ry = mouseRef.current.y.toFixed(2);
        coordsRef.current.innerText = `X:${rx} Y:${ry}`;
      }

      animId = requestAnimationFrame(updateLoop);
    };

    animId = requestAnimationFrame(updateLoop);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div className="hud-telemetry">
      <div className="hud-tel-item">
        <span className="hud-tel-label">SYS_FPS (PERF)</span>
        <span className="hud-tel-val" ref={fpsRef}>-- FPS</span>
      </div>
      <div className="hud-tel-item">
        <span className="hud-tel-label">SENSOR VEC</span>
        <span className="hud-tel-val" ref={coordsRef}>X:0.00 Y:0.00</span>
      </div>
      <div className="hud-tel-item">
        <span className="hud-tel-label">WEBGL CORE</span>
        <span className="hud-tel-val" title={gpuName} style={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: '1.3' }}>{gpuName}</span>
      </div>
      <div className="hud-tel-item">
        <span className="hud-tel-label">AI LINK</span>
        <span className="hud-tel-val" ref={networkRef}>SYNC</span>
      </div>
    </div>
  );
};

const HudCard = ({ node, index, isMobile, viewportWidth, htmlRef }: any) => {
  const cardWidth = isMobile ? 650 : 850;
  const [cardHeight, setCardHeight] = useState(isMobile ? 480 : 520);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // Measure exact pixel height of the inner content + padding and snap the SVG frame to it!
        setCardHeight(Math.max((entry.target as HTMLElement).offsetHeight, isMobile ? 350 : 450));
      }
    });
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  const cy = cardHeight / 2 + 40;
  let dynamicDF = (viewportWidth * 4.25) / cardWidth;
  dynamicDF = Math.max(1.5, Math.min(dynamicDF, 7));

  return (
    <Html
      position={node.pos}
      center
      distanceFactor={dynamicDF}
      zIndexRange={[100, 0]}
    >
      <div
        ref={htmlRef}
        className="hud-wrapper hud-interactive"
        style={{
          width: `${cardWidth}px`,
          height: `${cardHeight}px`,
          position: 'relative',
          willChange: 'opacity, transform, visibility',
          visibility: 'hidden',
          cursor: 'default'
        }}
      >
        <svg
          className="hud-svg-frame"
          viewBox={`0 0 ${cardWidth} ${cardHeight}`}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}
        >
          <path d={`M 30 0 L ${cardWidth - 30} 0 L ${cardWidth} 30 L ${cardWidth} ${cy} L ${cardWidth - 15} ${cy + 15} L ${cardWidth - 15} ${cy + 80} L ${cardWidth} ${cy + 95} L ${cardWidth} ${cardHeight - 30} L ${cardWidth - 30} ${cardHeight} L 30 ${cardHeight} L 0 ${cardHeight - 30} L 0 ${cy + 95} L 15 ${cy + 80} L 15 ${cy + 15} L 0 ${cy} L 0 30 Z`} fill="rgba(2, 8, 19, 0.85)" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" />
          <path d={`M 30 0 L ${cardWidth - 30} 0 L ${cardWidth} 30 L ${cardWidth} ${cy} L ${cardWidth - 15} ${cy + 15} L ${cardWidth - 15} ${cy + 80} L ${cardWidth} ${cy + 95} L ${cardWidth} ${cardHeight - 30} L ${cardWidth - 30} ${cardHeight} L 30 ${cardHeight} L 0 ${cardHeight - 30} L 0 ${cy + 95} L 15 ${cy + 80} L 15 ${cy + 15} L 0 ${cy} L 0 30 Z`} fill="none" stroke="#00e5ff" strokeWidth="1" />
          <path d={`M 30 0 L ${cardWidth - 30} 0 L ${cardWidth} 30 L ${cardWidth} ${cy} L ${cardWidth - 15} ${cy + 15} L ${cardWidth - 15} ${cy + 80} L ${cardWidth} ${cy + 95} L ${cardWidth} ${cardHeight - 30} L ${cardWidth - 30} ${cardHeight} L 30 ${cardHeight} L 0 ${cardHeight - 30} L 0 ${cy + 95} L 15 ${cy + 80} L 15 ${cy + 15} L 0 ${cy} L 0 30 Z`} fill="none" stroke="#00e5ff" strokeWidth="3" pathLength="100" className="edge-tracer" />
          <path d="M 150 0 L 150 6 M 160 0 L 160 6 M 170 0 L 170 6" stroke="#00e5ff" strokeWidth="2" />
          <path d={`M ${cardWidth - 170} ${cardHeight} L ${cardWidth - 170} ${cardHeight - 6} M ${cardWidth - 160} ${cardHeight} L ${cardWidth - 160} ${cardHeight - 6} M ${cardWidth - 150} ${cardHeight} L ${cardWidth - 150} ${cardHeight - 6}`} stroke="#00e5ff" strokeWidth="2" />
          <g stroke="#00e5ff" strokeWidth="1" opacity="0.8">
            <line x1="-10" y1="-10" x2="-2" y2="-10" />
            <line x1="-6" y1="-14" x2="-6" y2="-6" />
          </g>
          <g stroke="#00e5ff" strokeWidth="1" opacity="0.8">
            <line x1={cardWidth + 2} y1={cardHeight + 10} x2={cardWidth + 10} y2={cardHeight + 10} />
            <line x1={cardWidth + 6} y1={cardHeight + 6} x2={cardWidth + 6} y2={cardHeight + 14} />
          </g>
          <g stroke="#00e5ff" strokeWidth="1" opacity="0.8">
            <line x1="-10" y1={cardHeight + 10} x2="-2" y2={cardHeight + 10} />
            <line x1="-6" y1={cardHeight + 6} x2="-6" y2={cardHeight + 14} />
          </g>
          <g stroke="#00e5ff" strokeWidth="1" opacity="0.8">
            <line x1={cardWidth + 2} y1="-10" x2={cardWidth + 10} y2="-10" />
            <line x1={cardWidth + 6} y1="-14" x2={cardWidth + 6} y2="-6" />
          </g>
        </svg>

        <div
          ref={contentRef}
          className="hud-card"
          style={{ position: 'relative', zIndex: 1, padding: isMobile ? '1.5rem' : '2.5rem', width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', flexDirection: 'row', width: '100%' }}>
            {/* Left Col: Target Ring */}
            <div style={{ width: isMobile ? '40px' : '70px', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
              <div className="holo-ring-container">
                <div className="holo-ring-outer"></div>
                <div className="holo-ring-arc"></div>
                <div className="holo-ring-inner"></div>
                <div className="holo-crosshair"></div>
                <div className="holo-core"></div>
              </div>
            </div>

            {/* Glowing Vertical Divider */}
            <div style={{ width: '2px', background: 'var(--cyan-primary)', boxShadow: '0 0 10px var(--cyan-primary)', alignSelf: 'stretch', marginTop: '10px', marginBottom: '10px' }}></div>

            {/* Center Col: Text & Tags */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="hud-header-text">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div className="hud-subtitle">{node.title}</div>
                  <div className="hud-sys-badge">SYS.0{index + 1} ///</div>
                </div>
                <div className="hud-title">{node.subtitle}</div>
              </div>

              <div style={{ width: '100%', height: '1px', background: 'linear-gradient(90deg, rgba(0,229,255,0.8) 0%, transparent 100%)', margin: '0.5rem 0' }}></div>

              {node.customDescription ? (
                node.customDescription
              ) : (
                <p className="hud-description">
                  <strong style={{ color: '#fff' }}>{node.description.split('.')[0]}.</strong>
                  {node.description.substring(node.description.indexOf('.') + 1)}
                </p>
              )}

              <div className="hud-tags-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.5rem' }}>
                {node.tags.map((tag: string, i: number) => (
                  <div key={i} className="hud-badge-tag">
                    {tag}
                  </div>
                ))}
              </div>

              {/* @ts-ignore */}
              {node.link && (
                <a href={node.link} target="_blank" rel="noopener noreferrer" className="hud-launch-btn" style={{ pointerEvents: 'auto' }}>
                  {node.link.includes('github.com') ? 'VIEW_SOURCE' : 'LAUNCH_PROJECT'} <span style={{ marginLeft: '8px' }}>↗</span>
                </a>
              )}
            </div>

            {/* Right Col: Telemetry */}
            <div style={{ width: isMobile ? '120px' : '160px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '2rem' }}>
              <LiveTelemetryPanel />

              <div className="hud-live-feed">
                <div className="hud-feed-label">LIVE FEED</div>
                <div className="holo-globe-box">
                  <div className="globe-corner top-left"></div>
                  <div className="globe-corner top-right"></div>
                  <div className="globe-corner bottom-left"></div>
                  <div className="globe-corner bottom-right"></div>

                  {/* Base Radar Rings */}
                  <div className="globe-base-ring outer"></div>
                  <div className="globe-base-ring inner"></div>
                  <div className="globe-base-ring center"></div>

                  <div className="holo-globe">
                    <div className="globe-ring lon-1"></div>
                    <div className="globe-ring lon-2"></div>
                    <div className="globe-ring lon-3"></div>
                    <div className="globe-ring lon-4"></div>
                    <div className="globe-ring lon-5"></div>
                    <div className="globe-ring lon-6"></div>
                    <div className="globe-ring lat-1"></div>
                    <div className="globe-ring lat-2"></div>
                    <div className="globe-ring lat-3"></div>
                    <div className="globe-ring lat-4"></div>
                    <div className="globe-ring lat-5"></div>
                  </div>
                  <div className="globe-orbit"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="hud-footer">
            <span>NEURAL_LINK::ACTIVE</span>
          </div>
        </div>
      </div>
    </Html>
  );
};

const PlexusNetwork = ({
  pointsMatRef,
  linesMatRef,
  htmlRefs,
  isMobile,
  viewportWidth,
  dragRotationRef
}: {
  pointsMatRef: React.RefObject<THREE.PointsMaterial | null>,
  linesMatRef: React.RefObject<THREE.LineBasicMaterial | null>,
  htmlRefs: React.MutableRefObject<HTMLDivElement[]>,
  isMobile: boolean,
  viewportWidth: number,
  dragRotationRef?: React.MutableRefObject<{ x: number, y: number }>
}) => {
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (context) {
      context.beginPath();
      context.arc(32, 32, 30, 0, 2 * Math.PI, false);
      context.fillStyle = '#ffffff';
      context.fill();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  const { points, lines } = useMemo(() => {
    const randomCount = 145;
    const totalCount = randomCount + TOUR_NODES.length;
    const positions = new Float32Array(totalCount * 3);
    const nodes = [];

    // 1. Inject the 5 hardcoded tour nodes
    TOUR_NODES.forEach((node, i) => {
      positions[i * 3] = node.pos.x;
      positions[i * 3 + 1] = node.pos.y;
      positions[i * 3 + 2] = node.pos.z;
      nodes.push(node.pos);
    });

    // 2. Generate 145 random organic nodes
    for (let i = 0; i < randomCount; i++) {
      const r = 1.1 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = r * Math.sin(phi) * Math.cos(theta) * 0.8;
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.9;
      const z = r * Math.cos(phi) * 1.1;

      const idx = i + TOUR_NODES.length;
      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = z;
      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect close nodes
    const lineIndices = [];
    for (let i = 0; i < totalCount; i++) {
      for (let j = i + 1; j < totalCount; j++) {
        if (nodes[i].distanceTo(nodes[j]) < 0.45) {
          lineIndices.push(i, j);
        }
      }
    }

    const geoPoints = new THREE.BufferGeometry();
    geoPoints.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const geoLines = new THREE.BufferGeometry();
    geoLines.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geoLines.setIndex(lineIndices);

    return { points: geoPoints, lines: geoLines };
  }, []);

  return (
    <group>
      <points geometry={points}>
        <pointsMaterial ref={pointsMatRef} map={circleTexture} alphaTest={0.5} color="#00ffff" size={0.04} transparent opacity={0} sizeAttenuation={true} />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial ref={linesMatRef} color="#0088ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      {/* Attach HTML Cards. Using standard DOM overlays perfectly tracking 3D coordinates. */}
      {TOUR_NODES.map((node, index) => (
        <HudCard
          key={node.id}
          node={node}
          index={index}
          isMobile={isMobile}
          viewportWidth={viewportWidth}
          htmlRef={(el: any) => { if (el) htmlRefs.current[index] = el; }}
          dragRotationRef={dragRotationRef}
        />
      ))}
    </group>
  );
};

export const BrainModel = React.memo(({ progressRef, dragRotationRef }: { progressRef?: React.MutableRefObject<number>, dragRotationRef?: React.MutableRefObject<{ x: number, y: number }> }) => {
  const { scene } = useGLTF('/brain.glb');

  const [baseScale, setBaseScale] = useState(1);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setBaseScale(0.5);
      } else if (window.innerWidth < 1024) {
        setBaseScale(0.75);
      } else {
        setBaseScale(1.0);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // A single unified group so the Brain and Plexus move as one entity during the dive
  const mainGroupRef = useRef<THREE.Group>(null);
  const manualRotationGroupRef = useRef<THREE.Group>(null);
  const outerBrainMatRef = useRef<THREE.LineBasicMaterial>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial>(null);
  const linesMatRef = useRef<THREE.LineBasicMaterial>(null);
  const bgStarsMatRef = useRef<THREE.PointsMaterial>(null);
  const htmlRefs = useRef<HTMLDivElement[]>([]);

  const smoothProgress = useRef(0);

  const [edgeMeshes, setEdgeMeshes] = useState<{ edges: THREE.EdgesGeometry }[]>([]);

  useEffect(() => {
    let cancelled = false;

    const computeEdges = async () => {
      if (!scene) return;

      const tempMeshes: THREE.Mesh[] = [];
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          tempMeshes.push(child);
        }
      });

      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);

      const promises = tempMeshes.map((mesh) => {
        return new Promise<{ edges: THREE.EdgesGeometry }>((resolve) => {
          const geo = mesh.geometry.clone();
          geo.translate(-center.x, -center.y, -center.z);
          geo.scale(4 / maxDim, 4 / maxDim, 4 / maxDim);
          
          // Clone arrays because transferring buffer detaches them
          const positionArray = geo.attributes.position.array.slice();
          const indexArray = geo.index ? geo.index.array.slice() : undefined;
          
          const worker = new EdgesWorker();
          worker.onmessage = (e) => {
            const { edgesPosition } = e.data;
            const edgesGeo = new THREE.BufferGeometry();
            edgesGeo.setAttribute('position', new THREE.BufferAttribute(edgesPosition, 3));
            
            // Resolve with the mocked EdgesGeometry
            resolve({ edges: edgesGeo as unknown as THREE.EdgesGeometry });
            worker.terminate();
          };
          
          const transferrables = [positionArray.buffer];
          if (indexArray) transferrables.push(indexArray.buffer);
          
          worker.postMessage({ positionArray, indexArray }, transferrables);
        });
      });

      const extracted = await Promise.all(promises);

      if (!cancelled) {
        setEdgeMeshes(extracted);
      }
    };

    computeEdges();

    return () => { cancelled = true; };
  }, [scene]);

  useFrame((state, delta) => {
    const currentProgress = progressRef?.current ?? 0;
    const currentDrag = dragRotationRef?.current ?? { x: 0, y: 0 };

    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, currentProgress, 5.0 * delta);
    const sp = smoothProgress.current;

    const nodesCount = TOUR_NODES.length;
    const diveProgress = THREE.MathUtils.clamp(sp * nodesCount, 0, 1);
    const nodeIndexFloat = THREE.MathUtils.clamp(sp * nodesCount - 1.0, 0, nodesCount - 1);
    const tourProgress = nodeIndexFloat / Math.max(1, nodesCount - 1);

    if (mainGroupRef.current) {
      // Scale up massively to 20x so we physically fly inside the brain space
      const currentScale = (1.0 + diveProgress * 19.0) * baseScale;
      mainGroupRef.current.scale.setScalar(currentScale);

      // Calculate smooth cinematic rotation.
      // Because this group is wrapped in a (-90 X, 180 Z) rotation to flip the brain upright,
      // rotating its LOCAL Z axis actually spins it horizontally (World Y).
      const diveRotation = state.clock.elapsedTime * 0.1 + diveProgress * Math.PI * 4;
      const tourRotation = tourProgress * Math.PI;
      mainGroupRef.current.rotation.z = -(diveRotation + tourRotation);

      // 1. Dive Translation: Center the brain and bring it to Z=4.0
      // In this coordinate space, World Z (+Z towards camera) = Local +Y.
      const divePos = new THREE.Vector3(0, diveProgress * 4.0, 0);

      // 2. Tour Translation: Frame specific nodes
      const idx1 = Math.floor(nodeIndexFloat);
      const idx2 = Math.min(TOUR_NODES.length - 1, idx1 + 1);
      const fraction = nodeIndexFloat - idx1;

      const easeFraction = fraction * fraction * (3 - 2 * fraction);
      const targetNodeLocalPos = new THREE.Vector3().lerpVectors(TOUR_NODES[idx1].pos, TOUR_NODES[idx2].pos, easeFraction);

      // Apply the group's own rotation to know where the node ended up
      const rotatedTarget = targetNodeLocalPos.clone().applyEuler(new THREE.Euler(0, 0, mainGroupRef.current.rotation.z));

      // Calculate offset to place the target node at World Z = 4.5 (Local Y = 4.5)
      const tourFramingPos = new THREE.Vector3(
        -rotatedTarget.x * currentScale,
        -rotatedTarget.y * currentScale,
        -rotatedTarget.z * currentScale
      );

      // Smoothly blend from the dive center path into the specific tour framing path
      // By the time diveProgress reaches 1.0, transitionToTour reaches 1.0, meaning Node 0 is PERFECTLY framed
      // right as the dive finishes and the tour begins!
      const transitionToTour = Math.max(0, (diveProgress - 0.5) * 2.0);
      mainGroupRef.current.position.lerpVectors(divePos, tourFramingPos, transitionToTour);
    }

    if (manualRotationGroupRef.current) {
      // Local X is screen vertical tilt
      manualRotationGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        manualRotationGroupRef.current.rotation.x,
        currentDrag.x,
        8.0 * delta
      );
      // Local Z is screen horizontal spin (because parent rotates -90 X, 180 Z)
      manualRotationGroupRef.current.rotation.z = THREE.MathUtils.lerp(
        manualRotationGroupRef.current.rotation.z,
        currentDrag.y,
        8.0 * delta
      );
    }

    // Fade out outer brain
    if (outerBrainMatRef.current) {
      outerBrainMatRef.current.opacity = THREE.MathUtils.clamp(0.3 - diveProgress * 0.6, 0, 0.3);
    }

    // Fade in inner neural network
    if (pointsMatRef.current && linesMatRef.current) {
      const innerAlpha = THREE.MathUtils.clamp(diveProgress * 2.0, 0, 1);
      pointsMatRef.current.opacity = innerAlpha * 0.8;
      linesMatRef.current.opacity = innerAlpha * 0.25;

      // Make points visually massive when scaled up
      if (mainGroupRef.current) {
        pointsMatRef.current.size = 0.03 * mainGroupRef.current.scale.x;
      }
    }

    if (bgStarsMatRef.current) {
      bgStarsMatRef.current.opacity = THREE.MathUtils.clamp((diveProgress - 0.4) * 2.0, 0, 0.6);
    }

    // Sequential Card Fading Logic
    TOUR_NODES.forEach((_, index) => {
      // Calculate how far we are from this card's exact node index
      const dist = Math.abs(nodeIndexFloat - index);

      // Fade in sharply, stay fully visible while near the center plateau
      const cardOpacity = THREE.MathUtils.clamp(2.0 - dist * 2.5, 0, 1);

      if (htmlRefs.current[index]) {
        // Only start showing cards AFTER we have finished diving into the brain
        const finalOpacity = diveProgress > 0.9 ? cardOpacity : 0;

        const el = htmlRefs.current[index];
        const newOpacityStr = finalOpacity.toFixed(3);
        const newPointerEvents = finalOpacity > 0.5 ? 'auto' : 'none';
        const newTransform = `scale(${(0.8 + finalOpacity * 0.2).toFixed(3)})`;
        const newVisibility = finalOpacity > 0.01 ? 'visible' : 'hidden';

        if (el.dataset.opacity !== newOpacityStr) {
          el.style.opacity = newOpacityStr;
          el.dataset.opacity = newOpacityStr;
        }
        if (el.dataset.pointerEvents !== newPointerEvents) {
          el.style.pointerEvents = newPointerEvents;
          el.dataset.pointerEvents = newPointerEvents;
        }
        if (el.dataset.transform !== newTransform) {
          el.style.transform = newTransform;
          el.dataset.transform = newTransform;
        }
        if (el.dataset.visibility !== newVisibility) {
          el.style.visibility = newVisibility;
          el.dataset.visibility = newVisibility;
        }
      }
    });
  });

  return (
    <group position={[0, 0, 0]}>
      {/* 
        Math.PI on Z flips the model right-side up.
        -Math.PI/2 on X sets it to a side-profile orientation.
      */}
      <group rotation={[-Math.PI / 2, 0, Math.PI]}>

        {/* Unified group: The Brain and Neural Network share identical physics */}

        {/* Render stars OUTSIDE the main scaling group so they stay locked in background space */}
        <BackgroundStars starsMatRef={bgStarsMatRef} />

        {/* Rubber-band manual rotation wrapper */}
        <group ref={manualRotationGroupRef}>
          <group ref={mainGroupRef}>

            {/* Outer Brain Shell (Fades away during dive) */}
            {edgeMeshes.map((meshData, index) => (
              <lineSegments key={index} geometry={meshData.edges}>
                <lineBasicMaterial
                  ref={index === 0 ? outerBrainMatRef : null}
                  color="#1a4dff"
                  transparent={true}
                  opacity={0.3}
                  blending={THREE.AdditiveBlending}
                  depthWrite={false}
                />
              </lineSegments>
            ))}

            {/* Inner Neural Network (Revealed during dive) */}
            <PlexusNetwork
              pointsMatRef={pointsMatRef}
              linesMatRef={linesMatRef}
              htmlRefs={htmlRefs}
              isMobile={baseScale <= 0.5}
              viewportWidth={viewportWidth}
              dragRotationRef={dragRotationRef}
            />

          </group>
        </group>
      </group>
    </group>
  );
});
