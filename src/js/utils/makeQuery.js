import { MAX_SEARCH_NUMBER, YOUTUBE } from "./constant.js";
import { API_KEY } from "./env.js";

export function makeQueryString(inputQuery, base) {
  let query = "";
  Object.entries(inputQuery).forEach((q) => {
    query += `&${q[0]}=${q[1]}`;
  });
  console.log(query);
  return base + query;
}
