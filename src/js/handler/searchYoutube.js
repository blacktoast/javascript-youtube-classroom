import { BASE_URL } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { makeSearchQuery } from "../utils/makeQuery.js";
import { hideElement, showElement } from "../utils/setAtribute.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";

const $searchYoutubeForm = $(".search-youtube");
const $searchButton = $(".search-btn");

function onEmpty() {}
function search(query) {
  console.log(query);
  return new Promise((resolve, reject) => setTimeout(resolve, 5000));
}

export async function handlerSearchEvent() {
  let input = $(".search-input").value;

  renderLoading();
  await search(makeSearchQuery(input, BASE_URL));
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
