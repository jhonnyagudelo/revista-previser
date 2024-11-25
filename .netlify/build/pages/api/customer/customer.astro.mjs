import { p as prisma } from '../../../chunks/index_dB0aRVUn.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async () => {
  const customer = await prisma.customer.findMany();
  return new Response(JSON.stringify(customer), {
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

const page = () => _page;

export { page };
