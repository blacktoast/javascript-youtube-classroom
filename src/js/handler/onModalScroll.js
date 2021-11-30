import { LOCAL_STORAGE_KEYS, YOUTUBE, BASE_URL } from "../utils/constant.js";
import { API_KEY } from "../utils/env.js";
import { request } from "../utils/fetch.js";
import { makeQueryString } from "../utils/makeQuery.js";
import { renderClipByScrollDown } from "../view/renderSearchModal.js";
import { getYoutubeVideoId, storeNextPageToken } from "./onModalCommon.js";

function getIntersectionForInfinityScroll() {
  let clips = document.querySelectorAll(".youtube-search-modal-clip");
  return clips[clips.length - 1];
}

function scrollDownEvent(e) {}

function getObserverForScrollEvents() {
  let options = {
    root: document.querySelector(".youtube-search-modal__inner"),
    rootMargin: "0px",
    threshold: 0.8,
  };
  let io = new IntersectionObserver(async (entries, observer) => {
    if (entries[0].isIntersecting) {
      alert("추가검색");
      let input =
        localStorage.getItem(LOCAL_STORAGE_KEYS.CURRENT_KEYWORD) || "";
      let nextPageToken =
        localStorage.getItem(LOCAL_STORAGE_KEYS.NEXTPAGE_KEY) || "";
      const query = {
        q: encodeURI(input),
        type: "video",
        maxResults: YOUTUBE.MAX_NUMBER,
        nextPageToken,
        key: API_KEY,
      };

      let videoData = await request(makeQueryString(query, BASE_URL));
      storeNextPageToken(videoData);
      renderClipByScrollDown(getYoutubeVideoId(videoData));
      observer.unobserve(entries[0].target);
    }
  }, options);
  return io;
}
export function initScrollEvents() {
  let observerForScrollEvents = getObserverForScrollEvents();
  let intersection = getIntersectionForInfinityScroll();
  console.log(intersection);
  observerForScrollEvents.observe(intersection);
}
