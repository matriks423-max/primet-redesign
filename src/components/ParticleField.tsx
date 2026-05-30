"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/** Single particle mesh — 700 points drifting in 3D space, reacting to mouse */
function Particles({ count = 700 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  // Generate random positions once
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * viewport.width * 2.5;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002;
      vel[i * 3 + 2] = 0;
    }
    return [pos, vel];
  }, [count, viewport.width, viewport.height]);

  const mouse = useRef({ x: 0, y: 0 });

  // Update on every frame
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      // Drift
      pos[ix] += velocities[ix] + Math.sin(t * 0.3 + i * 0.1) * 0.001;
      pos[ix + 1] += velocities[ix + 1] + Math.cos(t * 0.2 + i * 0.15) * 0.001;

      // Wrap edges
      const hw = viewport.width * 1.3;
      const hh = viewport.height * 1.3;
      if (pos[ix] > hw) pos[ix] = -hw;
      if (pos[ix] < -hw) pos[ix] = hw;
      if (pos[ix + 1] > hh) pos[ix + 1] = -hh;
      if (pos[ix + 1] < -hh) pos[ix + 1] = hh;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;

    // Subtle rotation reacting to mouse
    mesh.current.rotation.x += (mouse.current.y * 0.0003 - mesh.current.rotation.x) * 0.05;
    mesh.current.rotation.y += (mouse.current.x * 0.0003 - mesh.current.rotation.y) * 0.05;
  });

  // Track mouse
  if (typeof window !== "undefined") {
    window.onmousemove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
  }

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#CC3300"
        transparent
        opacity={0.35}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Second layer — white/steel particles, different size */
function ParticlesWhite({ count = 400 }: { count?: number }) {
  const mesh = useRef<THREE.Points>(null!);
  const { viewport } = useThree();

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * viewport.width * 3;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
      vel[i * 3 + 0] = (Math.random() - 0.5) * 0.001;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.001;
      vel[i * 3 + 2] = 0;
    }
    return [pos, vel];
  }, [count, viewport.width, viewport.height]);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      pos[ix] += velocities[ix] + Math.cos(t * 0.15 + i * 0.2) * 0.0008;
      pos[ix + 1] += velocities[ix + 1] + Math.sin(t * 0.1 + i * 0.25) * 0.0008;

      const hw = viewport.width * 1.5;
      const hh = viewport.height * 1.5;
      if (pos[ix] > hw) pos[ix] = -hw;
      if (pos[ix] < -hw) pos[ix] = hw;
      if (pos[ix + 1] > hh) pos[ix + 1] = -hh;
      if (pos[ix + 1] < -hh) pos[ix + 1] = hh;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.008}
        color="#8899BB"
        transparent
        opacity={0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/** Canvas wrapper — absolute fill behind hero content */
export default function ParticleField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Particles />
        <ParticlesWhite />
      </Canvas>
    </div>
  );
}
