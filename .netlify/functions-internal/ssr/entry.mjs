import { renderers } from './renderers.mjs';
import { manifest } from './manifest_BeiooiRR.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_hukWElc9.mjs');
const _page1 = () => import('./chunks/affiliate_DA4GNjNu.mjs');
const _page2 = () => import('./chunks/views_CzSYFOEe.mjs');
const _page3 = () => import('./chunks/post-1_DMUV94rz.mjs');
const _page4 = () => import('./chunks/post-2_BN3fxdbO.mjs');
const _page5 = () => import('./chunks/post-3_DezwoPdc.mjs');
const _page6 = () => import('./chunks/post-4_DKStVlqj.mjs');
const _page7 = () => import('./chunks/post-5_CYTWfEmQ.mjs');
const _page8 = () => import('./chunks/post-6_FMql4Rnj.mjs');
const _page9 = () => import('./chunks/post-7_PiOMwkEV.mjs');
const _page10 = () => import('./chunks/post-8_CcfqLIET.mjs');
const _page11 = () => import('./chunks/_.._xbUfao4J.mjs');
const _page12 = () => import('./chunks/post-2_DoS8ewXa.mjs');
const _page13 = () => import('./chunks/post-3_CRLHm1W5.mjs');
const _page14 = () => import('./chunks/post-4_Bk3LvVIz.mjs');
const _page15 = () => import('./chunks/post-5_CZQq-ivX.mjs');
const _page16 = () => import('./chunks/post-6_BQ0IUtAB.mjs');
const _page17 = () => import('./chunks/post-7_D9PP7tnG.mjs');
const _page18 = () => import('./chunks/welcome_S-8yOvg5.mjs');
const _page19 = () => import('./chunks/_.._BFXHlcWa.mjs');
const _page20 = () => import('./chunks/_tag__DMH8bq_s.mjs');
const _page21 = () => import('./chunks/index_CuLHrOKN.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.6.3_@types+node@20.12.7_sass@1.75.0_typescript@5.4.5/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/affiliate.astro", _page1],
    ["src/pages/api/views.ts", _page2],
    ["src/pages/guides/post-1.mdx", _page3],
    ["src/pages/guides/post-2.mdx", _page4],
    ["src/pages/guides/post-3.mdx", _page5],
    ["src/pages/guides/post-4.mdx", _page6],
    ["src/pages/guides/post-5.mdx", _page7],
    ["src/pages/guides/post-6.mdx", _page8],
    ["src/pages/guides/post-7.mdx", _page9],
    ["src/pages/guides/post-8.mdx", _page10],
    ["src/pages/guides/[...page].astro", _page11],
    ["src/pages/post/post-2.mdx", _page12],
    ["src/pages/post/post-3.mdx", _page13],
    ["src/pages/post/post-4.mdx", _page14],
    ["src/pages/post/post-5.mdx", _page15],
    ["src/pages/post/post-6.mdx", _page16],
    ["src/pages/post/post-7.mdx", _page17],
    ["src/pages/post/welcome.mdx", _page18],
    ["src/pages/post/[...page].astro", _page19],
    ["src/pages/tags/[tag].astro", _page20],
    ["src/pages/index.astro", _page21]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "ab6e6c6c-10fe-4bdb-b789-3ed59d14bdfc"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
