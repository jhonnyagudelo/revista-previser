import { p as prisma } from './index_dB0aRVUn.mjs';

const prerender = false;
const GET = async () => {
  const event = await prisma.event.findMany();
  return new Response(JSON.stringify(event), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

export { GET as G, _page as _, prerender as p };
