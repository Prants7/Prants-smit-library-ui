<script setup>
import { onMounted, ref } from 'vue'
import getBooksPromise from '@/services/dataFetcher';


const bookName = ref('')
const authorName = ref('')
const releaseDate = ref('')
const bookData = ref([]);

async function fetchBooks() {
    try {
        console.log(`Calling promise.`)
        await getBooksPromise().then(result => {
            bookData.value = result.data;
        })
    } catch (error) {
        console.log(error);
    }

}

onMounted(() => {
    fetchBooks();
    console.log(`the component is now mounted.`)
})

</script>

<template>
    <div class="NewBook">
        <h1>New book</h1>
        <h4>Book name:</h4>
        <input v-model="bookName">
        <h4>Author name:</h4>
        <input v-model="authorName">
        <h4>Release Date:</h4>
        <input v-model="releaseDate">

        <button @click="createBook(bookName, authorName, releaseDate)">Add new book</button>

    </div>
    <div class="Books">
        <h1>All Books</h1>
        <ul v-if="bookData">
            <li v-for="oneBook in bookData" :key="oneBook.id">Name:{{ oneBook.name }}, Author:{{ oneBook.author }}, Available
                copys: {{ oneBook.availableCopyCount }}</li>
        </ul>
        <p v-else>Loading...</p>
    </div>
</template>
  
<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>