// ScrollToTop runs every time the page changes.
// Normally it jumps to the top. If the address has a "#part" (e.g. /the-shift#force-02),
// it scrolls to that part of the page instead. It shows nothing on screen.
// Reset Lenis as well so pending scroll momentum cannot carry into a new page.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { lenis } from "../smoothScroll.js";

// Space to leave above a "#part": the floating navbar plus a small gap
const SPACE_FOR_NAVBAR = 104;

function ScrollToTop() {
  // The current address, e.g. "/contact" or "/the-shift#force-02"
  const location = useLocation();

  useEffect(() => {
    lenis?.resize();

    // If there is a #part, find the element with that id and jump to it
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: -SPACE_FOR_NAVBAR, immediate: true });
        } else {
          window.scrollTo(0, window.scrollY + target.getBoundingClientRect().top - SPACE_FOR_NAVBAR);
        }
        return;
      }
    }

    // Otherwise go to the top of the page
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default ScrollToTop;
