<script setup>
import { onMounted, ref } from 'vue';
import { getReaderPromise } from '@/services/dataFetcher';
import ReaderAddingForm from '@/components/forms/ReaderAddingForm.vue'
import router from '@/router';


const readerData = ref(null);

async function fetchReaders() {
    try {
        await getReaderPromise( readerData.value ).then( result => readerData.value = result.data);
    } catch (error) {
        console.log(error);
    }

}

function routeToReaderDetails(readerCode) {
    router.push('/reader/' + readerCode);
}

onMounted(() => {
    fetchReaders();
})

</script>

<template>
    <div class="Readers">
        <ReaderAddingForm />
        <h1>All Readers</h1>
        <button @click="fetchReaders()">refresh</button>
        <ul v-if="readerData">
            <li v-for="oneReader in readerData" :key="oneReader.readerCode">Name:{{ oneReader.name }}, Reader code: {{ oneReader.readerCode }} 
                <button @click="routeToReaderDetails(oneReader.readerCode)">details</button>
            </li>
        </ul>
        <p v-else>Loading...</p>
    </div>
</template>