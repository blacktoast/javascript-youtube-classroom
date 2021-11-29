export const showElement = (tag) => {
  tag.classList.remove("d-none");
};
export const hideElement = (tag) => {
  tag.classList.add("d-none");
};

export const hideScroll = (tag) => {
  tag.classList.add("scroll-none");
};
export const showScroll = (tag) => {
  tag.classList.remove("scroll-none");
};
