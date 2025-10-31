//src/routes/api/books/+server.js
import { books } from "$lib/books.js"

// GET endpoint - returns all books as JSON
export async function GET() {
  return new Response(JSON.stringify(books), { status: 200 });
}

// POST endpoint - creates a new book
export async function POST({ request }) {
  const data = await request.json(); // parse request body
  const newBook = { id: Date.now(), ...data }; // generate id
  books.push(newBook); // add to books array
  return new Response(JSON.stringify(newBook), { status: 201 });
}