import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";

const $saveSnackBar = $(".snackBar-saveClip");
const $removeSnackBar = $(".snackBar__remove__saveClip");
const snackbars = [$saveSnackBar, $removeSnackBar];

let id2;
let id = "";

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
  switch (str) {
    case "store":
      if (id) {
        clearTimeout(id);
        clearTimeout(id2);
      }
      showSnackbar(0);
      id = setTimeout(() => hideSnackBar(0), 1000);
      break;
    case "remove":
      if (id) {
        console.log(id);
        clearTimeout(id);
        clearTimeout(id2);
      }
      showSnackbar(1);
      id = setTimeout(() => hideSnackBar(1), 1000);
      break;
  }
}
