"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { buildAvatarPoints, type AvatarPoints } from "@/lib/avatarPoints";
import { LOGOS } from "@/components/sections/Skills";

/**
 * M3 hero: the photo (`public/avatar.jpg`) at rest, shattering into particles
 * on scroll velocity, disturbed by the cursor, springing back when you stop.
 * Reduced-motion / no-WebGL fall back to a static <img> in Hero.tsx.
 */

const AVATAR_URL = "/avatar.jpg";
const COUNT = 48000;
const FOV = 42;
const CAM_Z = 6.4;

function useScrollEnergy() {
  const energy = useRef(0);
  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const dt = Math.max(16, now - lastT);
      const dy = Math.abs(window.scrollY - lastY);
      energy.current = Math.min(
        2.4,
        energy.current + Math.min(0.5, (dy / dt) * 0.9),
      );
      lastY = window.scrollY;
      lastT = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return energy;
}

function makeDot() {
  const c = document.createElement("canvas");
  c.width = 48;
  c.height = 48;
  const g = c.getContext("2d");
  if (g) {
    const rg = g.createRadialGradient(24, 24, 0, 24, 24, 24);
    rg.addColorStop(0, "rgba(255,255,255,1)");
    rg.addColorStop(0.5, "rgba(255,255,255,0.7)");
    rg.addColorStop(1, "rgba(255,255,255,0)");
    g.fillStyle = rg;
    g.fillRect(0, 0, 48, 48);
  }
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  return t;
}

/** mutable per-frame buffers, owned outside React and keyed to the (cached) point set */
const workCache = new WeakMap<
  AvatarPoints,
  { pos: Float32Array; vel: Float32Array }
>();
function workFor(data: AvatarPoints) {
  let w = workCache.get(data);
  if (!w) {
    w = {
      pos: Float32Array.from(data.home),
      vel: new Float32Array(data.count * 3),
    };
    workCache.set(data, w);
  }
  return w;
}

function curl(x: number, y: number, z: number, t: number) {
  return [
    Math.sin(y * 1.7 + t) - Math.cos(z * 1.3 - t * 0.7),
    Math.sin(z * 1.5 - t * 0.8) - Math.cos(x * 1.9 + t * 0.6),
    Math.sin(x * 1.4 + t * 0.9) - Math.cos(y * 1.6 - t),
  ] as const;
}

/** skills that burst out of the photo while it's scattered */
const BURST_SKILLS = [
  "Python",
  "PyTorch",
  "TensorFlow",
  "scikit-learn",
  "Hugging Face",
  "LangChain",
  "pandas",
  "PostgreSQL",
  "FastAPI",
  "Docker",
  "MLflow",
  "Google Cloud",
];
const burstLogos = BURST_SKILLS.flatMap((n) => LOGOS.filter((l) => l.name === n));

/** timing (seconds): gap between badges, fade-in length, fade-out length, linger after the scroll stops */
const STAGGER = 0.28;
const FADE_IN = 1.4;
const FADE_OUT = 0.9;
const HOLD = 2.2;
/** scroll energy that counts as "scattering" */
const ON = 0.12;

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

function SkillBurst({ energyRef }: { energyRef: React.RefObject<number> }) {
  const anchors = useRef<(THREE.Group | null)[]>([]);
  const chips = useRef<(HTMLDivElement | null)[]>([]);
  const progress = useRef<number[]>(burstLogos.map(() => 0));
  const burstStart = useRef(-1); // clock time the current burst began, -1 when idle
  const lastActive = useRef(-Infinity);
  const { size } = useThree();

  // slots on an ellipse around the photo, staggered in/out so the ring isn't rigid
  const slots = useMemo(
    () =>
      burstLogos.map((_, i) => {
        const a = (i / burstLogos.length) * Math.PI * 2 + 0.3;
        const r = i % 2 ? 1.0 : 1.14;
        const cx = Math.cos(a);
        // pull the left arc in so badges stay clear of the hero copy
        return {
          x: cx * (cx < 0 ? 1.25 : 1.8) * r,
          // flattened + nudged down so the top arc clears the fixed nav
          y: Math.sin(a) * 1.2 * r - 0.25,
        };
      }),
    [],
  );

  useFrame((state, delta) => {
    // on narrow screens the photo sits behind the copy — keep the badges out of it
    const wide = size.width / Math.max(1, size.height) > 1.05;
    const energy = wide ? energyRef.current : 0;
    const t = state.clock.elapsedTime;
    const dt = Math.min(0.05, delta);

    // a burst starts when the photo scatters and lingers a moment after it settles
    if (energy > ON) lastActive.current = t;
    const active = t - lastActive.current < HOLD;
    if (active && burstStart.current < 0) burstStart.current = t;
    if (!active) burstStart.current = -1;

    slots.forEach((s, i) => {
      const anchor = anchors.current[i];
      const chip = chips.current[i];
      if (!anchor || !chip) return;

      // one by one around the ring on the way out; all drift home together
      const due = active && t - burstStart.current > i * STAGGER;
      const prev = progress.current[i];
      const p = due
        ? Math.min(1, prev + dt / FADE_IN)
        : Math.max(0, prev - dt / FADE_OUT);
      progress.current[i] = p;

      if (p === 0) {
        if (chip.style.opacity !== "0") chip.style.opacity = "0";
        return;
      }
      // emerge from the centre of the photo and ease out to the slot
      const e = easeOutCubic(p);
      anchor.position.set(
        s.x * e + Math.sin(t * 0.6 + i) * 0.04 * e,
        s.y * e + Math.cos(t * 0.5 + i * 2) * 0.04 * e,
        0.3,
      );
      chip.style.opacity = String(Math.pow(p, 1.4));
      chip.style.filter = `blur(${((1 - e) * 6).toFixed(2)}px)`;
      chip.style.transform = `scale(${(0.82 + 0.18 * e).toFixed(3)})`;
    });
  });

  return (
    <>
      {burstLogos.map(({ name, Icon, color }, i) => (
        <group key={name} ref={(el) => void (anchors.current[i] = el)}>
          <Html center zIndexRange={[5, 0]} pointerEvents="none">
            <div
              ref={(el) => void (chips.current[i] = el)}
              style={{ opacity: 0 }}
              className="flex items-center gap-2 whitespace-nowrap rounded-full border border-[color-mix(in_oklab,var(--neon-violet)_35%,transparent)] bg-[color-mix(in_oklab,var(--neon-violet)_12%,rgba(5,6,10,0.6))] px-3.5 py-1.5 font-display text-xs font-medium text-fg/85 shadow-[0_0_28px_rgba(122,92,255,0.22),inset_0_0_12px_rgba(255,46,205,0.06)] backdrop-blur-md"
            >
              {/* brand colour pulled toward the hero's violet wash */}
              <Icon
                aria-hidden
                className="size-3.5"
                style={{ color: `color-mix(in oklab, ${color} 55%, #c9bfff)` }}
              />
              {name}
            </div>
          </Html>
        </group>
      ))}
    </>
  );
}

type ScatterProps = {
  data: AvatarPoints;
  energyRef: React.RefObject<number>;
  visibleRef: React.RefObject<boolean>;
};

function Scatter({ data, energyRef, visibleRef }: ScatterProps) {
  const group = useRef<THREE.Group>(null);
  const planeMat = useRef<THREE.MeshBasicMaterial>(null);
  const pointsMat = useRef<THREE.PointsMaterial>(null);
  const geom = useRef<THREE.BufferGeometry>(null);
  const rest = useRef(0);
  const settled = useRef(false);
  const dataRef = useRef(data);
  const { size, pointer } = useThree();

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(data.raster);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    t.needsUpdate = true;
    return t;
  }, [data]);
  const dot = useMemo(() => makeDot(), []);
  useEffect(() => () => texture.dispose(), [texture]);
  useEffect(() => () => dot.dispose(), [dot]);

  // (re)build the geometry attributes whenever the point set changes
  useEffect(() => {
    dataRef.current = data;
    settled.current = false;
    rest.current = 0;
    const g = geom.current;
    if (!g) return;
    const { pos } = workFor(data);
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(data.color, 3));
  }, [data]);

  useFrame((state, delta) => {
    const g = group.current;
    const geo = geom.current;
    if (!g || !geo) return;
    const posAttr = geo.getAttribute("position") as
      | THREE.BufferAttribute
      | undefined;
    if (!posAttr) return;

    const d = dataRef.current;
    const { pos, vel } = workFor(d);

    // responsive placement
    const aspect = size.width / Math.max(1, size.height);
    const wide = aspect > 1.05;
    const fit = wide ? 0.92 : Math.max(0.5, aspect * 0.82);
    g.scale.setScalar(fit);
    const vExtent = Math.tan((FOV / 2) * (Math.PI / 180)) * CAM_Z;
    g.position.x = wide ? Math.min(1.7, vExtent * aspect * 0.36) : 0;
    g.position.y = wide ? -0.05 : 0.02;

    let energy = energyRef.current;
    if (energy > 0.01) rest.current = 0;

    if (planeMat.current) {
      planeMat.current.opacity = 1 - Math.min(1, energy * 2.2);
    }
    if (pointsMat.current) {
      pointsMat.current.opacity = Math.min(1, energy * 1.7);
    }

    const asleep = !visibleRef.current;
    const idle = energy < 6e-4 && rest.current > 20;

    if (asleep || idle) {
      if (!settled.current) {
        pos.set(d.home);
        vel.fill(0);
        posAttr.needsUpdate = true;
        if (planeMat.current) planeMat.current.opacity = 1;
        if (pointsMat.current) pointsMat.current.opacity = 0;
        settled.current = true;
      }
      rest.current += 1;
      if (!asleep) energyRef.current = 0;
      return;
    }
    settled.current = false;
    rest.current += 1;

    const dt = Math.min(0.05, delta) || 0.016;
    const t = state.clock.elapsedTime * 0.5;
    const disperse = Math.min(1, energy);
    const px = pointer.x * vExtent * aspect;
    const py = pointer.y * vExtent;
    const { home, cloud, seed, count } = d;
    const R = 1.1;
    const REP = 5;

    for (let k = 0; k < count; k++) {
      const i = k * 3;
      const i1 = i + 1;
      const i2 = i + 2;
      const stiff = seed[i1];

      const tx = home[i] + (cloud[i] - home[i]) * disperse;
      const ty = home[i1] + (cloud[i1] - home[i1]) * disperse;
      const tz = home[i2] + (cloud[i2] - home[i2]) * disperse;

      let ax = (tx - pos[i]) * 9 * stiff;
      let ay = (ty - pos[i1]) * 9 * stiff;
      let az = (tz - pos[i2]) * 9 * stiff;

      if (disperse > 0.02) {
        const c = curl(pos[i], pos[i1], pos[i2], t);
        const d = disperse * 0.6;
        ax += c[0] * d;
        ay += c[1] * d;
        az += c[2] * d;
      }

      const dx = pos[i] * fit + g.position.x - px;
      const dy = pos[i1] * fit + g.position.y - py;
      const d2 = dx * dx + dy * dy;
      if (d2 < R * R) {
        const dist = Math.sqrt(d2) || 1e-4;
        const f = (REP * (1 - dist / R)) / dist;
        ax += dx * f;
        ay += dy * f;
        energy = Math.min(2.4, energy + 0.001);
      }

      let vx = (vel[i] + ax * dt) * 0.85;
      let vy = (vel[i1] + ay * dt) * 0.85;
      let vz = (vel[i2] + az * dt) * 0.85;
      if (vx > 22) vx = 22;
      else if (vx < -22) vx = -22;
      if (vy > 22) vy = 22;
      else if (vy < -22) vy = -22;
      if (vz > 22) vz = 22;
      else if (vz < -22) vz = -22;
      vel[i] = vx;
      vel[i1] = vy;
      vel[i2] = vz;
      pos[i] += vx * dt;
      pos[i1] += vy * dt;
      pos[i2] += vz * dt;
    }
    posAttr.needsUpdate = true;

    energy *= Math.pow(0.14, dt);
    if (energy < 4e-4) energy = 0;
    energyRef.current = energy;

    g.rotation.y += (pointer.x * 0.14 - g.rotation.y) * 0.04;
    g.rotation.x += (pointer.y * -0.1 - g.rotation.x) * 0.04;
  });

  return (
    <group ref={group}>
      <mesh>
        <planeGeometry args={[data.viewHeight * data.imgAspect, data.viewHeight]} />
        <meshBasicMaterial
          ref={planeMat}
          map={texture}
          transparent
          alphaTest={0.06}
          depthWrite={false}
        />
      </mesh>
      <points>
        <bufferGeometry ref={geom} />
        <pointsMaterial
          ref={pointsMat}
          size={0.02}
          map={dot}
          vertexColors
          transparent
          opacity={0}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
      <SkillBurst energyRef={energyRef} />
    </group>
  );
}

function AvatarScene({
  energyRef,
  visibleRef,
}: {
  energyRef: React.RefObject<number>;
  visibleRef: React.RefObject<boolean>;
}) {
  const [data, setData] = useState<AvatarPoints | null>(null);

  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (!cancelled) setData(buildAvatarPoints(img, COUNT));
    };
    img.src = AVATAR_URL;
    return () => {
      cancelled = true;
    };
  }, []);

  if (!data) return null;
  return <Scatter data={data} energyRef={energyRef} visibleRef={visibleRef} />;
}

export default function ParticleField() {
  const energyRef = useScrollEnergy();
  const visibleRef = useRef(true);

  useEffect(() => {
    const el = document.getElementById("hero");
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { rootMargin: "20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, CAM_Z], fov: FOV }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <AvatarScene energyRef={energyRef} visibleRef={visibleRef} />
    </Canvas>
  );
}
