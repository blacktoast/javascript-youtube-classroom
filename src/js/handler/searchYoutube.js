import { BASE_URL } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { makeQueryString } from "../utils/makeQuery.js";
import { hideElement, showElement } from "../utils/setAtribute.js";
import { getMockYouTubeSearchData } from "../utils/tmpYouTubeData.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";
import { renderYoutubeClip } from "../view/renderSearchModal.js";

const $searchYoutubeForm = $(".youtube-search-modal__form");
const $searchButton = $(".youtube-search-modal__submit");
const $clipContainer = document.querySelector(".youtube-search-modal__clip");
let nextPageToken = "";
let videoData;

function onEmpty() {}

function getSearchInput() {
  let input = $("[data-js=youtube-search-modal__input]").value;
  return input;
}

function setNextPageToken(input) {
  nextPageToken = input;
}

function getYoutubeVideoId(youtubeSearchData) {
  let result = [...youtubeSearchData.items].map((e) => {
    let videoInfo = {
      videoId: e.id.videoId,
      channelId: e.snippet.channelId,
      title: e.snippet.title,
    };
    return videoInfo;
  });
  console.log(result);
  return result;
}
function storeNextPageToken(videoData) {
  setNextPageToken(videoData.nextPageToken);
  return;
}

async function search(query, nextPage = false) {
  //const mockYoutubeSearchData = await getMockYouTubeSearchData();
  //let result = getYoutubeVideoId(mockYoutubeSearchData);
  const response = await fetch(query);
  const videoData = await response.json();
  const result = getYoutubeVideoId(videoData);
  storeNextPageToken(videoData);
  return result;
}

function searchYoutubeForScrollDown(clips) {
  let options = {
    root: document.querySelector(".youtube-search-modal__inner"),
    rootMargin: "0px",
    threshold: 0.8,
  };
  let io = new IntersectionObserver(async (entries, observer) => {
    if (entries[0].isIntersecting) {
      alert("추가검색");
      let input = getSearchInput();
      console.log(input);
      videoData = await search(makeQueryString(input, BASE_URL, nextPageToken));
      renderYoutubeClip(videoData);
    }
  }, options);
  return io;
}

export async function handlerSearchEvent() {
  let input = getSearchInput();
  renderLoading();
  videoData = await search(makeQueryString(input, BASE_URL));

  renderYoutubeClip(videoData);
  const $clips = document.querySelectorAll(".youtube-search-modal-clip");
  searchYoutubeForScrollDown($clips);
  endLoading();
}

export function initSearchEvent() {
  $searchYoutubeForm.addEventListener("submit", (e) => {
    handlerSearchEvent();
    e.preventDefault();
  });
  $searchButton.addEventListener("click", (e) => {
    handlerSearchEvent();
    console.log(e);
  });
}
