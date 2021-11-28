import { MAX_SEARCH_NUMBER, YOUTUBE } from "./constant.js";
import { API_KEY } from "./env.js";

export function makeSearchQuery(search, base) {
  let query = "";
  let inputQuery = makeSearchQueryProperty(search);
  Object.entries(inputQuery).forEach((q) => {
    query += `&${q[0]}=${q[1]}`;
  });
  return base + query;
}
function makeSearchQueryProperty(search) {
  let result = {
    q: encodeURI(search),
    maxResults: YOUTUBE.MAX_NUMBER,
    key: API_KEY,
  };
  return result;
}
