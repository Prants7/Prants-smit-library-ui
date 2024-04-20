<script setup>
import { ref } from 'vue';
import { borrowNewBookPromise } from '@/services/dataFetcher';

const borrowForm = ref(
    {
        readerCode: '',
        bookScanCode: 0
    }
);

async function borrowNewBook() {
    try {
        await borrowNewBookPromise(borrowForm.value).then(() => console.log('new book borrowed'));
    } catch(error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="NewBorrow">
        <h1>Borrow new book</h1>
        <h4>Book copy scan code:</h4>
        <input v-model="borrowForm.bookScanCode">
        <h4>Reader code:</h4>
        <input v-model="borrowForm.readerCode">

        <button @click="borrowNewBook()">Borrow new book</button>

    </div>
</template>