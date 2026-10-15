// Animations adds the scroll effects to the whole site, using GSAP (gsap.com). It shows nothing on screen.
//
// 1. Lenis smooth scrolling, driven by GSAP's ticker.
// 2. Parallax: the card photos move a little slower than the page.
// 3. Reveal on scroll: content fades up gently, once per page visit.
//
// Everything is switched off for people who prefer less motion, and smooth
// scrolling is off on touch screens (phones already scroll smoothly).
// Only "transform" and "opacity" are animated, because browsers can draw those cheaply.

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createSmoothScroll } from "../smoothScroll.js";

gsap.registerPlugin(ScrollTrigger);

// ON/OFF SWITCH: false pauses reveals; smooth scrolling and card parallax stay enabled.
const ANIMATIONS_ON = true;

// Only animate when the visitor has not asked for less motion
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

// Everything else that fades up as it scrolls into view.
// To animate something new, add its class here.
const FADE_UPS = [
  ".home-hero-title",
  ".section-header-title",
  ".linkedin-band-title",
  ".legal-title",
  ".eyebrow",
  ".lead",
  ".home-hero-text",
  ".button-row",
  ".header-row > .text-link",
  ".force-card",
  ".chip",
  ".focus-card",
  ".what-panel",
  ".contact-card",
  ".contact-linkedin",
  ".legal-updated",
  ".legal-notice",
  ".legal-section",
  ".linkedin-band-text",
  ".linkedin-band .btn",
  ".footer-glass",
].join(", ");

function Animations() {
  const location = useLocation();

  // Move only the photos inside their existing clipped card frames.
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      gsap.utils.toArray(".force-card-image").forEach((image) => {
        gsap.fromTo(image, { yPercent: -8 }, {
          yPercent: 8,
          ease: "none",
          scrollTrigger: {
            trigger: image.closest(".force-card"),
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    });

    return () => media.revert();
  }, [location.pathname]);

  // Smooth scrolling: set up once for the whole site.
  // (useLayoutEffect runs before the page is drawn, so nothing flickers.)
  useLayoutEffect(() => {
    const media = gsap.matchMedia();
    media.add(MOTION_OK, createSmoothScroll);

    // When the web font has loaded the text may change height, so measure again
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => media.revert();
  }, []);

  // Reveals: set up again every time a new page is shown
  useLayoutEffect(() => {
    if (!ANIMATIONS_ON) {
      return;
    }

    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      // ---------- Everything else: fade up, a few at a time ----------
      const all = gsap.utils.toArray(FADE_UPS);
      // Skip anything inside another item that already fades (e.g. labels inside a panel)
      const items = all.filter((item) => !all.some((other) => other !== item && other.contains(item)));

      // Start hidden and a little lower. Opacity (not "hidden") keeps links reachable by keyboard.
      gsap.set(items, { opacity: 0, y: 16 });

      // Items that come into view together rise one after another
      ScrollTrigger.batch(items, {
        start: "top 90%",
        interval: 0.08,
        once: true,
        onEnter: (batch) =>
          // Preserve document order so each row of cards reveals left to right.
          gsap.to(items.filter((item) => batch.includes(item)), {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.1,
            overwrite: true,
          }),
      });

      // The new page has a different height, so measure everything again
      ScrollTrigger.refresh();
    });

    // Leaving the page: undo everything so the next page starts clean
    return () => media.revert();
  }, [location.pathname]);

  return null;
}

export default Animations;
