import { initClipStoreEvents } from "./handler/onModalSaveClip.js";
import { initScrollEvents } from "./handler/onModalScroll.js";
import { initSearchEvent } from "./handler/searchYoutube.js";
import { API_KEY } from "./utils/env.js";

const $searchButton = document.querySelector("#search-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

function init() {
  initSearchEvent();
  initClipStoreEvents();
}
init();
