import { BASE_URL } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { makeSearchQuery } from "../utils/makeQuery.js";
import { hideElement, showElement } from "../utils/setAtribute.js";
import { getMockYouTubeSearchData } from "../utils/tmpYouTubeData.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";
import { renderYoutubeClip } from "../view/renderSearchModal.js";

const $searchYoutubeForm = $(".youtube-search-modal__form");
const $searchButton = $(".youtube-search-modal__submit");
const $clipContainer = document.querySelector(".youtube-search-modal__clip");
const lastClip = document.querySelector(
  ".youtube-search-modal-clip:last-child"
);
let videoData;

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
  let result = getYoutubeVideoId(mockYoutubeSearchData);
  //const response = await fetch(query);
  //const result = getYoutubeVideoId(await response.json());
  return result;
}
export async function handlerSearchEvent() {
  let input = $("[data-js=youtube-search-modal__input]").value;
  renderLoading();
  videoData = await search(makeSearchQuery(input, BASE_URL));
  renderYoutubeClip(videoData);
  const $clips = document.querySelectorAll(".youtube-search-modal-clip");
  searchYoutubeForScrollDown($clips);
  endLoading();
}

function searchYoutubeForScrollDown(clips) {
  console.log(clips, $clipContainer);
  let options = {
    root: document.querySelector(".youtube-search-modal__inner"),
    rootMargin: "0px",
    threshold: 0.8,
  };

  let io = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting) {
      setTimeout(renderYoutubeClip(videoData), 1000);
    }
  }, options);

  io.observe(clips[clips.length - 1]);
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
