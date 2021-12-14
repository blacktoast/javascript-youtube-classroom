import { hideElement, showElement } from "../utils/setAtribute.js";
import { $ } from "../utils/dom.js";

const $skeleton = $(".youtube-search-modal__skeleton-wrapper");
const $youtubeWrapper = $("#view-video-wrapper");

export function renderLoading() {
  hideElement($youtubeWrapper);
  showElement($skeleton);
}

export function endLoading() {
  showElement($youtubeWrapper);
  hideElement($skeleton);
}
