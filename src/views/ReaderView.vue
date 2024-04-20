<script setup>
import { onMounted, ref } from 'vue';
import { getReaderPromise } from '@/services/dataFetcher';

const readerData = ref(null);

async function fetchReaders() {
    try {
        await getReaderPromise().then(result => readerData.value = result.data);
    } catch (error) {
        console.log(error);
    }

}

onMounted(() => {
    fetchReaders();
})

</script>

<template>
    <div class="Readers">
        <h1>All Readers</h1>
        <button @click="fetchReaders()">refresh</button>
        <ul v-if="readerData">
            <li v-for="oneReader in readerData" :key="oneReader.readerCode">Name:{{ oneReader.name }}, Reader code: {{ oneReader.readerCode }} </li>
        </ul>
        <p v-else>Loading...</p>
    </div>
</template>