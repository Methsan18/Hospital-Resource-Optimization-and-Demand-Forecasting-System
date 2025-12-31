// Minimal stub for useAuthStore used in several components
export function useAuthStore(selector) {
  const state = { auth: { username: 'guest' }, setUsername: (u) => {} };
  if (typeof selector === 'function') return selector(state);
  return state;
}
