import { MAX_SEARCH_NUMBER, YOUTUBE } from "./constant.js";
import { API_KEY } from "./env.js";

export function makeQueryString(search, base, nextPageToken) {
  let query = "";
  let inputQuery = makeSearchQueryProperty(search, nextPageToken);
  Object.entries(inputQuery).forEach((q) => {
    query += `&${q[0]}=${q[1]}`;
  });
  return base + query;
}

function makeSearchQueryProperty(search, nextPageToken) {
  let result = {
    q: encodeURI(search),
    type: "video",
    maxResults: YOUTUBE.MAX_NUMBER,
    pageToken: nextPageToken || "",
    key: API_KEY,
  };
  return result;
}
