import { describe, it, expect, vi, afterEach } from "vitest";
import { cleanup, render } from "@testing-library/react";

// Regression test for the HeroScene capability-probe memoization fix.
//
// useSyncExternalStore calls `getSnapshot` on every render (there's no real
// external store here to diff against), but the underlying WebGL probe
// (`document.createElement("canvas")` + `getContext`) is expensive — it
// creates and discards a real context — and browsers cap simultaneous live
// WebGL contexts, evicting the oldest on overflow. If `getSnapshot` isn't
// memoized, repeated unrelated re-renders of HeroScene could in principle
// evict the real rendering context mounted by `<Canvas>`, causing a black
// hero. This test asserts the probe runs at most once per page load.
//
// jsdom has no real WebGL implementation, so `detectWebGL()` resolves to
// `false` here, `shouldUseFallback` returns `true`, and HeroScene renders
// its static CSS-gradient fallback branch — never mounting
// `@react-three/fiber`'s `<Canvas>`. That keeps this test free of jsdom/RAF
// polyfill concerns while still exercising the real memoization code path.
describe("HeroScene capability probe memoization", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.resetModules();
  });

  it("probes WebGL (document.createElement('canvas')) at most once across multiple re-renders", async () => {
    vi.resetModules();
    const { default: HeroScene } = await import(
      "@/components/three/HeroScene"
    );

    const createElementSpy = vi.spyOn(document, "createElement");

    const { rerender } = render(<HeroScene />);
    rerender(<HeroScene />);
    rerender(<HeroScene />);
    rerender(<HeroScene />);

    const canvasProbeCalls = createElementSpy.mock.calls.filter(
      ([tagName]) => tagName === "canvas",
    );

    expect(canvasProbeCalls.length).toBe(1);
  });
});
