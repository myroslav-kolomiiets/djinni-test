export let isFetching = false;
let currentPage = 1;
let pagesLimitForOneFetch = 9;
let pagesAmount = 9;

const imgContainer = document.getElementById("images-container");
const itemsCounter = document.getElementById("items-counter");

document.body.addEventListener("click", event => {
    const {id, classList} = event.target;

    if (!classList.contains("show-more-btn")) {
        return;
    }

    if (!id) {
        return;
    }

    const showMoreBtn = document.getElementById(id);
    const text = document.querySelector(`[data-show-more=${id}]`);
    const dots = text.querySelector('.dots');
    const moreText = text.querySelector('.more-text');

    if (text) {
        dots.classList.toggle("d-inline");
        dots.classList.toggle("d-none");
        moreText.classList.toggle("d-none");
        if (showMoreBtn.innerText === "Show more...") {
            showMoreBtn.innerText = "Show less...";
        } else {
            showMoreBtn.innerText = "Show more...";
        }
    }
});

const renderCard = (image) => {
    const {author, download_url, id} = image;

    return `<div class="card border-light" id=${id}>
                <img class="bd-placeholder-img card-img-top rounded-top object-fit-cover" src=${download_url} alt="image"/>
                <div class="card-body p-0 pt-1">
                    <h4 class="card-title text-dark fw-bold px-4 pt-3 pb-0 display-7 m-0">Author ${author}</h4>
                    <p class="card-text text-secondary fw-normal px-4 pt-2 m-0" data-show-more="show-more-${id}">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit
                        <span class="dots d-inline">...</span>
                        <span class="more-text d-none"> 
                        assumenda sapiente expedita labore atque! Sint velit cumque minus pariatur quisquam, 
                        beatae ab quo impedit eaque soluta vel laboriosam itaque similieum aut eoloremque 
                        aperiam molestiae quos incidunt dolore iure officia! Blanditiis sint delectus quam quae nulla.
                        </span>
                    </p>
                    <button
                        id="show-more-${id}"
                        class="btn btn-link show-more-btn-link text-decoration-none text-dark show-more-btn px-4 pb-2 mb-2"
                        type="button"
                    >
                        Show more...
                    </button>
                    <div class="d-flex justify-content-start align-items-center p-3 border-top border-light">
                        <button type="button" class="btn btn-md btn-primary fw-bold text-white border-2 px-3 me-3">Save to collection</button>
                        <button type="button" class="btn btn-md btn-outline-dark border-light border-2 fw-bold px-3">Share</button>
                    </div>
                </div>
          </div>`;
};

const updateDOM = (images) => {
    const imageContainerClassNames = [
        "image-wrapper",
        "col",
        "mb-4",
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
