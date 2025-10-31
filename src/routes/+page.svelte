<script>
  let books = [];
  
  // ===== ADD BOOK FUNCTIONALITY START =====
  let title = "";
  let author = "";

  // Add new book //POST
  async function addBook() {
    const response = await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author }),
    });
    const newBook = await response.json();
    books = [...books, newBook];
    title = "";
    author = "";
  }
  // ===== ADD BOOK FUNCTIONALITY END =====

  // ===== DELETE BOOK FUNCTIONALITY START =====
  // Delete book //DELETE
  async function deleteBook(id, title) {
    if (confirm(`¿Estás seguro de eliminar "${title}"?`)) {
      await fetch(`/api/books/${id}`, { method: 'DELETE' });
      books = books.filter(book => book.id !== id);
    }
  }
  // ===== DELETE BOOK FUNCTIONALITY END =====

  // Fetch books on component mount //GET
  onMount(async () => {
    const response = await fetch("/api/books");
    books = await response.json();
  });

  import { onMount } from "svelte";
</script>

<div class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-6">Lista de Libros</h1>

  <!-- ===== ADD BOOK FORM START ===== -->
  <div class="bg-gray-50 p-4 rounded-lg mb-6">
    <h2 class="text-xl font-semibold mb-4">Agregar Libro</h2>
    <div class="flex gap-4">
      <input
        bind:value={title}
        placeholder="Título"
        class="flex-1 p-2 border rounded"
      />
      <input
        bind:value={author}
        placeholder="Autor"
        class="flex-1 p-2 border rounded"
      />
      <button
        on:click={addBook}
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >Agregar</button
      >
    </div>
  </div>
  <!-- ===== ADD BOOK FORM END ===== -->

  {#each books as book}
    <div class="bg-white shadow-md rounded-lg p-4 mb-4 border">
      <div class="flex justify-between items-start">
        <div>
          <h3 class="text-xl font-semibold text-gray-800">{book.title}</h3>
          <p class="text-gray-600">Autor: {book.author}</p>
        </div>
        <button
          on:click={() => deleteBook(book.id, book.title)}
          class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >Eliminar</button
        >
      </div>
    </div>
  {/each}
</div>
