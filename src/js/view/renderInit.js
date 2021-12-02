import { $ } from "../utils/dom.js";
import { getRecentKeywords } from "../utils/store.js";
const $recentKeyword = $(".youtube-search-modal__recentKewords");

function htmlRecentKeywords(key) {
  let template = "";
  console.log(key);
  key.forEach((e) => {
    template += `<a class="chip">${e}</a>`;
  });
  console.log(template);
  return template;
}

function initRenderRecentKeywords() {
  let keys = getRecentKeywords();
  let template = htmlRecentKeywords(keys);
  console.log(template);
  $recentKeyword.insertAdjacentHTML("afterend", template);
}

function initRenderModal() {}

export function renderInit() {
  initRenderRecentKeywords();
}
