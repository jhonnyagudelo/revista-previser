import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BnIVynK3.mjs';
import './_astro-internal_middleware.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const _page0 = () => import('./pages/_actions/_---path_.astro.mjs');
const _page1 = () => import('./pages/_image.astro.mjs');
const _page2 = () => import('./pages/404.astro.mjs');
const _page3 = () => import('./pages/api/arrival/_arrovalid_.astro.mjs');
const _page4 = () => import('./pages/api/arrival.astro.mjs');
const _page5 = () => import('./pages/api/attendance/_attendanceid_.astro.mjs');
const _page6 = () => import('./pages/api/attendance.astro.mjs');
const _page7 = () => import('./pages/api/customer/customer.astro.mjs');
const _page8 = () => import('./pages/api/customer/_customerid_.astro.mjs');
const _page9 = () => import('./pages/api/customer.astro.mjs');
const _page10 = () => import('./pages/api/event/event.astro.mjs');
const _page11 = () => import('./pages/api/event.astro.mjs');
const _page12 = () => import('./pages/public/arrival/_id_.astro.mjs');
const _page13 = () => import('./pages/public/attendance/_id_.astro.mjs');
const _page14 = () => import('./pages/public/confirm/_id_.astro.mjs');
const _page15 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/actions/runtime/route.js", _page0],
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page1],
    ["src/pages/404.astro", _page2],
    ["src/pages/api/arrival/[arrovalId].ts", _page3],
    ["src/pages/api/arrival/index.ts", _page4],
    ["src/pages/api/attendance/[attendanceId].ts", _page5],
    ["src/pages/api/attendance/index.ts", _page6],
    ["src/pages/api/customer/customer.ts", _page7],
    ["src/pages/api/customer/[customerId].ts", _page8],
    ["src/pages/api/customer/index.ts", _page9],
    ["src/pages/api/event/event.ts", _page10],
    ["src/pages/api/event/index.ts", _page11],
    ["src/pages/public/arrival/[id].astro", _page12],
    ["src/pages/public/attendance/[id].astro", _page13],
    ["src/pages/public/confirm/[id].astro", _page14],
    ["src/pages/index.astro", _page15]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "9375b584-f869-4d0a-a817-d19730250bc4"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
