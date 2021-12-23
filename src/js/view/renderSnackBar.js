import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";

const $saveSnackBar = $(".snackBar-saveClip");
const $removeSnackBar = $(".snackBar__remove__saveClip");
const $watchSnakBar = $(".snackBar__watch_clip");
const snackbars = [$saveSnackBar, $removeSnackBar, $watchSnakBar];

let id2;
let id = "";
let snackStr = {
  store: 0,
  remove: 1,
  watch: 2,
};
const showSnackbar = (i) => {
  showElement(snackbars[i]);
  id2 = setTimeout(() => snackbars[i].classList.add("open"), 10);
};
const hideSnackBar = (i) => {
  snackbars[i].classList.remove("open");
  id2 = setTimeout(() => hideElement(snackbars[i]), 800);
};

function htmlSnackbar(string) {
  return ` <div class="snackBar">
    <div class="snack-inner">
      <p>${string}</p>
    </div>
  </div>`;
}

export function renderSnackbar(str) {
  if (id) {
    clearTimeout(id);
    clearTimeout(id2);
  }
  showSnackbar(snackStr[str]);
  id = setTimeout(() => hideSnackBar(snackStr[str]), 1000);
}
