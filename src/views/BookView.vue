<script setup>
import { ref } from 'vue'

const bookName = ref('')
const authorName = ref('')
const releaseDate = ref('')
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
        <ul v-if="apiData">
            <li v-for="oneBook in apiData" :key="oneBook.id">Name:{{ oneBook.name }}, Author:{{ oneBook.author }}, Available
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

<script>
import axios from 'axios';

export default {
    data() {
        return {
            apiData: null,

        };
    },
    methods: {

        async getBooks() {
            try {
                const { data } = await axios.get("http://localhost:8080/book");
                this.apiData = data;
            } catch (error) {
                console.log(error);
            }

        },

        async createBook(bookName, authorName, releaseDate) {
            try {
                const { data } = await axios.post(
                    "http://localhost:8080/book",
                    {
                        name: bookName,
                        author: authorName,
                        releaseDate: releaseDate,
                    }
                )
            } catch (error) {
                console.log(error);
            }
            this.getBooks();
        }

    },
    beforeMount() {
        this.getBooks();
    }
};

</script>