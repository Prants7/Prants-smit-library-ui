<script setup>
import { ref } from 'vue';
import { createBookCopyPromise } from '@/services/dataFetcher';

const bookCopyForm = ref({
    bookId: 0,
    scanCode: 0,
});

async function createBookCopy() {
    try {
        await createBookCopyPromise(bookCopyForm.value).then(() => console.log("new book copy saved"));
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="NewBookCopy">
        <h1>New book copy</h1>
        <h4>Book id:</h4>
        <input v-model="bookCopyForm.bookId">
        <h4>Scan code:</h4>
        <input v-model="bookCopyForm.scanCode">

        <button @click="createBookCopy()">Add new book copy</button>

    </div>
</template>