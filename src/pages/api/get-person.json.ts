import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, request }) => {
  const person = {
    name: 'Julián Ramírez',
    age: 35
  }

  return new Response(JSON.stringify(person), {
    status: 201,
    headers: {
      'Conter-Type': 'application-json'
    }
  })
}