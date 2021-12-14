import { LOCAL_STORAGE_KEYS } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { getItem, setItem } from "../utils/store.js";
import { renderSnackbar } from "../view/renderSnackBar.js";
import { renderStoredClipNumber } from "../view/renderYoutubeClip.js";

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

function storeClipInfo(clipId, clipInfo) {
  let storedClipId = getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID) || [];
  let storedClipInfo = getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO) || [];
  console.log(storedClipInfo);
  storedClipInfo.push(clipInfo);
  storedClipId.push(clipId);
  setItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID, storedClipId);
  setItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO, storedClipInfo);
  return;
}

function isMaxSavedClip() {
  if (getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID).length > 99) return true;
  return false;
}

function handlerStoreEvents(target) {
  if (isMaxSavedClip()) {
    alert("100개 이상은 저장할 수 업습니다");
    return;
  }
  renderSnackbar("store");
  let clipInfo = manufactureForStoreClip(target);
  console.log(clipInfo);
  storeClipInfo(clipInfo.clipId, clipInfo);
  target.classList.add("d-none");
  renderStoredClipNumber(getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID).length);
}
export function initClipStoreEvents() {
  $youtubeClipWrapper.addEventListener("click", (e) => {
    if (e.target.classList[1] === "store-btn") handlerStoreEvents(e.target);
  });
}
