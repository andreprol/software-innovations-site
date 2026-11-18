import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    // F:\RichClub (the parent folder) has its own package-lock.json from an
    // unrelated project; pin the root explicitly so Turbopack doesn't try to
    // infer it and warn/misresolve paths across repo boundaries.
    root: import.meta.dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
