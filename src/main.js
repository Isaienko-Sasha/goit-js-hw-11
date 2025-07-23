import axios from 'axios';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('submit', handleSubmit);

//function populateDatalist(arr) {
//  return arr
//  .map(
//  ({ id, tags }) => `
//<option value="${tags}" data-id="${id}"></option>
// `
// )
//  .join('');
//}

function handleSubmit(event) {
  event.preventDefault();

  const myInput = searchInput.value.trim();

  if (!myInput) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }
    
    //loader.classList.remove("hidden");


  clearGallery();
    showLoader();
    
    getImagesByQuery(myInput)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          message: 'No images found. Try a different search term.',
          position: 'topRight',
        });
      } else {
        createGallery(data.hits);

        const lightbox = new SimpleLightbox('.gallery a');
        lightbox.refresh();
      }
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
        hideLoader();
    });
}
