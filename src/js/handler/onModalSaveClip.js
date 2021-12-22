import { LOCAL_STORAGE_KEYS } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { getItem, setItem } from "../utils/store.js";
import { renderSnackbar } from "../view/renderSnackBar.js";
import { renderStoredClipNumber } from "../view/renderYoutubeClip.js";
import { manufactureForStoreClip, storeClipInfo } from "./onModalCommon.js";

const $youtubeClipWrapper = $(".youtube-search-modal__clip");

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
  storeClipInfo(clipInfo);
  target.classList.add("d-none");
  renderStoredClipNumber(getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID).length);
}
export function initClipStoreEvents() {
  $youtubeClipWrapper.addEventListener("click", (e) => {
    if (e.target.classList[1] === "store-btn") handlerStoreEvents(e.target);
  });
}
