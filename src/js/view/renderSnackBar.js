import { $ } from "../utils/dom.js";
import { hideElement, showElement } from "../utils/setAtribute.js";

const $saveSnackBar = $(".snackBar-saveClip");

const onSnackbarShow = () => {
  $saveSnackBar.classList.add("open");
  showElement($saveSnackBar);
};
const onSnackbarHide = () => {
  $saveSnackBar.classList.remove("open");
  hideElement($saveSnackBar);
};
function htmlSnackbar(string) {
  return ` <div class="snackBar">
    <div class="snack-inner">
      <p>${string}</p>
    </div>
  </div>`;
}

export function renderSnackbar() {
  onSnackbarShow();
  setTimeout(onSnackbarHide,1000);
  
}
