// MotionEffects adds two small effects to the whole site. It shows nothing on screen.
//
// 1. Parallax: any element with data-parallax="0.3" moves at a different speed
//    from the page when you scroll (bigger number = more movement).
// 2. Tilt: any element with data-tilt leans toward the mouse when hovered.
//
// Both are switched off for people who prefer less motion, and tilt is off on
// touch screens (there is no mouse to follow).

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// How far a card can lean, in degrees
const MAX_TILT = 6;

function MotionEffects() {
  // Re-run when the page changes, so new images and cards are picked up
  const location = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // ---------- Parallax ----------
    const layers = document.querySelectorAll("[data-parallax]");
    let frame = 0;

    function updateParallax() {
      frame = 0;
      const middle = window.innerHeight / 2;
      layers.forEach((layer) => {
        // Measure the parent, because the layer itself is the one moving
        const box = layer.parentElement.getBoundingClientRect();
        let distance = box.top + box.height / 2 - middle;

        // Stop counting once the box is off screen, so the movement stays small
        const limit = middle + box.height / 2;
        if (distance > limit) {
          distance = limit;
        }
        if (distance < -limit) {
          distance = -limit;
        }
        const speed = parseFloat(layer.dataset.parallax);
        layer.style.setProperty("--parallax-y", (-distance * speed).toFixed(1) + "px");
      });
    }

    // Only update once per screen refresh, however fast the scroll events arrive
    function onScroll() {
      if (!frame) {
        frame = requestAnimationFrame(updateParallax);
      }
    }

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // ---------- Tilt ----------
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cards = canHover ? document.querySelectorAll("[data-tilt]") : [];

    function onMove(event) {
      const card = event.currentTarget;
      const box = card.getBoundingClientRect();
      // Mouse position inside the card, from -0.5 (left/top) to 0.5 (right/bottom)
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      card.style.setProperty("--tilt-x", (-y * MAX_TILT).toFixed(2) + "deg");
      card.style.setProperty("--tilt-y", (x * MAX_TILT).toFixed(2) + "deg");
    }

    function onLeave(event) {
      event.currentTarget.style.setProperty("--tilt-x", "0deg");
      event.currentTarget.style.setProperty("--tilt-y", "0deg");
    }

    cards.forEach((card) => {
      card.addEventListener("pointermove", onMove);
      card.addEventListener("pointerleave", onLeave);
    });

    // Clean up before the next page
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cards.forEach((card) => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
    };
  }, [location.pathname]);

  return null;
}

export default MotionEffects;
