import { BASE_URL } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { makeSearchQuery } from "../utils/makeQuery.js";
import { hideElement, showElement } from "../utils/setAtribute.js";
import { getMockYouTubeSearchData } from "../utils/tmpYouTubeData.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";

const $searchYoutubeForm = $(".youtube-search-modal__form");
const $searchButton = $(".youtube-search-modal__submit");

function onEmpty() {}
async function search(query) {
  const mockYoutubeSearchData = await getMockYouTubeSearchData();
  //const response = await fetch(query);
  //const e = await response.json();
  console.log(e);
  return e;
}

export async function handlerSearchEvent() {
  let input = $("[data-js=youtube-search-modal__input]").value;

  renderLoading();
  let t;
  t = await search(makeSearchQuery(input, BASE_URL));
  console.log(t);
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
