import { $ } from "../utils/dom.js";

const $savedClipWrapper = $(".main-savedClip-wrapper");

function handleEmojiEvent(target) {
  console.log(target);
}

export function initEmojisEvents() {
  $savedClipWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("emojis")) {
      handleEmojiEvent(e.target);
    }
  });
}
