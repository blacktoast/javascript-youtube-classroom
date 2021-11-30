import { BASE_URL, YOUTUBE, LOCAL_STORAGE_KEYS } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { API_KEY } from "../utils/env.js";
import { request } from "../utils/fetch.js";
import { makeQueryString } from "../utils/makeQuery.js";
import { getMockYouTubeSearchData } from "../utils/tmpYouTubeData.js";
import { endLoading, renderLoading } from "../view/renderModalCommon.js";
import { renderYoutubeClip } from "../view/renderSearchModal.js";

const $searchYoutubeForm = $(".youtube-search-modal__form");
const $searchButton = $(".youtube-search-modal__submit");

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

function storeNextPageToken(input) {
  console.log(input.nextPageToken);
  localStorage.setItem(LOCAL_STORAGE_KEYS.NEXTPAGE_KEY, input.nextPageToken);
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
  console.log(videoData);
  storeNextPageToken(videoData);
  renderYoutubeClip(getYoutubeVideoId(videoData));
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
