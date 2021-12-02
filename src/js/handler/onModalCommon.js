import { LOCAL_STORAGE_KEYS } from "../utils/constant.js";

export function storeNextPageToken(input) {
  console.log(input.nextPageToken);
  localStorage.setItem(LOCAL_STORAGE_KEYS.NEXTPAGE_KEY, input.nextPageToken);
}

export function getYoutubeClipInfo(youtubeSearchData) {
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
