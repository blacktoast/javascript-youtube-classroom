import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";

const $savedClipWrapper = $(".main-savedClip-wrapper");
const $savedClipNotfound = $(".main-savedClip__not-found");

function htmlSavedYoutubeClip(
  { clipId, channelId, title, channelName, time },
  index
) {
  console.log(time);
  return `<article class="clip main-youtube-savedClip" data-clip-id="${index}">
  <div
    class="preview-container"
    data-js="youtube-main-savedClip__preview"
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
        href="https://www.youtube.com/channel/${channelId}"
        target="_blank"
        class="channel-name mt-1"
      >
        ${channelName}
      </a>
      <div class="meta">
        <p>${time}</p>
      </div>
      <div>
                      <span class="opacity-hover emojis" data-emoji-type="watch">✅</span>
                      <span class="opacity-hover">👍</span>
                      <span class="opacity-hover">💬</span>
                      <span class="opacity-hover emojis" data-emoji-type="delete">🗑️</span>
        </div>
    </div>
  </div>
</article>`;
}

export function renderSavedClipToMain(videoData, keywords) {
  let template = "";
  
    console.log(videoData);
    videoData.map((item, i) => {
      template += htmlSavedYoutubeClip(item, i);
    });
    hideElement($savedClipNotfound);
    $savedClipWrapper.innerHTML = template;
  if(videoData.length===0) {
    showElement($savedClipNotfound);
    
  }
  // hideScroll($youtubeModalInner);
  //setTimeout(() => showScroll($youtubeModalInner), 1000);
}
