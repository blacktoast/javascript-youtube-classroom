import { $ } from '../utils/dom.js';
/**
 * [] 휴지통 눌렀을때 저장된 클립 삭제
 * [] 체크 이모지 눌렀을때 본 클립으로 이동?
 */

const $savedClipWrapper = $('.main-savedClip-wrapper');

function handleDeleteSavedClip(target) {
	console.log(target);
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
