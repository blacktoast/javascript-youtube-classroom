import { $ } from "../utils/dom.js";

const $youtubeClipWrapper = $(".youtube-search-modal__clip");

function manufactureForStoreClip(target) {
  let targetClip = target.closest(".youtube-search-modal-clip");
  let container = targetClip.querySelector(".content-container");
  let clipInfo = {
    clipId: targetClip.querySelector("iframe").src.slice(39),
    channelId: container.querySelector(".channel-name").href.slice(41),
    title: container.querySelector("h3").innerText,
    channelName: container.querySelector(".channel-name").innerText,
    time: container.querySelector(".meta>p").innerText,
  };
  return clipInfo;
}

function handlerStoreEvents(target) {
  let clipInfo = manufactureForStoreClip(target);
  console.log(clipInfo);
  target.classList.add("d-none");
}
export function initClipStoreEvents() {
  $youtubeClipWrapper.addEventListener("click", (e) => {
    if (e.target.classList[1] === "store-btn") handlerStoreEvents(e.target);
  });
}
