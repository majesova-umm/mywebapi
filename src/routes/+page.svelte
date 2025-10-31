<script>
	let books = [];

	// Fetch books on component mount //GET
	onMount(async () => {
		const response = await fetch('/api/books');
		books = await response.json();
	});
	import { onMount } from 'svelte';
</script>

<div class="container mx-auto p-4">
	<h1 class="text-3xl font-bold mb-6">Lista de Libros</h1>

	{#each books as book}
		<div class="bg-white shadow-md rounded-lg p-4 mb-4 border">
			<h3 class="text-xl font-semibold text-gray-800">{book.title}</h3>
			<p class="text-gray-600">Autor: {book.author}</p>
		</div>
	{/each}
</div>
