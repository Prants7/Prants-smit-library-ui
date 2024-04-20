<script setup>
import { ref } from 'vue';
import { createBookPromise } from '@/services/dataFetcher';

const bookName = ref('');
const authorName = ref('');
const releaseDate = ref('');

async function createBook() {
    try {
        await createBookPromise(bookName.value, authorName.value, releaseDate.value)
        .then(() => console.log('new book saved'))
    } catch (error) {
        console.log(error);
    }
}

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

        <button @click="createBook()">Add new book</button>

    </div>
</template>