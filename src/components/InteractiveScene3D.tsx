import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, EyeOff, Sparkles, Activity } from 'lucide-react';

interface InteractiveScene3DProps {
  className?: string;
}

export const InteractiveScene3D: React.FC<InteractiveScene3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isPlayingRef = useRef<boolean>(true);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. WebGL Support & Software Renderer Detection
    const testCanvas = document.createElement('canvas');
    const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
    if (!gl) {
      setIsSupported(false);
      return;
    }

    const isMobile = window.innerWidth < 768;

    // 2. Scene, Camera, & Optimized Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable antialiasing on mobile to maintain high 60fps
      powerPreference: 'high-performance',
    });

    // Cap pixel ratio to 1.5 to protect mobile GPUs from high-DPI overhead
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // 3. Lightweight 3D Elements
    // Group to hold all objects for smooth group rotation & mouse parallax
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // A. Central Low-Poly Polyhedron (Icosahedron wireframe + vertices)
    const polyGeometry = new THREE.IcosahedronGeometry(isMobile ? 4.2 : 5.4, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: isMobile ? 0.22 : 0.28,
    });
    const centralPoly = new THREE.Mesh(polyGeometry, wireframeMaterial);
    mainGroup.add(centralPoly);

    // Inner glowing core polyhedron
    const innerGeometry = new THREE.OctahedronGeometry(isMobile ? 2.2 : 2.8, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const innerPoly = new THREE.Mesh(innerGeometry, innerMaterial);
    centralPoly.add(innerPoly);

    // B. Orbital Tech Rings (Torus with low segments)
    const ringGeometry = new THREE.TorusGeometry(isMobile ? 6.5 : 8.2, 0.04, 8, isMobile ? 36 : 48);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.25,
    });
    const orbitRing1 = new THREE.Mesh(ringGeometry, ringMaterial);
    orbitRing1.rotation.x = Math.PI / 3;
    mainGroup.add(orbitRing1);

    const ringGeometry2 = new THREE.TorusGeometry(isMobile ? 7.8 : 9.8, 0.03, 8, isMobile ? 36 : 48);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.2,
    });
    const orbitRing2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    orbitRing2.rotation.y = Math.PI / 4;
    mainGroup.add(orbitRing2);

    // C. Lightweight Floating Constellation Nodes
    const particleCount = isMobile ? 55 : 110;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSpeeds: { x: number; y: number; z: number }[] = [];

    const spread = isMobile ? 26 : 38;
    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * spread;
      particlePositions[idx + 1] = (Math.random() - 0.5) * spread;
      particlePositions[idx + 2] = (Math.random() - 0.5) * (spread * 0.7);

      particleSpeeds.push({
        x: (Math.random() - 0.5) * 0.004,
        y: (Math.random() - 0.5) * 0.004,
        z: (Math.random() - 0.5) * 0.004,
      });
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 0.35 : 0.45,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Smooth Mouse & Touch Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotationY = mouseX * 0.45;
      targetRotationX = -mouseY * 0.35;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const mouseX = (touch.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
        targetRotationY = mouseX * 0.35;
        targetRotationX = -mouseY * 0.25;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // 5. Window Resize Listener
    const handleResize = () => {
      if (!container) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // 6. Animation Loop with Resource Conservation
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isPlayingRef.current) return;

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Smooth camera/group lerp towards mouse
      currentRotationX += (targetRotationX - currentRotationX) * 0.05;
      currentRotationY += (targetRotationY - currentRotationY) * 0.05;

      mainGroup.rotation.x = currentRotationX + elapsedTime * 0.08;
      mainGroup.rotation.y = currentRotationY + elapsedTime * 0.12;

      // Polyhedron counter-rotation
      centralPoly.rotation.y += 0.005;
      centralPoly.rotation.z += 0.003;
      innerPoly.rotation.x -= 0.008;

      // Orbit rings spin
      orbitRing1.rotation.z += 0.004;
      orbitRing2.rotation.z -= 0.003;

      // Subtle slow drift of particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        positions[idx] += particleSpeeds[i].x;
        positions[idx + 1] += particleSpeeds[i].y;
        positions[idx + 2] += particleSpeeds[i].z;

        // Wrap around bounds
        const b = spread / 2;
        if (positions[idx] > b) positions[idx] = -b;
        if (positions[idx] < -b) positions[idx] = b;
        if (positions[idx + 1] > b) positions[idx + 1] = -b;
        if (positions[idx + 1] < -b) positions[idx + 1] = b;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup & GPU Resource Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      polyGeometry.dispose();
      wireframeMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!isSupported) {
    return null;
  }

  return (
    <>
      {/* 3D WebGL Canvas Layer (Fixed, behind content, non-blocking) */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className={`fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-65 ${className}`}
        style={{ willChange: 'transform' }}
      />

      {/* Floating 3D Scene Controls Dock */}
      <div
        className="fixed bottom-10 sm:bottom-4 right-4 z-30 select-none flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#090F1C]/85 backdrop-blur-md border border-white/10 text-xs shadow-xl transition-all">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[11px] font-semibold transition-all cursor-pointer ${
              isPlaying
                ? 'bg-blue-600/30 text-cyan-300 border border-blue-500/40'
                : 'bg-white/5 text-slate-400 hover:text-white'
            }`}
            title={isPlaying ? 'Pause 3D Environment (Saves battery)' : 'Resume 3D Environment'}
            aria-label="Toggle 3D Scene animation"
          >
            {isPlaying ? (
              <>
                <Sparkles className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span className="hidden sm:inline font-mono">3D Scene</span>
                <span className="text-emerald-400 font-bold">•</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3 h-3 text-slate-400" />
                <span className="hidden sm:inline font-mono">3D Paused</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};
