function searchYoutubeForScrollDown(clips) {
  let options = {
    root: document.querySelector(".youtube-search-modal__inner"),
    rootMargin: "0px",
    threshold: 0.8,
  };
  let io = new IntersectionObserver(async (entries, observer) => {
    if (entries[0].isIntersecting) {
      alert("추가검색");
      let input = getSearchInput();
      console.log(input);
      videoData = await search(makeQueryString(input, BASE_URL, nextPageToken));
      renderYoutubeClip(videoData);
    }
  }, options);
  return io;
}
