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
import { getYoutubeClipInfo, storeNextPageToken } from "./onModalCommon.js";
import { initScrollEvents } from "./onModalScroll.js";

//r검색결과가 10개미만일때,
const $searchYoutubeForm = $(".youtube-search-modal__form");
const $searchButton = $(".youtube-search-modal__submit");
const $clipWrapperOnModal = $(".youtube-search-modal__clip");

function onEmpty() {}

function clearClipContainer() {
  $clipWrapperOnModal.innerHTML = "";
}

function storeRecentKeywords(input) {
  let storedKeywords = getItem(LOCAL_STORAGE_KEYS.RECENT_KEYWORD) || [];
  if (storedKeywords.length > 2) {
    storedKeywords.splice(0, 1);
  }
  storedKeywords.push(input);
  setItem(LOCAL_STORAGE_KEYS.RECENT_KEYWORD, storedKeywords);
}

function storeCurrentKeyword(input) {
  localStorage.setItem(LOCAL_STORAGE_KEYS.CURRENT_KEYWORD, input);
}

function isOverlappingToClip(clipInfo) {
  let storedClipId = getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID) || null;
  let tmp = clipInfo;
  if (storedClipId) {
    clipInfo.forEach((clip) => {
      storedClipId.forEach((stored) => {
        console.log(clip.clipId === stored);
        if (!clip.overlapping) {
          clip.clipId === stored
            ? (clip.overlapping = true)
            : (clip.overlapping = false);
        }
      });
    });
  }
  return clipInfo;
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
  //let videoData = await mockSearch();
  console.log($clipWrapperOnModal);

  clearClipContainer();
  console.log($clipWrapperOnModal);
  console.log(videoData);
  if (videoData.items === []) renderNotfound();
  else {
    storeCurrentKeyword(input);
    storeNextPageToken(videoData);
    storeRecentKeywords(input);
    videoData = getYoutubeClipInfo(videoData);
    isOverlappingToClip(videoData);
    renderYoutubeClip(videoData, getItem(LOCAL_STORAGE_KEYS.RECENT_KEYWORD));
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
