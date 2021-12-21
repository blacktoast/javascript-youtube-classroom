import { LOCAL_STORAGE_KEYS } from '../utils/constant.js';
import { $ } from '../utils/dom.js';
import { hideScroll, showScroll } from '../utils/setAtribute.js';
import { getItem } from '../utils/store.js';
import { renderClipToMain } from '../view/renderMainClip.js';
import { initEmojisEvents } from './onMainClipEvents.js';

const $body = document.querySelector('body');
const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $savedClipWrapper = $(".main-savedClip-wrapper");
const $mainNav=$(".main-nav__btn");

const onModalShow = () => {
	$modal.classList.add('open');
	hideScroll($body);
};
const onModalClose = () => {
	forRenderSavedClipOnMain();
	$modal.classList.remove('open');
	showScroll($body);
};

function forRenderSavedClipOnMain() {
	let savedClips = getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO);
	renderClipToMain(savedClips,$savedClipWrapper);
}

export function initEvents() {
	$searchButton.addEventListener('click', onModalShow);
	$modalClose.addEventListener('click', onModalClose);
	initEmojisEvents();
}
