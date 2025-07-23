import axios from 'axios';

const API_KEY = '51414805-32578d6fb6ee3cb7948c7bdf3';


export function getImagesByQuery(query) {
    return axios('https://pixabay.com/api/', {
        params: {
            key: API_KEY,
            q: query,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        },
    })
        .then(res => res.data);
}
