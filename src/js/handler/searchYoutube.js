import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";

const $searchYoutubeForm = $(".search-youtube");
const $searchButton = $(".search-btn");
const $skeleton = $("#skeleton-wrapper");
const $youtubeWrapper = $("#view-video-wrapper");
export function handlerSearchEvent() {
  let input = $(".search-input").value;
  console.log(input);
}

export function initSearchEvent() {
  $searchYoutubeForm.addEventListener("submit", (e) => {
    handlerSearchEvent();
    hideElement($youtubeWrapper);
    showElement($skeleton);
    e.preventDefault();
  });
  $searchButton.addEventListener("click", (e) => {
    showElement($skeleton);
    console.log(e);
  });
}
