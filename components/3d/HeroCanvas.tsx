"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import type { MotionValue } from "framer-motion";

// ─── Shaders ──────────────────────────────────────────────────────────────────

const VERT = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (320.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float r = length(c);
    if (r > 0.5) discard;
    float glow = exp(-r * 4.2) * 0.75;
    float core = (1.0 - smoothstep(0.0, 0.18, r)) * 0.9;
    gl_FragColor = vec4(vColor, max(glow, core));
  }
`;

// ─── Seeded PRNG (mulberry32) ─────────────────────────────────────────────────
// Used inside useMemo so the result is deterministic across re-renders and
// satisfies the react-hooks/purity rule (Math.random is impure).

function makePRNG(seed: number) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Camera rig ───────────────────────────────────────────────────────────────

function CameraRig({
  mouseRef,
}: {
  mouseRef: React.MutableRefObject<[number, number]>;
}) {
  const { camera } = useThree();
  useFrame(() => {
    // eslint-disable-next-line react-hooks/immutability -- R3F camera mutation inside useFrame
    camera.position.x += (mouseRef.current[0] * 1.6 - camera.position.x) * 0.04;
    camera.position.y += (-mouseRef.current[1] * 1.0 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Particle field ───────────────────────────────────────────────────────────

const C1 = new THREE.Color("#0ea5e9");
const C2 = new THREE.Color("#14b8a6");
const C3 = new THREE.Color("#6366f1");
const C4 = new THREE.Color("#38bdf8");

function ParticleField({
  count,
  mouseRef,
  posRef,
}: {
  count: number;
  mouseRef: React.MutableRefObject<[number, number]>;
  posRef: React.MutableRefObject<Float32Array | null>;
}) {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, sizes, colors, phases } = useMemo(() => {
    const rng = makePRNG(count);
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count * 2);

    for (let i = 0; i < count; i++) {
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      const r = Math.pow(rng(), 0.45) * 15;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.55;
      positions[i * 3 + 2] = (rng() - 0.5) * 8;
      sizes[i] = rng() * 1.0 + 0.3;
      phases[i * 2] = rng() * Math.PI * 2;
      phases[i * 2 + 1] = rng() * Math.PI * 2;
      const t = rng();
      let col: THREE.Color;
      if (t < 0.45) col = C1.clone().lerp(C4, rng());
      else if (t < 0.72) col = C1.clone().lerp(C2, rng());
      else col = C3.clone().lerp(C2, rng());
      col.multiplyScalar(0.55 + rng() * 0.7);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, sizes, colors, phases };
  }, [count]);

  const original = useMemo(() => positions.slice(), [positions]);

  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useEffect(() => {
    const geo = pointsRef.current?.geometry;
    if (!geo) return;
    geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    posRef.current = geo.attributes.position.array as Float32Array;
    return () => { mat.dispose(); };
  }, [sizes, colors, posRef, mat]);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const [mx, my] = mouseRef.current;
    const wx = mx * 8;
    const wy = -my * 5.5;

    for (let i = 0; i < count; i++) {
      const px = phases[i * 2];
      const py = phases[i * 2 + 1];
      const spd = 0.11 + (i % 9) * 0.007;
      pos[i * 3] = original[i * 3] + Math.sin(t * spd + px) * 0.32;
      pos[i * 3 + 1] = original[i * 3 + 1] + Math.cos(t * spd * 0.78 + py) * 0.32;
      pos[i * 3 + 2] = original[i * 3 + 2] + Math.sin(t * 0.055 + px + py) * 0.1;

      const dx = wx - pos[i * 3];
      const dy = wy - pos[i * 3 + 1];
      const dsq = dx * dx + dy * dy;
      if (dsq < 225 && dsq > 0.01) {
        const d = Math.sqrt(dsq);
        const f = ((15 - d) / 15) * 0.07;
        pos[i * 3] += (dx / d) * f;
        pos[i * 3 + 1] += (dy / d) * f;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <primitive object={mat} attach="material" />
    </points>
  );
}

// ─── Connection lines (desktop only) ─────────────────────────────────────────

function ConnectionLines({
  count,
  posRef,
}: {
  count: number;
  posRef: React.MutableRefObject<Float32Array | null>;
}) {
  const linesRef = useRef<THREE.LineSegments>(null!);

  const pairs = useMemo<[number, number][]>(() => {
    const rng = makePRNG(count + 1);
    const p: [number, number][] = [];
    const seen = new Set<number>();
    const target = Math.min(300, Math.floor(count * 0.27));
    let tries = 0;
    while (p.length < target && tries < target * 10) {
      tries++;
      const a = Math.floor(rng() * count);
      const b = Math.floor(rng() * count);
      const key = Math.min(a, b) * count + Math.max(a, b);
      if (a !== b && !seen.has(key)) {
        seen.add(key);
        p.push([a, b]);
      }
    }
    return p;
  }, [count]);

  const linePos = useMemo(() => new Float32Array(pairs.length * 6), [pairs.length]);

  const mat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: 0x0ea5e9,
        transparent: true,
        opacity: 0.07,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    []
  );

  useEffect(() => () => { mat.dispose(); }, [mat]);

  useFrame(({ clock }) => {
    const src = posRef.current;
    if (!src || !linesRef.current) return;
    const arr = linesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pairs.length; i++) {
      const [a, b] = pairs[i];
      arr[i * 6] = src[a * 3]; arr[i * 6 + 1] = src[a * 3 + 1]; arr[i * 6 + 2] = src[a * 3 + 2];
      arr[i * 6 + 3] = src[b * 3]; arr[i * 6 + 4] = src[b * 3 + 1]; arr[i * 6 + 5] = src[b * 3 + 2];
    }
    // R3F idiom: material property mutation inside useFrame is intentional.
    // eslint-disable-next-line react-hooks/immutability
    mat.opacity = 0.045 + Math.sin(clock.getElapsedTime() * 0.38) * 0.028;
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
      </bufferGeometry>
      <primitive object={mat} attach="material" />
    </lineSegments>
  );
}

// ─── Torus knot ───────────────────────────────────────────────────────────────

function TorusKnot({
  scrollRef,
  isMobile,
  isRTL,
}: {
  scrollRef: React.MutableRefObject<number>;
  isMobile: boolean;
  isRTL: boolean;
}) {
  const outerRef = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);
  const xPos = isMobile ? 0 : (isRTL ? -2.7 : 2.7);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const s = scrollRef.current;
    const scale = Math.max(0, 1 - s * 1.4);
    const fade = Math.max(0, 1 - s * 2.2);

    for (const ref of [outerRef, innerRef]) {
      if (!ref.current) continue;
      ref.current.rotation.x = t * 0.14;
      ref.current.rotation.y = t * 0.21;
      ref.current.rotation.z = t * 0.07;
      ref.current.position.y = Math.sin(t * 0.35) * 0.18;
      ref.current.scale.setScalar(scale);
    }

    const om = outerRef.current?.material as THREE.MeshBasicMaterial | undefined;
    const im = innerRef.current?.material as THREE.MeshBasicMaterial | undefined;
    if (om) om.opacity = Math.max(0, (0.28 + Math.sin(t * 1.1) * 0.05) * fade);
    if (im) im.opacity = Math.max(0, 0.1 * fade);
  });

  return (
    <group position={[xPos, 0, -1.5]}>
      <mesh ref={innerRef}>
        <torusKnotGeometry args={[1.35, 0.37, 128, 16, 2, 3]} />
        <meshBasicMaterial
          color="#14b8a6"
          wireframe
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh ref={outerRef}>
        <torusKnotGeometry args={[1.35, 0.37, 160, 20, 2, 3]} />
        <meshBasicMaterial
          color="#0ea5e9"
          wireframe
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ─── Scene root ───────────────────────────────────────────────────────────────

function Scene({
  isMobile,
  isRTL,
  mouseRef,
  scrollRef,
}: {
  isMobile: boolean;
  isRTL: boolean;
  mouseRef: React.MutableRefObject<[number, number]>;
  scrollRef: React.MutableRefObject<number>;
}) {
  const count = isMobile ? 380 : 1100;
  const posRef = useRef<Float32Array | null>(null);

  return (
    <>
      <CameraRig mouseRef={mouseRef} />
      <ParticleField count={count} mouseRef={mouseRef} posRef={posRef} />
      {!isMobile && <ConnectionLines count={count} posRef={posRef} />}
      <TorusKnot scrollRef={scrollRef} isMobile={isMobile} isRTL={isRTL} />
    </>
  );
}

// ─── Public export ────────────────────────────────────────────────────────────

export default function HeroCanvas({
  scrollYProgress,
  isRTL = false,
}: {
  scrollYProgress: MotionValue<number>;
  isRTL?: boolean;
}) {
  const mouseRef = useRef<[number, number]>([0, 0]);
  const scrollRef = useRef(0);
  // Lazy initializer reads matchMedia once on mount — no synchronous setState
  // inside an effect, which avoids the react-hooks/set-state-in-effect violation.
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      ];
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      mouseRef.current = [
        (t.clientX / window.innerWidth) * 2 - 1,
        (t.clientY / window.innerHeight) * 2 - 1,
      ];
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      scrollRef.current = v;
    });
  }, [scrollYProgress]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
        frameloop="always"
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene isMobile={isMobile} isRTL={isRTL} mouseRef={mouseRef} scrollRef={scrollRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
