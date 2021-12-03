import { LOCAL_STORAGE_KEYS } from "../utils/constant.js";
import { hideScroll, showScroll } from "../utils/setAtribute.js";
import { getItem } from "../utils/store.js";
import { renderYoutubeClipToMain } from "../view/renderMainSavedClip.js";
import { initEmojisEvents } from "./onMainWactchedClip.js";

const $body = document.querySelector("body");
const $searchButton = document.querySelector("#search-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
  hideScroll($body);
};

const onModalClose = () => {
  forRenderSavedClipOnMain();
  $modal.classList.remove("open");
  showScroll($body);
};

function forRenderSavedClipOnMain() {
  let savedClips = getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO);
  renderYoutubeClipToMain(savedClips);
}

export function initEvents() {
  $searchButton.addEventListener("click", onModalShow);
  $modalClose.addEventListener("click", onModalClose);
  initEmojisEvents();
}
