import { $ } from "../utils/dom.js";

const $youtubeClipWrapper = $(".youtube-search-modal__clip");

function manupactorForStoreClip(target) {}

function handlerStoreEvents({ target }) {
  let targetClip = target.closest(".youtube-search-modal-clip");
  console.log(targetClip.querySelector("iframe").src.slice(39));
}
export function initClipStoreEvents() {
  $youtubeClipWrapper.addEventListener("click", handlerStoreEvents);
}
