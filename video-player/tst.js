const l = {},
  _ = new Set(['Module', '__esModule', 'default', '_export_sfc']);
let f = {
  './Front': () =>
    u('./__federation_expose_Front-hA3H78IY.js').then((e) =>
      Object.keys(e).every((t) => _.has(t)) ? () => e.default : () => e,
    ),
  './Sidebar': () =>
    u('./__federation_expose_Sidebar-CT1UVpYw.js').then((e) =>
      Object.keys(e).every((t) => _.has(t)) ? () => e.default : () => e,
    ),
  './ThumbCarousel': () =>
    u('./__federation_expose_ThumbCarousel-C8CgMgyP.js').then((e) =>
      Object.keys(e).every((t) => _.has(t)) ? () => e.default : () => e,
    ),
};
const d = {},
  c = (e, t, i) => {
    const n = import.meta.url;
    if (typeof n > 'u') {
      console.warn(
        'The remote style takes effect only when the build.target option in the vite.config.ts file is higher than that of "es2020".',
      );
      return;
    }
    const a = n.substring(0, n.lastIndexOf('remoteEntry.js'));
    e.forEach((o) => {
      const r = a + o;
      if (!(r in d))
        if (((d[r] = !0), t)) {
          const s = 'css__front_and_sidebar__' + i;
          window[s] == null && (window[s] = []), window[s].push(r);
        } else {
          const s = document.head.appendChild(document.createElement('link'));
          (s.href = r), (s.rel = 'stylesheet');
        }
    });
  };
async function u(e) {
  return (l[e] ??= import(e)), l[e];
}
const h = (e) => {
    if (!f[e]) throw new Error('Can not find remote module ' + e);
    return f[e]();
  },
  b = (e) => {
    (globalThis.__federation_shared__ = globalThis.__federation_shared__ || {}),
      Object.entries(e).forEach(([t, i]) => {
        const n = Object.keys(i)[0],
          a = Object.values(i)[0],
          o = a.scope || 'default';
        globalThis.__federation_shared__[o] =
          globalThis.__federation_shared__[o] || {};
        const r = globalThis.__federation_shared__[o];
        (r[t] = r[t] || {})[n] = a;
      });
  };
export { c as dynamicLoadingCss, h as get, b as init };
