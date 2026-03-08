import { defineConfig } from "vitest/config";

export default defineConfig({
  root: ".",
  test: {
    environment: "node",
    globals: true,
    include: ["server/src/**/*.test.ts"],
  },
});
