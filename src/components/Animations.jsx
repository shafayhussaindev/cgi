// Animations adds the scroll effects to the whole site, using GSAP (gsap.com). It shows nothing on screen.
//
// 1. Smooth scrolling: the page glides to a stop instead of jumping (ScrollSmoother).
//    It moves everything inside #smooth-wrapper / #smooth-content (see App.jsx).
// 2. Parallax: the hero photo and the card photos move a little slower than the page.
// 3. Reveal on scroll: headings rise into view line by line, and other content
//    fades up as it scrolls into view, a few items at a time.
//
// Everything is switched off for people who prefer less motion, and smooth
// scrolling is off on touch screens (phones already scroll smoothly).
// Only "transform" and "opacity" are animated, because browsers can draw those cheaply.

import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// ON/OFF SWITCH: false pauses every effect in this file (the code is kept).
// Change it back to true to turn smooth scrolling, parallax and reveals on again.
const ANIMATIONS_ON = false;

// Only animate when the visitor has not asked for less motion
const MOTION_OK = "(prefers-reduced-motion: no-preference)";

// Headings that rise into view line by line
const HEADINGS = ".home-hero-title, .section-header-title, .linkedin-band-title, .legal-title";

// Everything else that fades up as it scrolls into view.
// To animate something new, add its class here.
const FADE_UPS = [
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

  // Smooth scrolling: set up once for the whole site.
  // (useLayoutEffect runs before the page is drawn, so nothing flickers.)
  useLayoutEffect(() => {
    if (!ANIMATIONS_ON) {
      return;
    }

    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      ScrollSmoother.create({
        smooth: 1, // seconds the page takes to catch up with the scroll wheel
        effects: true, // allows the parallax below
        smoothTouch: false, // phones keep their own scrolling
      });
    });

    // When the web font has loaded the text may change height, so measure again
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => media.revert();
  }, []);

  // Parallax and reveals: set up again every time a new page is shown
  useLayoutEffect(() => {
    if (!ANIMATIONS_ON) {
      return;
    }

    const media = gsap.matchMedia();
    media.add(MOTION_OK, () => {
      // ---------- Parallax ----------
      const smoother = ScrollSmoother.get();
      if (smoother) {
        // The hero photo moves at 70% of the scroll speed
        smoother.effects(".home-hero-photo", { speed: 0.7 });
        // Card photos are taller than their card; "auto" uses that spare room
        smoother.effects(".force-card-image", { speed: "auto" });
      }

      // ---------- Headings: each line slides up from behind a mask ----------
      gsap.utils.toArray(HEADINGS).forEach((heading) => {
        SplitText.create(heading, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
          autoSplit: true, // splits again when the font loads or the screen is resized
          onSplit(split) {
            return gsap.from(split.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "power4.out",
              stagger: 0.08,
              scrollTrigger: { trigger: heading, start: "top 90%", once: true },
            });
          },
        });
      });

      // ---------- Everything else: fade up, a few at a time ----------
      const all = gsap.utils.toArray(FADE_UPS);
      // Skip anything inside another item that already fades (e.g. labels inside a panel)
      const items = all.filter((item) => !all.some((other) => other !== item && other.contains(item)));

      // Start hidden and a little lower. Opacity (not "hidden") keeps links reachable by keyboard.
      gsap.set(items, { opacity: 0, y: 32 });

      // Items that come into view together rise one after another
      ScrollTrigger.batch(items, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.08,
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
