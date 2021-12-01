import { BASE_URL, YOUTUBE, LOCAL_STORAGE_KEYS } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { API_KEY } from "../utils/env.js";
import { request } from "../utils/fetch.js";
import { makeQueryString } from "../utils/makeQuery.js";
import { getItem, getRecentKeywords, setItem } from "../utils/store.js";
import { getMockYouTubeSearchData } from "../utils/tmpYouTubeData.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";
import {
  renderNotfound,
  renderYoutubeClip,
} from "../view/renderYoutubeClip.js";
import { getYoutubeVideoId, storeNextPageToken } from "./onModalCommon.js";
import { initScrollEvents } from "./onModalScroll.js";

//r검색결과가 10개미만일때,
const $searchYoutubeForm = $(".youtube-search-modal__form");
const $searchButton = $(".youtube-search-modal__submit");

function onEmpty() {}

function storeRecentKeywords(input) {
  let storedKeywords = getRecentKeywords() || [];
  if (storedKeywords.length > 2) {
    storedKeywords.splice(0, 1);
  }
  storedKeywords.push(input);
  setItem(LOCAL_STORAGE_KEYS.RECENT_KEYWORD, storedKeywords);
}

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
  /*  let videoData = await request(
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
 */
  let videoData = await mockSearch();
  if (videoData.items === []) renderNotfound();
  else {
    storeCurrentKeyword(input);
    storeNextPageToken(videoData);
    storeRecentKeywords(input);
    renderYoutubeClip(getYoutubeVideoId(videoData), getRecentKeywords());
    initScrollEvents();
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
