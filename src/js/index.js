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
let url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=KR&maxResults=25&key=${API_KEY}`;
fetch(url).then((response) => console.log(response));
