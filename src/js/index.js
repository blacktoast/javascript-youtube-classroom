import { BASE_URL } from "./utils/constant.js";
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
let url = `${BASE_URL}part=snippet&q=${encodeURI("코코몽")}&key=${API_KEY}`;
let t = await fetch(url);
t = await t.json();
console.log(t);
