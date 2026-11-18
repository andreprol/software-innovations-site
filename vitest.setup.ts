import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// vitest.config.ts não usa `globals: true`, então @testing-library/react não
// consegue autodetectar um `afterEach` global pra limpar o DOM entre testes
// (ver tests/components/three/HeroScene.test.tsx, que já chamava cleanup()
// manualmente por isso). Sem isso, múltiplos `it()` no mesmo arquivo que
// chamam `render()` acumulam elementos no DOM e queries como
// `getByRole`/`getByLabelText` passam a encontrar múltiplas correspondências.
afterEach(() => {
  cleanup();
});
