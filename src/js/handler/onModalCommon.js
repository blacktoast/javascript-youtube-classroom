import { LOCAL_STORAGE_KEYS } from "../utils/constant.js";
import { getItem, setItem } from "../utils/store.js";

export function storeNextPageToken(input) {
  console.log(input.nextPageToken);
  localStorage.setItem(LOCAL_STORAGE_KEYS.NEXTPAGE_KEY, input.nextPageToken);
}

export function getYoutubeClipInfo(youtubeSearchData) {
  let result = [...youtubeSearchData.items].map((e) => {
    let videoInfo = {
      clipId: e.id.videoId,
      channelId: e.snippet.channelId,
      title: e.snippet.title,
      channelName: e.snippet.channelTitle,
      time: e.snippet.publishTime.slice(0, 10).split("-"),
      overlapping: false,
    };
    return videoInfo;
  });
  console.log(result);
  return result;
}
export function manufactureForStoreClip(target) {
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

export function storeClipInfo(clipInfo, key) {
  let storedClipInfo = getItem(key) || [];
  console.log(storedClipInfo);
  storedClipInfo.push(clipInfo);
  setItem(key, storedClipInfo);
  return;
}

export function storeTempClipInfo() {}
