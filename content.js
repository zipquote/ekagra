const HIDE_SELECTORS = [
  'ytd-rich-section-renderer:has(a[href^="/shorts"])',
  'ytd-reel-shelf-renderer',
  'ytd-reel-item-renderer',
  'a[href^="/shorts"]',
  'ytd-mini-guide-entry-renderer:has(a[href^="/shorts"])',
  'ytd-guide-entry-renderer:has(a[href^="/shorts"])',
  'ytd-watch-next-secondary-results-renderer',
  '#secondary #related',
  'ytd-item-section-renderer[section-identifier="related-items"]',
  '#secondary ytd-compact-video-renderer',
  '#secondary ytd-compact-radio-renderer',
  '#secondary ytd-compact-playlist-renderer',
  '#secondary ytd-compact-movie-renderer',
  'ytd-browse[page-subtype="home"] ytd-rich-grid-renderer #contents ytd-rich-item-renderer',
  'ytd-rich-grid-renderer #contents ytd-rich-shelf-renderer',
  'ytd-browse[page-subtype="home"] ytd-shelf-renderer'
];

const style = document.createElement("style");
style.textContent = `
  ${HIDE_SELECTORS.join(",\n  ")} {
    display: none !important;
  }
`;
document.documentElement.appendChild(style);

const clearShortsFromGrid = () => {
  const items = document.querySelectorAll("ytd-rich-item-renderer, ytd-video-renderer, ytd-grid-video-renderer");
  items.forEach((item) => {
    if (item.querySelector('a[href^="/shorts"]')) {
      item.remove();
    }
  });
};

const redirectShortsPage = () => {
  if (location.pathname.startsWith("/shorts")) {
    location.replace("https://www.youtube.com/");
  }
};

const enforceFocusMode = () => {
  redirectShortsPage();
  clearShortsFromGrid();
};

new MutationObserver(enforceFocusMode).observe(document.documentElement, {
  childList: true,
  subtree: true
});

window.addEventListener("yt-navigate-finish", enforceFocusMode);
enforceFocusMode();
