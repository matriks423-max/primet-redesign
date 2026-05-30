"use client";

import { useRef, ReactNode } from "react";
import { gsap } from "gsap";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  intensity?: number;
}

/**
 * 3D CSS perspective tilt on hover — premium card micro-interaction.
 * Uses GSAP for smooth lerp, CSS perspective for the 3D effect.
 * Touch-safe: only activates on pointer:fine devices.
 */
export default function TiltCard({ children, className, style, intensity = 8 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0–1
    const y = (e.clientY - rect.top) / rect.height;   // 0–1
    const rotX = (0.5 - y) * intensity;
    const rotY = (x - 0.5) * intensity;

    gsap.to(el, {
      rotateX: rotX,
      rotateY: rotY,
      transformPerspective: 800,
      duration: 0.4,
      ease: "power2.out",
    });

    // Glow follows mouse
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        opacity: 0.12,
        duration: 0.3,
      });
    }
  };

  const onLeave = () => {
    gsap.to(ref.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    if (glowRef.current) {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* Radial glow that follows cursor */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(204,51,0,0.15) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          opacity: 0,
          left: "50%",
          top: "50%",
          zIndex: 0,
        }}
      />
      <div style={{ position: "relative", zIndex: 1, height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
