import { BASE_URL, YOUTUBE, LOCAL_STORAGE_KEYS } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { API_KEY } from "../utils/env.js";
import { request } from "../utils/fetch.js";
import { makeQueryString } from "../utils/makeQuery.js";
import { getMockYouTubeSearchData } from "../utils/tmpYouTubeData.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";
import {
  renderNotfound,
  renderYoutubeClip,
} from "../view/renderYoutubeClip.js";
import { getYoutubeVideoId, storeNextPageToken } from "./onModalCommon.js";
import { initScrollEvents } from "./onModalScroll.js";

const $searchYoutubeForm = $(".youtube-search-modal__form");
const $searchButton = $(".youtube-search-modal__submit");

function onEmpty() {}

function storeCurrentKeyword(input) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_KEYWORD, input);
}

async function mockSearch() {
  const result = await getMockYouTubeSearchData();
  console.log(result);
  return result;
}



export async function handlerSearchEvent() {
  let input = $("[data-js=youtube-search-modal__input]").value;
  renderLoading();
  console.log(input);
  let videoData = await request(
    makeQueryString(
      {
        q: encodeURI(input),
        type: "video",
        maxResults: YOUTUBE.MAX_NUMBER,
        key: API_KEY,
      },
      BASE_URL
    )
  );
  console.log(videoData.items);
  //let videoData = await mockSearch();
  if (videoData.items) renderNotfound();
  else {
    storeCurrentKeyword(input);
    storeNextPageToken(videoData);
    renderYoutubeClip(getYoutubeVideoId(videoData));
  }
  endLoading();
}

export function initSearchEvent() {
  $searchYoutubeForm.addEventListener("submit", (e) => {
    handlerSearchEvent();
    e.preventDefault();
  });
  $searchButton.addEventListener("click", (e) => {
    handlerSearchEvent();
  });
}
