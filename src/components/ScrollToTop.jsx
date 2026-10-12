// ScrollToTop runs every time the page changes.
// Normally it jumps to the top. If the address has a "#part" (e.g. /the-shift#force-02),
// it scrolls to that part of the page instead. It shows nothing on screen.
// When smooth scrolling is on (see Animations.jsx), it has to scroll through the
// smoother instead of the browser.

import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// Space to leave above a "#part": the floating navbar plus a small gap
const SPACE_FOR_NAVBAR = 104;

// How far the target is from the top of the page, ignoring the small upward
// slide it may still be waiting to do (the reveal animation in Animations.jsx).
// We measure by hand because the smoother's own measuring is thrown off by the
// cards' moving photos.
function distanceFromTop(target) {
  const page = document.getElementById("smooth-content");
  const pending = gsap.getProperty(target, "y");
  return target.getBoundingClientRect().top - page.getBoundingClientRect().top - pending;
}

function ScrollToTop() {
  // The current address, e.g. "/contact" or "/the-shift#force-02"
  const location = useLocation();

  useEffect(() => {
    // The smooth scroller, or null when it is off (e.g. for people who prefer less motion)
    const smoother = ScrollSmoother.get();

    // If there is a #part, find the element with that id and jump to it
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        if (smoother) {
          smoother.scrollTop(distanceFromTop(target) - SPACE_FOR_NAVBAR);
        } else {
          target.scrollIntoView();
        }
        return;
      }
    }

    // Otherwise go to the top of the page
    if (smoother) {
      smoother.scrollTop(0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  return null;
}

export default ScrollToTop;
