import axios from 'axios';

const mainPath = "http://localhost:8080";
const bookPath = "/book";

async function getBooksPromise() {
    return axios.get(mainPath + bookPath);
}

export default getBooksPromise
