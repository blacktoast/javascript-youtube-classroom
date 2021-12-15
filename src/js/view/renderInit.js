import { LOCAL_STORAGE_KEYS } from '../utils/constant.js';
import { $ } from '../utils/dom.js';
import { getItem, getRecentKeywords } from '../utils/store.js';
import { renderClipToMain } from './renderMainSavedClip.js';
import { renderStoredClipNumber } from './renderYoutubeClip.js';
const $recentKeyword = $('.youtube-search-modal__recentKewords');
const $savedClipWrapper = $(".main-savedClip-wrapper");

function htmlRecentKeywords(key) {
	let template = '';
	key.forEach(e => {
		template += `<a class="chip">${e}</a>`;
	});
	console.log(template);
	return template;
}

function initRenderRecentKeywords() {
	let keys = getItem(LOCAL_STORAGE_KEYS.RECENT_KEYWORD) || [];
	console.log(keys);
	let template = htmlRecentKeywords(keys);
	console.log(template);
	$recentKeyword.insertAdjacentHTML('afterend', template);
}

function initRenderModal() {}

export function renderInit() {
	initRenderRecentKeywords();
	renderStoredClipNumber(getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID).length || '');
	renderClipToMain(getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO) || '',$savedClipWrapper);
}
