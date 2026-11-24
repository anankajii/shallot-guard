// js/core/router.js — hash-based SPA router
const routes = new Map();

export function register(pattern, handler) {
  routes.set(pattern, handler);
}

export function navigate(path) {
  location.hash = path;
}

export function getCurrentPath() {
  return location.hash.slice(1) || '/';
}

function matchRoute(path) {
  for (const [pattern, handler] of routes) {
    if (typeof pattern === 'string' && pattern === path) return handler;
    if (pattern instanceof RegExp && pattern.test(path)) return () => handler(path.match(pattern));
  }
  return null;
}

export function startRouter() {
  function handle() {
    const path = getCurrentPath();
    const handler = matchRoute(path);
    if (handler) handler();
    else {
      const fallback = matchRoute('*');
      if (fallback) fallback();
    }
  }
  window.addEventListener('hashchange', handle);
  handle();
}
