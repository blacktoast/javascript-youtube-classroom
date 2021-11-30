import { initSearchEvent } from "./handler/searchYoutube.js";
import { BASE_URL } from "./utils/constant.js";
import { API_KEY } from "./utils/env.js";
import { makeQueryString } from "./utils/makeQuery.js";

const $searchButton = document.querySelector("#search-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};
let query = {
  q: encodeURI("유니클로"),
  key: API_KEY,
};
$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
let url = makeQueryString("하이", BASE_URL);

function init() {
  initSearchEvent();
}
init();
