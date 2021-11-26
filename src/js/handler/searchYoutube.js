import { $ } from "../utils/dom.js";

const $searchYoutubeForm = $(".search-youtube");
const $searchButton = $(".search-btn");

export function handlerSearchEvent() {
  let input = $(".search-input").value;
  console.log(input);
}

export function initSearchEvent() {
  $searchYoutubeForm.addEventListener("submit", (e) => {
    handlerSearchEvent();
    e.preventDefault();
  });
  $searchButton.addEventListener("click", (e) => {
    console.log(e);
  });
  console.log("object");
}
