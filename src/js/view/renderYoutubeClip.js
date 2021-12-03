import { initScrollEvents } from "../handler/onModalScroll.js";
import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";

const $youtubeClipWrapper = $(".youtube-search-modal__clip");
const $youtubeModalInner = $(".youtube-search-modal__inner");
const $youtubeNotFound = $(".youtube-search-modal__not-found");
const $recentKeyword = $(".youtube-search-modal__recentKewords");
const $storedClipNumber = $(".youtube-search-modal__storeVideoNumber");

function htmlYoutubeClip(
  { clipId, channelId, title, channelName, time, overlapping },
  index
) {
  return `<article class="clip youtube-search-modal-clip" data-clip-id="${index}">
  <div
    class="preview-container"
    data-js="youtube-search-modal-clip__preview"
  >
    <iframe
      width="100%"
      height="118"
      src="https://www.youtube-nocookie.com/embed/${clipId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3>${title}</h3>
    <div>
      <a
        href="https://www.youtube-nocookie.com/channel/${channelId}"
        target="_blank"
        class="channel-name mt-1"
      >
        ${channelName}
      </a>
      <div class="meta">
        <p>${time[0]}년 ${time[1]}월 ${time[2]}일</p>
      </div>
      <div class="d-flex justify-end">
        <button class="btn store-btn ${
          overlapping ? "d-none" : ""
        }">⬇️ 저장</button>
      </div>
    </div>
  </div>
</article>`;
}

function htmlRecentKeywords(keywords) {
  let template = "";
  console.log(keywords);
  template = `<a class="chip">${keywords[keywords.length - 1]}</a>`;
  return template;
}

function renderRecentKeywords(keywords) {
  let template = htmlRecentKeywords(keywords);
  if (keywords.length > 2) {
    let firstKeywords = document.querySelectorAll(".chip");
    firstKeywords = firstKeywords[firstKeywords.length - 1];
    firstKeywords.remove();
  }
  $recentKeyword.insertAdjacentHTML("afterend", template);
}

export function renderYoutubeClip(videoData, keywords) {
  let template = "";
  console.log(videoData);
  videoData.map((item, i) => {
    template += htmlYoutubeClip(item, i);
  });

  $youtubeClipWrapper.innerHTML = template;
  renderRecentKeywords(keywords);

  // hideScroll($youtubeModalInner);
  //setTimeout(() => showScroll($youtubeModalInner), 1000);
}
export function renderStoredClipNumber(num) {
  $storedClipNumber.innerText = `저장된 영상 갯수: ${num.toString()} 개`;
}

export function renderClipByScrollDown(videoData) {
  let template = "";
  videoData.map((item, i) => {
    template += htmlYoutubeClip(item, i);
  });
  $youtubeClipWrapper.insertAdjacentHTML("beforeend", template);
  initScrollEvents();
}

export function renderOnMainSavedClip(savedClips) {
  
}
export function renderNotfound() {
  hideElement($youtubeClipWrapper);
  showElement($youtubeNotFound);
}
