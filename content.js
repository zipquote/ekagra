const HIDE_SELECTORS = ['ytd-rich-section-renderer:has(a[href^="/shorts"])'];
const SHORTS_LINK_SELECTOR = 'a[href^="/shorts"]';
const SHORTS_SECTION_SELECTOR = "ytd-rich-section-renderer";

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

const hideShortsSectionContainers = () => {
  const shortsLinks = document.querySelectorAll(SHORTS_LINK_SELECTOR);
  shortsLinks.forEach((shortsLink) => {
    const sectionContainer = shortsLink.closest(SHORTS_SECTION_SELECTOR);
    if (!sectionContainer || sectionContainer.dataset.ekagraHidden === "true") {
      return;
    }
    sectionContainer.dataset.ekagraHidden = "true";
    sectionContainer.style.setProperty("display", "none", "important");
    sectionContainer.querySelectorAll("*").forEach((childNode) => {
      if (childNode instanceof HTMLElement) {
        childNode.style.setProperty("display", "none", "important");
      }
    });
  });
};

const redirectShortsPage = () => {
  if (location.pathname.startsWith("/shorts")) {
    location.replace("https://www.youtube.com/");
  }
};

const enforceFocusMode = () => {
  redirectShortsPage();
  hideShortsSectionContainers();
  clearShortsFromGrid();
};

new MutationObserver(enforceFocusMode).observe(document.documentElement, {
  childList: true,
  subtree: true
});

window.addEventListener("yt-navigate-finish", enforceFocusMode);
enforceFocusMode();
