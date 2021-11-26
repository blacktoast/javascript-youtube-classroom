import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";

const $searchYoutubeForm = $(".search-youtube");
const $searchButton = $(".search-btn");

function onEmpty() {}
function search() {
  return new Promise((resolve, reject) => setTimeout(resolve, 1000));
}
export async function handlerSearchEvent() {
  let input = $(".search-input").value;
  console.log(input);
  renderLoading();
  await search();
  endLoading();
}

export function initSearchEvent() {
  $searchYoutubeForm.addEventListener("submit", (e) => {
    handlerSearchEvent();
    e.preventDefault();
  });
  $searchButton.addEventListener("click", (e) => {
    showElement($skeleton);
    console.log(e);
  });
}
