import { initEvents } from "./handler/onMainEvents.js";
import { initClipStoreEvents } from "./handler/onModalSaveClip.js";
import { initSearchEvent } from "./handler/searchYoutube.js";
import { renderInit } from "./view/renderInit.js";
console.log("test");
console.log("t");
function init() {
  initEvents();
  initSearchEvent();
  initClipStoreEvents();
  renderInit();
}

init();
