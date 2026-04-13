// jest.config.js — Baseline Jest 30 configuration
// Used in the 500-test TypeScript + React benchmark.
// See: https://getautonoma.com/blog/jest-vs-vitest-2026

/** @type {import('jest').Config} */
const config = {
  // ---------------------------------------------------------------------------
  // Transformer — ts-jest compiles TypeScript on the fly via the Jest
  // transformer API. This is the most common setup for TS projects that have
  // not yet migrated to a native-ESM pipeline.
  // ---------------------------------------------------------------------------
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  // ---------------------------------------------------------------------------
  // Test environment — jsdom emulates a browser DOM so React components can
  // render without a real browser. Jest 30 ships jsdom as a separate package
  // (`jest-environment-jsdom`) that you must install explicitly.
  // ---------------------------------------------------------------------------
  testEnvironment: 'jsdom',

  // ---------------------------------------------------------------------------
  // Module resolution — maps non-JS imports (CSS, images, SVGs) to simple
  // stubs so that `import './styles.css'` does not blow up at transform time.
  // The identity-obj-proxy package returns the class name as a string, which
  // is useful for CSS Modules.
  // ---------------------------------------------------------------------------
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js',
  },

  // ---------------------------------------------------------------------------
  // File extensions — Jest resolves imports by trying each extension in order.
  // Put the most common ones first so resolution is marginally faster.
  // ---------------------------------------------------------------------------
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // ---------------------------------------------------------------------------
  // Test match — defaults to files inside __tests__/ or files ending in
  // .test.ts / .spec.ts (and their JSX variants).
  // ---------------------------------------------------------------------------
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{ts,tsx}',
  ],

  // ---------------------------------------------------------------------------
  // Coverage — V8 coverage is significantly faster than the default Babel-based
  // istanbul provider because it hooks into V8's native code-coverage support
  // rather than instrumenting every source file.
  // ---------------------------------------------------------------------------
  coverageProvider: 'v8',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
  ],
  coverageThresholds: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // ---------------------------------------------------------------------------
  // Setup — runs after the test environment is installed but before any test
  // file is executed. Useful for global matchers (e.g., @testing-library/jest-dom).
  // ---------------------------------------------------------------------------
  setupFilesAfterSetup: ['<rootDir>/jest.setup.ts'],

  // ---------------------------------------------------------------------------
  // Performance — each worker gets its own V8 isolate. `maxWorkers` defaults
  // to the number of CPU cores minus one, which is generally optimal. Override
  // only if you hit memory pressure on CI.
  // ---------------------------------------------------------------------------
  maxWorkers: '50%',
};

module.exports = config;
