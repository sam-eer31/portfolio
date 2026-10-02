export const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uStrength;

varying float vZ;

void main() {
  vec3 pos = position;
  
  float dx = pos.x - uMouse.x;
  float dy = pos.y - uMouse.y;
  float distanceSq = dx * dx + dy * dy;
  
  float spread = 25.0; 
  float pull = exp(-distanceSq / spread); 
  
  // Multiply the pull by uStrength so it can smoothly fade in/out
  float z = -pull * 3.0 * uStrength; 
  
  float pullInwards = pull * 0.1 * uStrength;
  pos.x -= dx * pullInwards;
  pos.y -= dy * pullInwards;
  
  z += sin(pos.x * 0.8 + uTime) * 0.1 + cos(pos.y * 0.8 + uTime) * 0.1;
  
  pos.z = z;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  vZ = -mvPosition.z; 
}
`;

export const fragmentShader = `
uniform vec3 uColor;
uniform float uOpacity;

varying float vZ;

void main() {
  // Calculate fog: starts fading at 5.0 units, completely invisible at 25.0 units
  float fogFactor = smoothstep(5.0, 25.0, vZ);
  
  float finalOpacity = uOpacity * (1.0 - fogFactor);
  
  gl_FragColor = vec4(uColor, finalOpacity);
}
`;
