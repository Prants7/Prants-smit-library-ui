<script setup>
import { onMounted, ref } from 'vue'
import getBooksPromise from '@/services/dataFetcher';
import BookAddingForm from '@/components/forms/BookAddingForm.vue';
import router from '@/router';

const bookData = ref(null);

async function fetchBooks() {
    try {
        await getBooksPromise().then( result => {
            bookData.value = result.data;
        })
    } catch (error) {
        console.log(error);
    }
}

function routeToBookDetails(bookId) {
    router.push('/book/' + bookId)
}

onMounted(() => {
    fetchBooks();
})

</script>

<template>
    <BookAddingForm />
    <div class="Books">
        <h1>All Books</h1>
        <button @click="fetchBooks()">refresh</button>
        <ul v-if="bookData">
            <li v-for="oneBook in bookData" :key="oneBook.id">Id: {{ oneBook.id }}, Name:{{ oneBook.name }}, Author:{{ oneBook.author }}, Available
                copys: {{ oneBook.availableCopyCount }} <button @click="routeToBookDetails(oneBook.id)">details</button></li>
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