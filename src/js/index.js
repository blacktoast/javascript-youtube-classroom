import { initEvents } from "./handler/onMainEvents.js";
import { initClipStoreEvents } from "./handler/onModalSaveClip.js";
import { initScrollEvents } from "./handler/onModalScroll.js";
import { initSearchEvent } from "./handler/searchYoutube.js";
import { renderInit } from "./view/renderInit.js";

function init() {
  initEvents();
  initSearchEvent();
  initClipStoreEvents();
  renderInit();
}

init();
