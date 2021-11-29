import { BASE_URL } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { makeSearchQuery } from "../utils/makeQuery.js";
import { hideElement, showElement } from "../utils/setAtribute.js";
import { getMockYouTubeSearchData } from "../utils/tmpYouTubeData.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";
import { renderYoutubeClip } from "../view/renderSearchModal.js";

const $searchYoutubeForm = $(".youtube-search-modal__form");
const $searchButton = $(".youtube-search-modal__submit");
const $clips = document.querySelectorAll(".youtube-search-modal-clip");
const $clipContainer = document.querySelector(".youtube-search-modal__clip");
const lastClip = document.querySelector(
  ".youtube-search-modal-clip:last-child"
);
function onEmpty() {}

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

async function search(query) {
  const mockYoutubeSearchData = await getMockYouTubeSearchData();
  let e = getYoutubeVideoId(mockYoutubeSearchData);
  //const response = await fetch(query);
  //const e = await response.json();
  return e;
}
export async function handlerSearchEvent() {
  let input = $("[data-js=youtube-search-modal__input]").value;
  renderLoading();
  let videoData;
  videoData = await search(makeSearchQuery(input, BASE_URL));
  renderYoutubeClip(videoData).then(
    lastClip.addEventListener("load", (e) => {
      console.log("object");
    })
  );

  endLoading();
}

function searchYoutubeForScrollDown() {
  console.log($clips, $clipContainer);
  let options = {
    root: document.querySelector(".youtube-search-modal__inner"),
    rootMargin: "0px",
    threshold: [0, 0.5, 1],
  };
  let observer = new IntersectionObserver((entries, observer) => {
    console.log("object");
    // IntersectionObserverEntry 객체 리스트와 observer 본인(self)를 받음
    // 동작을 원하는 것 작성
    entries.forEach((entry) => {
      // entry와 observer 출력
      console.log("entry:", entry);
      console.log("observer:", observer);
    });
  }, options);

  $clips.forEach((e) => {
    observer.observe(e);
  });
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
