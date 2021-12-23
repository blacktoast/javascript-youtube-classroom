import { LOCAL_STORAGE_KEYS } from "../utils/constant.js";
import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";
import { getItem, setItem } from "../utils/store.js";
import { renderClipToMain } from "../view/renderMainClip.js";
import { renderSnackbar } from "../view/renderSnackBar.js";
import { manufactureForStoreClip, storeClipInfo } from "./onModalCommon.js";
/**
 * [] 휴지통 눌렀을때 저장된 클립 삭제
 * [] 체크 이모지 눌렀을때 본 클립으로 이동?
 */

const $savedClipWrapper = $(".main-savedClip-wrapper");
const $watchedClipWrapper = $(".main-watchedClip-wrapper");

function handleDeleteSavedClip(target) {
  let clip = target.closest(".main-youtube-clip");
  let clipNumber = clip.dataset.clipId;
  let storedClips = getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO);
  let clipId = storedClips[clipNumber];
  storedClips.splice(clipNumber, 1);
  setItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO, storedClips);
  console.log(storedClips);
  renderClipToMain(storedClips, $savedClipWrapper);
  handleRerenderStoreBtn(storedClips.clipId);
}

function handleRerenderStoreBtn(target) {
  let $OnMadalClips = document.querySelectorAll(".youtube-search-modal-clip");
  let onModalClips = [];
  [...$OnMadalClips].map((e) => {
    let t = e.dataset.clipId;
    onModalClips.push(t);
  });
  onModalClips.map((clip) => {
    if (clip === target) {
      let targetClip = document.querySelector(`[data-clip-id="${clip}"]`);
      showElement(targetClip.querySelector(".store-btn"));
    }
  });
}

function isOverlappingClip(clipId, dest) {
  dest.map((e) => {
    if (e.clipId === dest) return true;
  });
  return false;
}

function handleWatchedClip(target) {
  let clip = target.closest(".main-youtube-clip");
  let clipInfo = manufactureForStoreClip(clip);
  let watchedClips = getItem(LOCAL_STORAGE_KEYS.WATECHED_CLIP);
  if (!isOverlappingClip(clipInfo.clipId, watchedClips)) {
    handleDeleteSavedClip(target);
    storeClipInfo(clipInfo, LOCAL_STORAGE_KEYS.WATECHED_CLIP);
    renderClipToMain(watchedClips, $watchedClipWrapper);
    renderSnackbar("watch");
  }
}

function handleEmojiEvent(target) {
  switch (target.dataset.emojiType) {
    case "delete":
      if (confirm("저장된 클립을 삭제하기겠습니까?")) {
        handleDeleteSavedClip(target);
        renderSnackbar("remove");
      }
      break;
    case "watch":
      handleWatchedClip(target);
      break;
  }
}

export function initEmojisEvents() {
  $savedClipWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("emojis")) {
      console.log(e);
      handleEmojiEvent(e.target);
    }
  });
}
