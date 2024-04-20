import axios from 'axios';

const mainPath = "http://localhost:8080";
const bookPath = "/book";
const bookCopyPath = "/book/copy";

export default function getBooksPromise() {
    return axios.get(mainPath + bookPath);
}

export function createBookPromise(bookName, authorName, releaseDate) {
    return axios.post(mainPath + bookPath,
        {
            name: bookName,
            author: authorName,
            releaseDate: releaseDate,
        }
    );
}

export function createBookCopyPromise(bookCopyForm) {
    return axios.post(mainPath + bookCopyPath, bookCopyForm);
}
