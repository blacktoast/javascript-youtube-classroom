import { LOCAL_STORAGE_KEYS } from './constant.js';

export function setItem(key, input) {
	return localStorage.setItem(key, JSON.stringify(input));
}

export function getItem(key) {
	return JSON.parse(localStorage.getItem(key)) || [];
}

export function getRecentKeywords() {
	let keywords = JSON.parse(getItem(LOCAL_STORAGE_KEYS.RECENT_KEYWORD)) || [];
	return keywords;
}
