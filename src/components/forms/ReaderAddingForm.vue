<script setup>
import { ref } from 'vue';
import { createReaderPromise } from '@/services/dataFetcher';

const readerForm = ref(
    {
        name: '',
        readerCode: ''
    }
);

async function createReader() {
    try {
        await createReaderPromise(readerForm.value).then(() => console.log("new reader saved"));
    } catch (error) {
        console.log(error);
    }
}

</script>

<template>
    <div class="NewReader">
        <h1>New reader</h1>
        <h4>Reader name:</h4>
        <input v-model="readerForm.name">
        <h4>Reader code:</h4>
        <input v-model="readerForm.readerCode">

        <button @click="createReader()">Add new reader</button>

    </div>
</template>