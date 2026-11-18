"use client";

import dynamic from "next/dynamic";

// HeroScene touches window/canvas (WebGL), so it must never render on the
// server. next/dynamic's `ssr: false` option is only allowed inside a Client
// Component (Next.js 16 rejects it in a Server Component import), so this
// thin wrapper exists purely to let app/page.tsx — a Server Component —
// render the hero without becoming a Client Component itself.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

export default HeroScene;
