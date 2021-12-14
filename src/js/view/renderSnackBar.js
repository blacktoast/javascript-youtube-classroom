import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";

const $saveSnackBar = $(".snackBar-saveClip");
const $removeSnackBar = $(".snackBar__remove__saveClip");
const snackbars = [$saveSnackBar, $removeSnackBar];
const onSnackbarShow = (i) => {
  console.log(snackbars[i]);
  showElement(snackbars[i]);
  setTimeout(() => snackbars[i].classList.add("open"), 10);
};
const onSnackbarHide = (i) => {
  snackbars[i].classList.remove("open");
  setTimeout(() => hideElement(snackbars[i]), 800);
};
function htmlSnackbar(string) {
  return ` <div class="snackBar">
    <div class="snack-inner">
      <p>${string}</p>
    </div>
  </div>`;
}

export function renderSnackbar(str) {
  console.log(str);
  switch (str) {
    case "store":
      onSnackbarShow(0);
      setTimeout(() => onSnackbarHide(0), 1000);
      break;
    case "remove":
      onSnackbarShow(1);
      setTimeout(() => onSnackbarHide(1), 1000);
      break;
  }
}
