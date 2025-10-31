//src/routes/api/books/[id]/+server.js
import { books } from "$lib/books.js"

// GET endpoint - returns a specific book by id
export async function GET({ params }) {
  const book = books.find(b => b.id == params.id); // find book by id
  if (!book) return new Response("Not found", { status: 404 });
  return new Response(JSON.stringify(book), { status: 200 });
}

// DELETE endpoint - removes a book by id
export async function DELETE({ params }) {
  const index = books.findIndex(b => b.id == params.id); // find book index
  if (index === -1) return new Response("Not found", { status: 404 });

  books.splice(index, 1); // remove the book in-place
  return new Response(null, { status: 204 });
}

// PUT endpoint - updates a book by id
export async function PUT({ params, request }) {
  const index = books.findIndex(b => b.id == params.id); // find book index
  if (index === -1) return new Response("Not found", { status: 404 });

  const data = await request.json(); // parse request body
  books[index] = { ...books[index], ...data }; // merge updates
  return new Response(JSON.stringify(books[index]), { status: 200 });
}