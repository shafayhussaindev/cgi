// ScrollToTop runs every time the page changes.
// Normally it jumps to the top. If the address has a "#part" (e.g. /the-shift#force-02),
// it scrolls to that part of the page instead. It shows nothing on screen.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  // The current address, e.g. "/contact" or "/the-shift#force-02"
  const location = useLocation();

  useEffect(() => {
    // If there is a #part, find the element with that id and scroll to it
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    // Otherwise go to the top of the page
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return null;
}

export default ScrollToTop;
