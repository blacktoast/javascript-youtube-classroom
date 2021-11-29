import { $ } from "../utils/dom.js";

const $youtubeClipWrapper = $(".youtube-search-modal__clip");

function htmlYoutubeClip({ videoId, channelId, title }) {
  console.log(videoId, channelId, title);
  return `<article class="clip youtube-search-modal-clip">
  <div
    class="preview-container"
    data-js="youtube-search-modal-clip__preview"
  >
    <iframe
      width="100%"
      height="118"
      src="https://www.youtube.com/embed/${videoId}"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <div class="content-container pt-2 px-1">
    <h3>${title}</h3>
    <div>
      <a
        href="https://www.youtube.com/channel/${channelId}"
        target="_blank"
        class="channel-name mt-1"
      >
        메이커준
      </a>
      <div class="meta">
        <p>2021년 3월 2일</p>
      </div>
      <div class="d-flex justify-end">
        <button class="btn">⬇️ 저장</button>
      </div>
    </div>
  </div>
</article>`;
}

export function renderYoutubeClip(videoData) {
  let template = "";
  videoData.map((item) => {
    template += htmlYoutubeClip(item);
  });
  return new Promise(function (resolve, reject) {
    resolve($youtubeClipWrapper.insertAdjacentHTML("afterbegin", template));
  });
}
function renderEmptyResult() {}
