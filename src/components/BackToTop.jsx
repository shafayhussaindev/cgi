// BackToTop is the round liquid glass button in the bottom-right corner.
// It appears once you have scrolled down a little and takes you back to the top.

import { useState, useEffect } from "react";
import { lenis } from "../smoothScroll.js";
import Icon from "./Icon.jsx";

// How far down (in pixels) the page must be scrolled before the button appears
const SHOW_AFTER = 600;

function BackToTop() {
  // true when the page is scrolled far enough to show the button
  const [isVisible, setIsVisible] = useState(false);

  // Watch the scroll position
  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > SHOW_AFTER);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Stop listening when the button is removed
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    // Glide to the top. With smooth scrolling on, Lenis does it;
    // otherwise the browser does, instantly for people who prefer less motion.
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      const lessMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: lessMotion ? "auto" : "smooth" });
    }

    // Keyboard users: move focus to the top too, so it is not lost when this button hides
    document.querySelector(".navbar-logo").focus({ preventScroll: true });
  }

  let className = "back-to-top";
  if (isVisible) {
    className = "back-to-top is-visible";
  }

  return (
    <button type="button" className={className} onClick={scrollToTop} aria-label="Back to top">
      <Icon name="arrow-up" />
    </button>
  );
}

export default BackToTop;
