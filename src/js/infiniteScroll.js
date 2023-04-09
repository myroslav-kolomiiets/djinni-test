export let isFetching = false;
let currentPage = 1;
let pagesLimitForOneFetch = 9;
let pagesAmount = 9;

const imgContainer = document.getElementById("images-container");
const itemsCounter = document.getElementById("items-counter");

document.body.addEventListener("click", event => {
    const {id, classList} = event.target;

    if (!classList.contains("read-more-btn")) {
        return;
    }

    if (!id) {
        return;
    }

    const readMoreBtn = document.getElementById(id);
    const text = document.querySelector(`[data-read-more=${id}]`);


    if (text) {
        text.classList.toggle("show-more");
        if (readMoreBtn.innerText === "Show more...") {
            readMoreBtn.innerText = "Show less...";
        } else {
            readMoreBtn.innerText = "Show more...";
        }
    }
});

const renderCard = (image) => {
    const {author, download_url, id} = image;

    return `<div class="card" id=${id}>
                <img class="bd-placeholder-img card-img-top" src=${download_url} alt="image"/>
                <div class="card-body p-0">
                    <h4 class="card-title px-4 pt-3 pb-0 display-7 m-0">Author ${author}</h4>
                    <p class="card-text px-4 py-3 m-0" data-read-more="read-more-${id}">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        <span class="dots"> ...</span>
                        <span class="moreText"> 
                        assumenda sapiente expedita labore atque! Sint velit cumque minus pariatur quisquam, 
                        beatae ab quo impedit eaque soluta vel laboriosam itaque similieum aut eoloremque 
                        aperiam molestiae quos incidunt dolore iure officia! Blanditiis sint delectus quam quae nulla.
                        </span>
                    </p>
                    <button
                        id="read-more-${id}"
                        class="btn btn-link read-more-btn px-4"
                        type="button"
                    >
                        Show more...
                    </button>
                    <div class="d-flex justify-content-start align-items-center p-3 border-top">
                        <button type="button" class="btn btn-primary px-3 py-2 me-3">Save to collection</button>
                        <button type="button" class="btn btn-outline-secondary px-3 py-2">Share</button>
                    </div>
                </div>
          </div>`;
};

const updateDOM = (images) => {
    const imageContainerClassNames = [
        "image-wrapper",
        "col",
        "d-flex",
        "justify-content-center",
    ];
    images.forEach((img) => {
        const imageContainer = document.createElement("div");
        imageContainer.classList.add(...imageContainerClassNames);
        imageContainer.innerHTML = renderCard(img);
        imgContainer.appendChild(imageContainer);
    });
    itemsCounter.innerText = `${pagesAmount} items`;
};

export const fetchImages = async () => {
    isFetching = true;
    const response = await fetch(`https://picsum.photos/v2/list?page=${currentPage}&limit=${pagesLimitForOneFetch}`);
    const images = await response.json();
    updateDOM(images);
    currentPage++;
    pagesAmount += pagesLimitForOneFetch;
    isFetching = false;
};