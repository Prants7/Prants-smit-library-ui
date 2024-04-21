<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { getOneBookPromise, getBookScanCodesPromise, createBookCopyPromise } from '@/services/dataFetcher';

const route = useRoute();
const id = route.params.id;
const bookData = ref(null);
const copyData = ref(null);
const newCopyId = ref(0);

async function fetchBook(bookId) {
    try {
        await getOneBookPromise(bookId).then( result => {
            bookData.value = result.data;
        })
    } catch (error) {
        console.log(error);
    }
}

async function fetchBookCopyCodes(bookId) {
  try {
        await getBookScanCodesPromise(bookId).then( result => {
            copyData.value = result.data;
        })
    } catch (error) {
        console.log(error);
    }
}

async function createBookCopy() {
    try {
        await createBookCopyPromise({
          bookId: id,
          scanCode: newCopyId.value
        }).then(() => {
          console.log("new book copy saved");
          fetchBookCopyCodes(id);
        });
    } catch (error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchBook(id);
    fetchBookCopyCodes(id);
})
</script>

<template>
  <div class="Book">
    <div v-if="bookData">
      <h3>Selected book: {{ bookData.name }}</h3>
      <h3>Author: {{ bookData.author }}</h3>
      <h3>Release date: {{ bookData.releaseDate }}</h3>
      <h1>All Copies</h1>
        <ul v-if="copyData">
            <li v-for="oneCopy in copyData" :key="oneCopy.scanCode">Copy code: {{ oneCopy.scanCode }}</li>
        </ul>
        <p v-else>Loading...</p>
    </div>
    <div v-else>
      <h3>Loading</h3>
    </div>

  </div>
  <div class="NewBookCopy">
        <h1>Add new copy</h1>
        <h4>Scan code:</h4>
        <input v-model="newCopyId">
        <button @click="createBookCopy()">Add new book copy</button>

    </div>
</template>