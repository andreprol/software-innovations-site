"use client";

import { Suspense, useSyncExternalStore } from "react";
import { Canvas } from "@react-three/fiber";
import { shouldUseFallback } from "@/lib/webgl/shouldUseFallback";
import SIRings from "./SIRings";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function detectPrefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    // Restricted browser without matchMedia support: fall back to `false`,
    // same failure-mode convention as detectWebGL() above — the caller still
    // decides fallback-vs-canvas from the (possibly WebGL-less) other signal
    // instead of crashing render.
    return false;
  }
}

// The WebGL/reduced-motion capability of this browser never changes during a
// page session, so there is nothing to subscribe to — the "store" is read
// once on the client. Modeled as useSyncExternalStore (rather than
// state+effect) so the client-only read never fires a setState-in-effect and
// server/client renders never mismatch during hydration: the server snapshot
// is `undefined` (placeholder), and React reconciles to the real client
// snapshot right after mount.
function subscribe() {
  return () => {};
}

// useSyncExternalStore calls getSnapshot on every render of every subscribed
// component, not just once (there's no real external store to diff against
// here). detectWebGL() is expensive — it creates and immediately discards a
// real WebGL context — and browsers cap simultaneous live contexts (~8-16,
// evicting the oldest on overflow), so re-running it on every unrelated
// re-render of HeroScene could in principle evict the actual rendering
// context <Canvas> mounted, causing a black hero. Cache the result at module
// scope so the real probe runs at most once per page load.
let cachedSnapshot: boolean | undefined;

function getSnapshot(): boolean {
  if (cachedSnapshot === undefined) {
    const hasWebGL = detectWebGL();
    const prefersReducedMotion = detectPrefersReducedMotion();
    cachedSnapshot = shouldUseFallback({ hasWebGL, prefersReducedMotion });
  }
  return cachedSnapshot;
}

function getServerSnapshot(): undefined {
  return undefined;
}

const SCENE_CLASSNAME = "h-[420px] w-full rounded-3xl md:h-[560px]";

export default function HeroScene() {
  const useFallback = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  if (useFallback === undefined) {
    return <div className={SCENE_CLASSNAME} aria-hidden="true" />;
  }

  if (useFallback) {
    return (
      <div
        className={`${SCENE_CLASSNAME} bg-gradient-to-br from-purple-600 via-fuchsia-500 to-cyan-400`}
        role="img"
        aria-label="Representação visual gráfica abstrata da marca"
      />
    );
  }

  return (
    <div className={SCENE_CLASSNAME} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#d946ef" />
        <pointLight position={[-5, -3, -5]} intensity={0.8} color="#06b6d4" />
        <Suspense fallback={null}>
          <SIRings />
        </Suspense>
      </Canvas>
    </div>
  );
}
