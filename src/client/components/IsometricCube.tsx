import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

const IsometricCube = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;

    if (!canUseWebGL()) {
      mountNode.style.background = 'radial-gradient(circle at center, #111 0%, #000 70%)';
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    camera.position.set(15, 25, 15);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: true,
        powerPreference: 'default',
        failIfMajorPerformanceCaveat: true
      });
    } catch {
      mountNode.style.background = 'radial-gradient(circle at center, #111 0%, #000 70%)';
      return;
    }
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountNode.appendChild(renderer.domElement);

    // Create cubes grid
    const cubeSize = 2;
    const gap = 0.5;
    const gridSizeX = 25;
    const gridSizeZ = 25;
    const cubes = [];

    const colorStart = new THREE.Color(0xFACC15); 
    const colorEnd   = new THREE.Color(0xEAB308); 

    for (let x = 0; x < gridSizeX; x++) {
      for (let z = 0; z < gridSizeZ; z++) {
        const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        
        const progress = (x + z) / (gridSizeX + gridSizeZ);
        const color = colorStart.clone().lerp(colorEnd, progress);
        
        const material = new THREE.MeshBasicMaterial({
          color: 0x000000, // Cube face color
          transparent: false,
          opacity: 1
        });
        
        const cube = new THREE.Mesh(geometry, material);
        
        // Platform/shadow at base
        const platformGeometry = new THREE.PlaneGeometry(cubeSize * 1.1, cubeSize * 1.1);
        const platformMaterial = new THREE.MeshStandardMaterial({
          color: color,
          transparent: true,
          opacity: 0,
          side: THREE.DoubleSide,
          emissive: color,
          emissiveIntensity: 0
        });
        const platform = new THREE.Mesh(platformGeometry, platformMaterial);
        platform.rotation.x = -Math.PI / 2;
        platform.position.y = -cubeSize / 2;
        cube.add(platform);
        
        // Thick edges as meshes
        const edgeThickness = 0.08;
        const edgeMaterial = new THREE.MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0
        });

        const edgesGroup = new THREE.Group();

        const createEdge = (w, h, d, x, y, z) => {
          const geom = new THREE.BoxGeometry(w, h, d);
          const edge = new THREE.Mesh(geom, edgeMaterial);
          edge.position.set(x, y, z);
          edgesGroup.add(edge);
        };

        const h = cubeSize / 2;
        const l = cubeSize;

        // X edges
        createEdge(l, edgeThickness, edgeThickness, 0,  h,  h);
        createEdge(l, edgeThickness, edgeThickness, 0,  h, -h);
        createEdge(l, edgeThickness, edgeThickness, 0, -h,  h);
        createEdge(l, edgeThickness, edgeThickness, 0, -h, -h);

        // Y edges
        createEdge(edgeThickness, l, edgeThickness,  h, 0,  h);
        createEdge(edgeThickness, l, edgeThickness, -h, 0,  h);
        createEdge(edgeThickness, l, edgeThickness,  h, 0, -h);
        createEdge(edgeThickness, l, edgeThickness, -h, 0, -h);

        // Z edges
        createEdge(edgeThickness, edgeThickness, l,  h,  h, 0);
        createEdge(edgeThickness, edgeThickness, l, -h,  h, 0);
        createEdge(edgeThickness, edgeThickness, l,  h, -h, 0);
        createEdge(edgeThickness, edgeThickness, l, -h, -h, 0);

        cube.add(edgesGroup);
        
        // Position cubes
        const offsetX = (gridSizeX * (cubeSize + gap)) / 2 - (cubeSize + gap) / 2;
        const offsetZ = (gridSizeZ * (cubeSize + gap)) / 2 - (cubeSize + gap) / 2;
        
        cube.position.x = x * (cubeSize + gap) - offsetX;
        cube.position.z = z * (cubeSize + gap) - offsetZ;
        cube.position.y = 0; 
        
        cube.userData = {
          initialY: 0,
          targetY: 0,
          currentY: 0,
          targetOpacity: 0,
          currentOpacity: 0,
          baseOpacity: 0,
          targetEmissive: 0,
          currentEmissive: 0,
          gridX: x,
          gridZ: z,
          baseColor: color.clone(),
          platform: platform,
          edgesGroup: edgesGroup
        };
        
        scene.add(cube);
        cubes.push(cube);
      }
    }


    // Mouse tracking avec raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const mouseWorldPosition = new THREE.Vector3(999, 0, 999);
    
    // Create an invisible plane for mouse tracking
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // Rotate to be horizontal
    scene.add(plane);
    
    const onMouseMove = (event) => {
      // Normalized device coordinates
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      // Update raycaster
      raycaster.setFromCamera(mouse, camera);
      
      // Intersect with plane
      const intersects = raycaster.intersectObject(plane);
      if (intersects.length > 0) {
        const point = intersects[0].point;
        mouseWorldPosition.x = point.x;
        mouseWorldPosition.z = point.z;
      } else {
        // If no intersection, move mouse far away
        mouseWorldPosition.set(999, 0, 999);
      }
    };
    
    window.addEventListener('mousemove', onMouseMove);

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      cubes.forEach((cube, index) => {
        // Calculate distance from mouse
        const dx = cube.position.x - mouseWorldPosition.x;
        const dz = cube.position.z - mouseWorldPosition.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        const effectRadius = 8;
        
        // Apply mouse effect
        if (dist < effectRadius) {
          const strength = Math.pow(1 - (dist / effectRadius), 2);
          cube.userData.targetY = strength * cubeSize * 2.5;
          cube.userData.targetOpacity = strength;
          cube.userData.targetEmissive = strength;
        } else {
          cube.userData.targetY = 0;
          cube.userData.targetOpacity = 0;
          cube.userData.targetEmissive = 0;
        }
        
        // Smooth interpolation
        cube.userData.currentY += (cube.userData.targetY - cube.userData.currentY) * 0.15;
        cube.userData.currentOpacity += (cube.userData.targetOpacity - cube.userData.currentOpacity) * 0.15;
        cube.userData.currentEmissive += (cube.userData.targetEmissive - cube.userData.currentEmissive) * 0.15;
        
        // IMPORTANT: Mettre à jour la position Y du cube
        cube.position.y = cube.userData.currentY;
        
        const edgeOpacity = cube.userData.currentOpacity;
        const platformOpacity = cube.userData.currentOpacity * 0.8;
        const emissiveIntensity = cube.userData.currentEmissive * 0.6;
        
        cube.userData.edgesGroup.children.forEach(edge => {
          edge.material.opacity = edgeOpacity;
        });
        cube.userData.platform.material.opacity = platformOpacity;
        cube.userData.platform.material.emissiveIntensity = emissiveIntensity;
        cube.material.opacity = 0;
      });
      
      
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (mountNode && renderer.domElement && mountNode.contains(renderer.domElement)) {
        mountNode.removeChild(renderer.domElement);
      }
      
      cubes.forEach(cube => {
        cube.geometry.dispose();
        cube.material.dispose();
        if (cube.userData.edgesGroup) {
          cube.userData.edgesGroup.children.forEach(edge => {
            edge.geometry.dispose();
            edge.material.dispose();
          });
        }
        if (cube.userData.platform) {
          cube.userData.platform.geometry.dispose();
          cube.userData.platform.material.dispose();
        }
      });
      planeGeometry.dispose();
      planeMaterial.dispose();
      if (renderer) renderer.dispose();
    };
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}
    >
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.75) 100%)'
        }}
      />
    </div>
  );
};

export default IsometricCube;