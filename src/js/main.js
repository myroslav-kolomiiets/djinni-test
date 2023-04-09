import '../scss/styles.scss';

import {Popover} from 'bootstrap';
import {fetchImages, isFetching} from "./infiniteScroll";

document.querySelectorAll('[data-bs-toggle="popover"]')
    .forEach(popover => {
        new Popover(popover)
    })

window.addEventListener("DOMContentLoaded", async (event) => {
    await fetchImages();
});

const intersectionObserver = new IntersectionObserver(async (entries) => {
    if (entries[0].intersectionRatio <= 0) {
        return
    }

    if (isFetching) {
        return;
    }

    await fetchImages();
});

intersectionObserver.observe(document.getElementById("more"));
