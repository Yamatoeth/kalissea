"use client";
import React, { useEffect, useRef } from 'react';
// Import uniquement ce qui est nécessaire de Three.js
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  BoxGeometry,
  PlaneGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  Mesh,
  Group,
  Color,
  Raycaster,
  Vector2,
  Vector3,
  DoubleSide
} from 'three';

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

    // Intersection Observer to stop animation when not visible
    let isVisible = true;
    let animId: number;
    
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (!isVisible) {
        cancelAnimationFrame(animId);
      }
    }, { threshold: 0.1 });
    
    observer.observe(mountNode);

    // Scene setup
    const scene = new Scene();
    scene.background = new Color(0x000000);
    
    const camera = new PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    
    camera.position.set(15, 25, 15);
    camera.lookAt(0, 0, 0);

    let renderer;
    try {
      renderer = new WebGLRenderer({
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
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limiter pour perfs
    mountNode.appendChild(renderer.domElement);

    // Create cubes grid
    const cubeSize = 2;
    const gap = 0.5;
    const gridSizeX = 25;
    const gridSizeZ = 25;
    const cubes = [];

    const colorStart = new Color(0xFACC15); 
    const colorEnd   = new Color(0xEAB308); 

    for (let x = 0; x < gridSizeX; x++) {
      for (let z = 0; z < gridSizeZ; z++) {
        const geometry = new BoxGeometry(cubeSize, cubeSize, cubeSize);
        
        const progress = (x + z) / (gridSizeX + gridSizeZ);
        const color = colorStart.clone().lerp(colorEnd, progress);
        
        const material = new MeshBasicMaterial({
          color: 0x000000,
          transparent: false,
          opacity: 1
        });
        
        const cube = new Mesh(geometry, material);
        
        // Platform/shadow at base
        const platformGeometry = new PlaneGeometry(cubeSize * 1.1, cubeSize * 1.1);
        const platformMaterial = new MeshStandardMaterial({
          color: color,
          transparent: true,
          opacity: 0,
          side: DoubleSide,
          emissive: color,
          emissiveIntensity: 0
        });
        const platform = new Mesh(platformGeometry, platformMaterial);
        platform.rotation.x = -Math.PI / 2;
        platform.position.y = -cubeSize / 2;
        cube.add(platform);
        
        // Thick edges as meshes
        const edgeThickness = 0.08;
        const edgeMaterial = new MeshBasicMaterial({
          color: color,
          transparent: true,
          opacity: 0
        });

        const edgesGroup = new Group();

        const createEdge = (w, h, d, x, y, z) => {
          const geom = new BoxGeometry(w, h, d);
          const edge = new Mesh(geom, edgeMaterial);
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
    const raycaster = new Raycaster();
    const mouse = new Vector2();
    const mouseWorldPosition = new Vector3(999, 0, 999);
    
    // Create an invisible plane for mouse tracking
    const planeGeometry = new PlaneGeometry(1000, 1000);
    const planeMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0 });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);
    
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      raycaster.setFromCamera(mouse, camera);
      
      const intersects = raycaster.intersectObject(plane);
      if (intersects.length > 0) {
        const point = intersects[0].point;
        mouseWorldPosition.x = point.x;
        mouseWorldPosition.z = point.z;
      } else {
        mouseWorldPosition.set(999, 0, 999);
      }
    };
    
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Animation
    const animate = () => {
      if (isVisible) {
        animId = requestAnimationFrame(animate);
      }
      
      cubes.forEach((cube) => {
        const dx = cube.position.x - mouseWorldPosition.x;
        const dz = cube.position.z - mouseWorldPosition.z;
        const dist = Math.sqrt(dx * dx + dz * dz);
        
        const effectRadius = 8;
        
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
        
        cube.userData.currentY += (cube.userData.targetY - cube.userData.currentY) * 0.15;
        cube.userData.currentOpacity += (cube.userData.targetOpacity - cube.userData.currentOpacity) * 0.15;
        cube.userData.currentEmissive += (cube.userData.targetEmissive - cube.userData.currentEmissive) * 0.15;
        
        cube.position.y = cube.userData.currentY;
        
        const edgeOpacity = cube.userData.currentOpacity;
        const platformOpacity = cube.userData.currentOpacity * 0.8;
        const emissiveIntensity = cube.userData.currentEmissive * 0.6;
        
        cube.userData.edgesGroup.children.forEach(edge => {
          edge.material.opacity = edgeOpacity;
        });
        cube.userData.platform.material.opacity = platformOpacity;
        cube.userData.platform.material.emissiveIntensity = emissiveIntensity;
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
    window.addEventListener('resize', handleResize, { passive: true });

    // Cleanup
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animId);
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
    <div className="w-full h-full">
      <div ref={mountRef} className="w-full h-full" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/75" />
    </div>
  );
};

export default IsometricCube;