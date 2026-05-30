"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * 350 red + 180 white drifting particles.
 * Per-particle trig removed — just constant velocity + global slow sine.
 * DPR capped at 1 — halves GPU load on retina screens.
 */
function Particles({ count = 350 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * viewport.width  * 2.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3]     = (Math.random() - 0.5) * 0.003;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
    }
    return [pos, vel];
  }, [count, viewport.width, viewport.height]);

  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mouse.current.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    // One global wave per frame — not per particle
    const wave = Math.sin(clock.getElapsedTime() * 0.25) * 0.001;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      pos[ix]     += velocities[ix]     + wave;
      pos[ix + 1] += velocities[ix + 1] + wave;

      const hw = viewport.width  * 1.3;
      const hh = viewport.height * 1.3;
      if (pos[ix]     >  hw) pos[ix]     = -hw;
      if (pos[ix]     < -hw) pos[ix]     =  hw;
      if (pos[ix + 1] >  hh) pos[ix + 1] = -hh;
      if (pos[ix + 1] < -hh) pos[ix + 1] =  hh;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Subtle mouse-reactive tilt
    mesh.current.rotation.x += (mouse.current.y * 0.0003 - mesh.current.rotation.x) * 0.04;
    mesh.current.rotation.y += (mouse.current.x * 0.0003 - mesh.current.rotation.y) * 0.04;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#CC3300" transparent opacity={0.35} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function ParticlesWhite({ count = 180 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * viewport.width  * 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3]     = (Math.random() - 0.5) * 0.0015;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.0015;
    }
    return [pos, vel];
  }, [count, viewport.width, viewport.height]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    const wave = Math.cos(clock.getElapsedTime() * 0.15) * 0.0008;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      pos[ix]     += velocities[ix]     + wave;
      pos[ix + 1] += velocities[ix + 1] + wave;

      const hw = viewport.width  * 1.5;
      const hh = viewport.height * 1.5;
      if (pos[ix]     >  hw) pos[ix]     = -hw;
      if (pos[ix]     < -hw) pos[ix]     =  hw;
      if (pos[ix + 1] >  hh) pos[ix + 1] = -hh;
      if (pos[ix + 1] < -hh) pos[ix + 1] =  hh;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.008} color="#8899BB" transparent opacity={0.25} sizeAttenuation depthWrite={false} />
    </points>
  );
}

export default function ParticleField() {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={1}
        style={{ background: "transparent" }}
      >
        <Particles />
        <ParticlesWhite />
      </Canvas>
    </div>
  );
}
