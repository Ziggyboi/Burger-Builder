import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-db-udemy.firebaseio.com/'
});

export default instance;