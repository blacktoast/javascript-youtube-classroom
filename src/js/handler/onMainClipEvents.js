import { $ } from "../utils/dom.js";

const $savedClipWrapper = $(".main-savedClip-wrapper");

function handleDeleteSavedClip(target){
  console.log(target)

}

function handleEmojiEvent(target) {
 switch (target.dataset.emojiType){
   case "delete":
     handleDeleteSavedClip(target)
     break;
     case "watch":
     handleWatchedClip(target)
    break;
 }
}

export function initEmojisEvents() {
  $savedClipWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("emojis")) {
      handleEmojiEvent(e.target);
    }
  });
}
