// vitest.config.ts — Equivalent Vitest 4 configuration
// Used in the 500-test TypeScript + React benchmark.
// See: https://getautonoma.com/blog/jest-vs-vitest-2026

import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // ---------------------------------------------------------------------------
  // Plugins — Vitest reuses the Vite plugin ecosystem. @vitejs/plugin-react
  // handles JSX/TSX transformation via esbuild (dev) or SWC (build), which
  // replaces ts-jest's role in the Jest config.
  // ---------------------------------------------------------------------------
  plugins: [react()],

  test: {
    // -------------------------------------------------------------------------
    // Test environment — jsdom, same as the Jest config. Vitest also supports
    // 'happy-dom' (faster but less spec-complete) and 'node' (no DOM).
    // -------------------------------------------------------------------------
    environment: 'jsdom',

    // -------------------------------------------------------------------------
    // Globals — when enabled, `describe`, `it`, `expect`, `vi` are available
    // without imports, matching Jest's global API. If you prefer explicit
    // imports (`import { describe, it, expect } from 'vitest'`), set to false.
    // -------------------------------------------------------------------------
    globals: true,

    // -------------------------------------------------------------------------
    // CSS — by default Vitest skips CSS processing. Setting css to true would
    // parse CSS imports; we skip it for parity with Jest's moduleNameMapper
    // stub approach.
    // -------------------------------------------------------------------------
    css: false,

    // -------------------------------------------------------------------------
    // Include — matches the same file patterns as the Jest testMatch config.
    // -------------------------------------------------------------------------
    include: [
      'src/**/__tests__/**/*.{ts,tsx}',
      'src/**/*.{spec,test}.{ts,tsx}',
    ],

    // -------------------------------------------------------------------------
    // Setup files — equivalent to Jest's setupFilesAfterSetup. Runs after the
    // test environment is ready. Use for global matchers like
    // @testing-library/jest-dom.
    // -------------------------------------------------------------------------
    setupFiles: ['./vitest.setup.ts'],

    // -------------------------------------------------------------------------
    // Coverage — V8 provider, same as Jest. The @vitest/coverage-v8 package
    // must be installed separately. Vitest also supports 'istanbul' if you
    // need branch-level accuracy on edge cases where V8 under-reports.
    // -------------------------------------------------------------------------
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts', 'src/**/index.ts'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },

    // -------------------------------------------------------------------------
    // Pool — Vitest 4 defaults to 'forks' (child processes). The 'threads'
    // pool uses worker_threads for lower overhead. Use 'vmThreads' if you need
    // isolated module registries per test (closest to Jest's behavior).
    // -------------------------------------------------------------------------
    pool: 'forks',
  },
});
