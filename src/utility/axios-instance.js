import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://pill-plate.herokuapp.com'
});

export default instance;