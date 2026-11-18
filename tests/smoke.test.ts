import { describe, expect, it } from "vitest";
import { appName } from "@/lib/env";

describe("@/* path alias", () => {
  it("resolves lib/env.ts via the @ alias in Vitest", () => {
    expect(appName).toBe("Software Innovations");
  });
});
