<script setup>
import { ref, onMounted } from 'vue';
import { getBorrowedBooksPromise } from '@/services/dataFetcher';
import BorrowingForm from '@/components/forms/BorrowingForm.vue'

const borrowData = ref(null);

async function fetchBorrowData() {
    try {
        await getBorrowedBooksPromise().then(result => borrowData.value = result.data);
    } catch(error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchBorrowData();
})

</script>

<template>
    <div class="BorrowedBooks">
        <BorrowingForm />
        <h1>All Borrowed Books</h1>
        <button @click="fetchBorrowData()">refresh</button>
        <ul v-if="borrowData">
            <li v-for="oneBorrow in borrowData" :key="oneBorrow.borrowId">
                Book name:{{ oneBorrow.bookName }}, Book copy code: {{ oneBorrow.bookCopyScanCode }}, 
                Borrowed by {{ oneBorrow.readerName }}, Borrowed on {{ oneBorrow.dayWhenBorrowed }},
                Expected return date {{ oneBorrow.designatedReturnDate }}
            </li>
        </ul>
        <p v-else>Loading...</p>
    </div>
</template>