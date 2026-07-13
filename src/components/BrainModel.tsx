import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Hexagon } from 'lucide-react';

const TOUR_NODES = [
  {
    id: 0,
    pos: new THREE.Vector3(0.5, 0.5, 0.5),
    title: "System Initialization",
    subtitle: "Identity & Origin",
    description: "Alex Vance. Senior Creative Technologist specializing in the intersection of neural interfaces, WebGL, and generative AI. Booting up sequence complete.",
    tags: ["Creative Technologist", "Full-Stack", "AI Integration"]
  },
  {
    id: 1,
    pos: new THREE.Vector3(-0.6, 0.2, 0.4),
    title: "Cognitive Core",
    subtitle: "Skills & Stack",
    description: "Fluent in processing complex logic and rendering high-fidelity graphics. Core competencies include modern web frameworks, 3D pipelines, and realtime data processing.",
    tags: ["React", "Three.js", "Node.js", "TypeScript"]
  },
  {
    id: 2,
    pos: new THREE.Vector3(0.0, -0.4, 0.6),
    title: "Synaptic Pathways",
    subtitle: "Professional Experience",
    description: "Lead Developer at CyberDyne Systems (2022-Present). Architected distributed systems handling millions of concurrent neural-link connections.",
    tags: ["Leadership", "Architecture", "Mentorship"]
  },
  {
    id: 3,
    pos: new THREE.Vector3(0.4, -0.2, -0.5),
    title: "Memory Engram 01",
    subtitle: "Project: CEREBRAL",
    description: "A fully immersive, WebGL-powered interactive portfolio journey mapped to the anatomical structures of a 3D neural network. Built with React Three Fiber.",
    tags: ["WebGL", "R3F", "Cyberpunk UI"]
  },
  {
    id: 4,
    pos: new THREE.Vector3(-0.3, 0.6, -0.4),
    title: "Memory Engram 02",
    subtitle: "Project: NEON_CITY",
    description: "Procedural city generator utilizing WebGPU for real-time raytraced reflections and traffic simulation. Featured on Awwwards.",
    tags: ["WebGPU", "Procedural", "GLSL"]
  },
  {
    id: 5,
    pos: new THREE.Vector3(0.6, -0.6, -0.2),
    title: "Deep Learning",
    subtitle: "Education",
    description: "M.S. in Human-Computer Interaction, MIT Media Lab. Focus on spatial computing and brain-computer interfaces.",
    tags: ["HCI", "Spatial Computing", "Research"]
  },
  {
    id: 6,
    pos: new THREE.Vector3(-0.5, -0.5, -0.5),
    title: "Transmit Signal",
    subtitle: "Contact & Network",
    description: "Ready to establish a new synaptic connection? Open to visionary projects and bleeding-edge tech roles.",
    tags: ["alex@vance.net", "github.com/vance", "LinkedIn"]
  }
];

const PlexusNetwork = ({
  pointsMatRef,
  linesMatRef,
  htmlRefs,
  isMobile,
  viewportWidth
}: {
  pointsMatRef: React.RefObject<THREE.PointsMaterial | null>,
  linesMatRef: React.RefObject<THREE.LineBasicMaterial | null>,
  htmlRefs: React.MutableRefObject<HTMLDivElement[]>,
  isMobile: boolean,
  viewportWidth: number
}) => {
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
        <pointsMaterial ref={pointsMatRef} color="#00ffff" size={0.04} transparent opacity={0} sizeAttenuation={true} />
      </points>
      <lineSegments geometry={lines}>
        <lineBasicMaterial ref={linesMatRef} color="#0088ff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      {/* Attach HTML Cards. Using standard DOM overlays perfectly tracking 3D coordinates. */}
      {TOUR_NODES.map((node, index) => {
        const cardWidth = isMobile ? 650 : 850;
        const cardHeight = isMobile ? 420 : 520;
        const cy = cardHeight / 2 + 40;
        
        // Dynamically calculate distanceFactor so the card visually occupies ~85% of the screen width.
        // The constant 4.25 is derived from the desktop reference (W=1200, C=850, DF=6).
        let dynamicDF = (viewportWidth * 4.25) / cardWidth;
        dynamicDF = Math.max(1.5, Math.min(dynamicDF, 7)); // Clamp min/max zoom

        return (
          <Html
            key={node.id}
            position={node.pos}
            center
            distanceFactor={dynamicDF}
            zIndexRange={[100, 0]}
          >
            <div
              ref={(el) => {
                if (el) htmlRefs.current[index] = el;
              }}
              className="hud-wrapper"
              style={{ width: `${cardWidth}px`, height: `${cardHeight}px`, position: 'relative' }}
            >
              <svg
                className="hud-svg-frame"
                viewBox={`0 0 ${cardWidth} ${cardHeight}`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}
              >
                {/* Main Card Background with Inner Shadow Effect */}
                <path
                  d={`M 30 0 L ${cardWidth - 30} 0 L ${cardWidth} 30 L ${cardWidth} ${cy} L ${cardWidth - 15} ${cy + 15} L ${cardWidth - 15} ${cy + 80} L ${cardWidth} ${cy + 95} L ${cardWidth} ${cardHeight - 30} L ${cardWidth - 30} ${cardHeight} L 30 ${cardHeight} L 0 ${cardHeight - 30} L 0 ${cy + 95} L 15 ${cy + 80} L 15 ${cy + 15} L 0 ${cy} L 0 30 Z`}
                  fill="rgba(2, 8, 19, 0.85)"
                  stroke="rgba(0, 229, 255, 0.4)"
                  strokeWidth="1"
                />

                {/* Bright Outer Glow Border */}
                <path
                  d={`M 30 0 L ${cardWidth - 30} 0 L ${cardWidth} 30 L ${cardWidth} ${cy} L ${cardWidth - 15} ${cy + 15} L ${cardWidth - 15} ${cy + 80} L ${cardWidth} ${cy + 95} L ${cardWidth} ${cardHeight - 30} L ${cardWidth - 30} ${cardHeight} L 30 ${cardHeight} L 0 ${cardHeight - 30} L 0 ${cy + 95} L 15 ${cy + 80} L 15 ${cy + 15} L 0 ${cy} L 0 30 Z`}
                  fill="none"
                  stroke="#00e5ff"
                  strokeWidth="1"
                  filter="drop-shadow(0 0 4px #00e5ff)"
                />

                {/* Top-Left Thick Bracket */}
                <path
                  d="M 0 60 L 0 30 L 30 0 L 120 0"
                  fill="none"
                  stroke="#00e5ff"
                  strokeWidth="3"
                  filter="drop-shadow(0 0 6px #00e5ff)"
                />

                {/* Bottom-Right Thick Bracket */}
                <path
                  d={`M ${cardWidth} ${cardHeight - 80} L ${cardWidth} ${cardHeight - 30} L ${cardWidth - 30} ${cardHeight} L ${cardWidth - 120} ${cardHeight}`}
                  fill="none"
                  stroke="#00e5ff"
                  strokeWidth="3"
                  filter="drop-shadow(0 0 6px #00e5ff)"
                />

                {/* Edge Ticks */}
                <path d="M 150 0 L 150 6 M 160 0 L 160 6 M 170 0 L 170 6" stroke="#00e5ff" strokeWidth="2" />
                <path d={`M ${cardWidth - 170} ${cardHeight} L ${cardWidth - 170} ${cardHeight - 6} M ${cardWidth - 160} ${cardHeight} L ${cardWidth - 160} ${cardHeight - 6} M ${cardWidth - 150} ${cardHeight} L ${cardWidth - 150} ${cardHeight - 6}`} stroke="#00e5ff" strokeWidth="2" />

                {/* Corner Crosshairs */}
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

              <div className="hud-card" style={{ position: 'relative', zIndex: 1, padding: isMobile ? '1.5rem' : '2.5rem', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

                <div style={{ display: 'flex', gap: isMobile ? '1rem' : '1.5rem', flex: 1, flexDirection: 'row' }}>

                  {/* Left Col: Target Ring */}
                  <div style={{ width: isMobile ? '50px' : '70px', flexShrink: 0, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    <div className="hud-target-ring">
                      <div className="hud-target-core"></div>
                    </div>
                  </div>

                  {/* Glowing Vertical Divider */}
                  <div style={{ width: '2px', background: 'var(--cyan-primary)', boxShadow: '0 0 10px var(--cyan-primary)', height: '230px', marginTop: '10px', marginBottom: '0' }}></div>

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

                    <p className="hud-description">
                      <strong style={{ color: '#fff' }}>{node.description.split('.')[0]}.</strong>
                      {node.description.substring(node.description.indexOf('.') + 1)}
                    </p>

                    <div className="hud-tags-grid">
                      {node.tags.map((tag, i) => (
                        <div key={i} className="hud-tag">
                          <div className="hud-tag-num">0{i + 1}</div>
                          <div className="hud-tag-text">{tag}</div>
                          <Hexagon className="hud-tag-icon" size={14} />
                          <div className="hud-tag-waveform"></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Col: Telemetry */}
                  <div style={{ width: isMobile ? '140px' : '160px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '2rem' }}>
                    <div className="hud-telemetry">
                      <div className="hud-tel-item">
                        <span className="hud-tel-label">NEURAL ID</span>
                        <span className="hud-tel-val">98.7%</span>
                      </div>
                      <div className="hud-tel-item">
                        <span className="hud-tel-label">CREATIVE SYS</span>
                        <span className="hud-tel-val">ONLINE</span>
                      </div>
                      <div className="hud-tel-item">
                        <span className="hud-tel-label">AI LINK</span>
                        <span className="hud-tel-val">SYNC</span>
                      </div>
                      <div className="hud-tel-item">
                        <span className="hud-tel-label">WEBGL CORE</span>
                        <span className="hud-tel-val">READY</span>
                      </div>
                    </div>

                    <div className="hud-live-feed">
                      <div className="hud-feed-label">+ LIVE FEED</div>
                      <div className="hud-feed-box">
                        <div className="radar-sweep"></div>
                        <div className="radar-grid"></div>
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
      })}
    </group>
  );
};

export const BrainModel = ({ progress = 0 }: { progress?: number }) => {
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
  const outerBrainMatRef = useRef<THREE.LineBasicMaterial>(null);
  const pointsMatRef = useRef<THREE.PointsMaterial>(null);
  const linesMatRef = useRef<THREE.LineBasicMaterial>(null);
  const htmlRefs = useRef<HTMLDivElement[]>([]);

  const smoothProgress = useRef(0);

  const edgeMeshes = useMemo(() => {
    const extracted: { edges: THREE.EdgesGeometry }[] = [];
    if (scene) {
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

      tempMeshes.forEach(mesh => {
        const geo = mesh.geometry.clone();
        geo.translate(-center.x, -center.y, -center.z);
        geo.scale(4 / maxDim, 4 / maxDim, 4 / maxDim);

        const edges = new THREE.EdgesGeometry(geo, 6);
        extracted.push({ edges });
      });
    }
    return extracted;
  }, [scene]);

  useFrame((state, delta) => {
    smoothProgress.current = THREE.MathUtils.lerp(smoothProgress.current, progress, 5.0 * delta);
    const sp = smoothProgress.current;

    const diveProgress = THREE.MathUtils.clamp(sp / (1 / 7), 0, 1);
    const tourProgress = THREE.MathUtils.clamp((sp - (1 / 7)) / (6 / 7), 0, 1);

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
      const nodeIndexFloat = tourProgress * (TOUR_NODES.length - 1);
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

    // Sequential Card Fading Logic
    TOUR_NODES.forEach((_, index) => {
      // Each card represents a stop on the tour (0, 0.25, 0.5, 0.75, 1.0)
      const segmentCenter = index * (1 / (TOUR_NODES.length - 1));

      // Calculate how close we are to this card's segment
      const dist = Math.abs(tourProgress - segmentCenter);

      // Fade in sharply and stay fully visible during the slowdown plateau (dist < 0.05)
      const cardOpacity = THREE.MathUtils.clamp(1.5 - dist * 10.0, 0, 1);

      if (htmlRefs.current[index]) {
        // Only start showing cards AFTER we have finished diving into the brain
        const finalOpacity = diveProgress > 0.9 ? cardOpacity : 0;
        htmlRefs.current[index].style.opacity = finalOpacity.toString();
        htmlRefs.current[index].style.pointerEvents = finalOpacity > 0.5 ? 'auto' : 'none';

        // Add a slight popup animation as it comes into focus
        htmlRefs.current[index].style.transform = `scale(${0.8 + finalOpacity * 0.2})`;
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
          />

        </group>
      </group>
    </group>
  );
};
