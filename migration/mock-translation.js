// mock-translation.js — Side-by-side mock API cheatsheet
// Jest 30 ↔ Vitest 4 equivalents for every common mocking pattern.
// Use this as a find-and-replace reference during migration.
// See: https://getautonoma.com/blog/jest-vs-vitest-2026

// =============================================================================
// 1. Basic function mocks
// =============================================================================

// Jest:
//   const fn = jest.fn();
//   const fn = jest.fn(() => 42);
//   const fn = jest.fn().mockReturnValue(42);
//   const fn = jest.fn().mockResolvedValue({ ok: true });

// Vitest:
//   const fn = vi.fn();
//   const fn = vi.fn(() => 42);
//   const fn = vi.fn().mockReturnValue(42);
//   const fn = vi.fn().mockResolvedValue({ ok: true });


// =============================================================================
// 2. Module mocking
// =============================================================================

// Jest:
//   jest.mock('./api', () => ({
//     fetchUser: jest.fn().mockResolvedValue({ id: 1, name: 'Ada' }),
//   }));

// Vitest:
//   vi.mock('./api', () => ({
//     fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Ada' }),
//   }));


// =============================================================================
// 3. Hoisted variables in module mocks
// =============================================================================

// Jest — variables declared above jest.mock() are hoisted automatically
// because Jest moves jest.mock() calls to the top of the file at compile time:
//   const mockFetch = jest.fn();
//   jest.mock('./api', () => ({ fetchUser: mockFetch }));

// Vitest — vi.mock() is also hoisted, but variable declarations are NOT.
// Use vi.hoisted() to declare variables that need to be available inside
// vi.mock():
//   const { mockFetch } = vi.hoisted(() => ({
//     mockFetch: vi.fn(),
//   }));
//   vi.mock('./api', () => ({ fetchUser: mockFetch }));


// =============================================================================
// 4. Spy on object methods
// =============================================================================

// Jest:
//   const spy = jest.spyOn(console, 'log');
//   const spy = jest.spyOn(object, 'method').mockReturnValue('mocked');

// Vitest:
//   const spy = vi.spyOn(console, 'log');
//   const spy = vi.spyOn(object, 'method').mockReturnValue('mocked');


// =============================================================================
// 5. Fake timers
// =============================================================================

// Jest:
//   jest.useFakeTimers();
//   jest.advanceTimersByTime(1000);
//   jest.runAllTimers();
//   jest.useRealTimers();

// Vitest:
//   vi.useFakeTimers();
//   vi.advanceTimersByTime(1000);
//   vi.runAllTimers();
//   vi.useRealTimers();


// =============================================================================
// 6. Clearing, resetting, and restoring mocks
// =============================================================================

// Jest:
//   jest.clearAllMocks();   // Clears call history and instances
//   jest.resetAllMocks();   // clearAllMocks + removes implementations
//   jest.restoreAllMocks(); // resetAllMocks + restores original implementations

// Vitest:
//   vi.clearAllMocks();     // Clears call history and instances
//   vi.resetAllMocks();     // clearAllMocks + removes implementations
//   vi.restoreAllMocks();   // resetAllMocks + restores original implementations


// =============================================================================
// 7. Manual mocks (__mocks__ directory)
// =============================================================================

// Jest:
//   Place a file at __mocks__/axios.js (adjacent to node_modules for
//   third-party modules, or next to the source file for local modules).
//   Jest picks it up automatically when you call jest.mock('axios').

// Vitest:
//   Same __mocks__ directory convention works. Call vi.mock('axios') and
//   Vitest will resolve the __mocks__/axios.js file identically.


// =============================================================================
// 8. Mocking return values in sequence
// =============================================================================

// Jest:
//   const fn = jest.fn()
//     .mockReturnValueOnce('first')
//     .mockReturnValueOnce('second')
//     .mockReturnValue('default');

// Vitest:
//   const fn = vi.fn()
//     .mockReturnValueOnce('first')
//     .mockReturnValueOnce('second')
//     .mockReturnValue('default');


// =============================================================================
// 9. Mocking ES module default exports
// =============================================================================

// Jest:
//   jest.mock('./logger', () => ({
//     __esModule: true,
//     default: jest.fn(),
//   }));

// Vitest:
//   vi.mock('./logger', () => ({
//     default: vi.fn(),
//   }));
//   // Note: Vitest handles ES modules natively — no __esModule flag needed.


// =============================================================================
// 10. Asserting mock calls
// =============================================================================

// Jest and Vitest use the SAME assertion API:
//   expect(fn).toHaveBeenCalled();
//   expect(fn).toHaveBeenCalledTimes(2);
//   expect(fn).toHaveBeenCalledWith('arg1', 'arg2');
//   expect(fn).toHaveBeenLastCalledWith('arg1');
//   expect(fn).toHaveBeenNthCalledWith(1, 'firstCallArg');
//   expect(fn.mock.calls).toEqual([['arg1'], ['arg2']]);
//   expect(fn.mock.results[0].value).toBe('returnValue');
