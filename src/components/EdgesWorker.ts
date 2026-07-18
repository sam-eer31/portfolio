import * as THREE from 'three';

self.onmessage = (e) => {
  const { positionArray, indexArray } = e.data;
  
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positionArray, 3));
  if (indexArray) {
    geo.setIndex(new THREE.BufferAttribute(indexArray, 1));
  }
  
  const edges = new THREE.EdgesGeometry(geo, 5);
  const edgesPosition = edges.attributes.position.array as Float32Array;
  
  // Transfer the buffer back to main thread to avoid copy overhead
  (self as any).postMessage({ edgesPosition }, [edgesPosition.buffer]);
};
