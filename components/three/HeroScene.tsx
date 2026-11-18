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

function getSnapshot(): boolean {
  const hasWebGL = detectWebGL();
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  return shouldUseFallback({ hasWebGL, prefersReducedMotion });
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
