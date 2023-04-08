import '../scss/styles.scss';

import { Popover } from 'bootstrap';
import { fetchImages, isFetching } from "./infiniteScroll";


document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

window.addEventListener("DOMContentLoaded", async (event) => {
    await fetchImages();
});

window.addEventListener("scroll", async () => {
    if (isFetching) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {

        await fetchImages();
    }
});
