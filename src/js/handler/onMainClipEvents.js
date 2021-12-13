import { LOCAL_STORAGE_KEYS } from '../utils/constant.js';
import { $ } from '../utils/dom.js';
import { getItem, setItem } from '../utils/store.js';
/**
 * [] 휴지통 눌렀을때 저장된 클립 삭제
 * [] 체크 이모지 눌렀을때 본 클립으로 이동?
 */

const $savedClipWrapper = $('.main-savedClip-wrapper');

function handleDeleteSavedClip(target) {
	let clipId = target.closest('.main-youtube-savedClip');
	let clipNumber = clipId.dataset.clipId;
	let storedId = getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID);
	let storedClips = getItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO);
	storedId.splice(clipNumber, 1);
	storedClips.splice(clipNumber, 1);
	setItem(LOCAL_STORAGE_KEYS.STORE_CLIP_INFO, storedClips);
	setItem(LOCAL_STORAGE_KEYS.STORE_CLIP_ID, storedId);
	
}

//
function handleRerenderStoreBtn(target) {
	let $OnMadalClips = document.querySelectorAll('.youtube-search-modal-clip');
	[ ...$OnMadalClips ].map(e => {
		console.log(e.querySelector('.preview-container>iframe').src);
	});
}

function handleEmojiEvent(target) {
	switch (target.dataset.emojiType) {
		case 'delete':
			handleDeleteSavedClip(target);
			break;
		case 'watch':
			handleWatchedClip(target);
			break;
	}
}

export function initEmojisEvents() {
	$savedClipWrapper.addEventListener('click', e => {
		if (e.target.classList.contains('emojis')) {
			handleEmojiEvent(e.target);
		}
	});
}
