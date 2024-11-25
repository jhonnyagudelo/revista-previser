export function jsonResponse(
  status: number,
  message: string,
  data: any = null
): Response {
  return new Response(JSON.stringify({ status, message, data }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
