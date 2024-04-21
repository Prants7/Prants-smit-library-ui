<script setup>
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import getBooksPromise from '@/services/dataFetcher';
import { getReaderDetailsPromise, 
    getBorrowedBooksForReaderPromise, 
    returnOldBookPromise, 
    getBookScanCodesPromise, 
    borrowNewBookPromise } from '@/services/dataFetcher';

const route = useRoute();
const code = route.params.code;
const readerData = ref(null);
const borrowData = ref(null);
const possibleBooksToBorrow = ref(null);
const selectedBookToBorrow = ref(null);
const possibleCopyCodes = ref(null);
const selectedBookCopyBorrow = ref(null);

async function fetchReader(readerCode) {
    try {
        await getReaderDetailsPromise(readerCode).then(result => {
            readerData.value = result.data;
        })
    } catch (error) {
        console.log(error);
    }
}

async function fetchReaderBorrow(readerCode) {
    try {
        await getBorrowedBooksForReaderPromise(readerCode).then(result => {
            borrowData.value = result.data;
        })
    } catch (error) {
        console.log(error);
    }
}

async function returnBook(oneBorrow) {
    try {
        await returnOldBookPromise({bookScanCode: oneBorrow.bookCopyScanCode}).then(() => {
            console.log("book returned");
            fetchReaderBorrow(code);
        });
    } catch(error) {
        console.log(error);
    }
}

async function fetchBooks() {
    try {
        await getBooksPromise().then( result => {
            possibleBooksToBorrow.value = result.data;
        })
    } catch (error) {
        console.log(error);
    }
}

async function fetchBookCopyCodes(bookId) {
  try {
        await getBookScanCodesPromise(bookId).then( result => {
            possibleCopyCodes.value = result.data;
        })
    } catch (error) {
        console.log(error);
    }
}

async function borrowNewBook() {
    try {
        await borrowNewBookPromise({
            readerCode: code,
            bookScanCode: selectedBookCopyBorrow.value.scanCode
        }).then(() => {
            console.log('new book borrowed');
            fetchReaderBorrow(code);
        } );
    } catch(error) {
        console.log(error);
    }
}

onMounted(() => {
    fetchReader(code);
    fetchReaderBorrow(code);
    fetchBooks();
})
</script>

<template>
    <div class="Reader">
        <div v-if="readerData">
            <h3>Name: {{ readerData.name }}</h3>
            <h3>Code: {{ readerData.readerCode }}</h3>
            <h1>All Currently borrowed books</h1>
            <ul v-if="borrowData">
                <li v-for="oneBorrow in borrowData" :key="oneBorrow.borrowId">
                    Book name:{{ oneBorrow.bookName }}, Book copy code: {{ oneBorrow.bookCopyScanCode }},
                    Borrowed by {{ oneBorrow.readerName }}, Borrowed on {{ oneBorrow.dayWhenBorrowed }},
                    Expected return date {{ oneBorrow.designatedReturnDate }} <button @click="returnBook(oneBorrow)">
                        return book</button>
                </li>
            </ul>
        </div>
        <div v-else>
            <h3>Loading</h3>
        </div>

    </div>
    <div class="NewBorrow">
        <div v-if="possibleBooksToBorrow" >
            <h3>Borrow new book</h3>
            <select v-model="selectedBookToBorrow" @change="fetchBookCopyCodes(selectedBookToBorrow.id)">
                <option v-for="oneBook in possibleBooksToBorrow" :value="oneBook">{{ oneBook.name }}</option>
            </select>
        </div>
        <div v-else>
            <h3>Loading</h3>
        </div>
        <div v-if="possibleCopyCodes" >
            <h3>Copies of {{ selectedBookToBorrow.name }}</h3>
            <select v-model="selectedBookCopyBorrow">
                <option v-for="oneCopy in possibleCopyCodes" :value="oneCopy">{{ oneCopy.scanCode }}</option>
            </select>
            <button v-if="selectedBookCopyBorrow" @click="borrowNewBook()">Borrow selected copy</button>
        </div>
    </div>
</template>