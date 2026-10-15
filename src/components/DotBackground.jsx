import { useEffect, useRef } from "react";
import { gsap } from "gsap";

function DotBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    const section = canvas.parentElement;
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)");
    const pointer = { x: 0, y: 0, strength: 0 };
    const color = getComputedStyle(section).getPropertyValue("--blue").trim();
    let width = 0;
    let height = 0;

    function draw() {
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;
      for (let y = 12; y < height; y += 24) {
        for (let x = 12; x < width; x += 24) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / 150);
          const influence = falloff * falloff * pointer.strength;
          context.globalAlpha = 0.16 + influence * 0.4;
          context.beginPath();
          context.arc(x + dx * influence * 0.08, y + dy * influence * 0.08, 1 + influence * 0.5, 0, Math.PI * 2);
          context.fill();
        }
      }
    }

    function resize() {
      width = section.clientWidth;
      height = section.clientHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    }

    function move(event) {
      if (!motion.matches) return;
      const bounds = section.getBoundingClientRect();
      // Start at the pointer instead of sweeping across the header on entry.
      if (pointer.strength === 0) {
        pointer.x = event.clientX - bounds.left;
        pointer.y = event.clientY - bounds.top;
      }
      gsap.to(pointer, {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
        strength: 1,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
        onUpdate: draw,
      });
    }

    function reset() {
      gsap.killTweensOf(pointer);
      if (!motion.matches) {
        pointer.strength = 0;
        draw();
        return;
      }
      gsap.to(pointer, { strength: 0, duration: 0.5, overwrite: true, onUpdate: draw });
    }

    const observer = new ResizeObserver(resize);
    observer.observe(section);
    resize();
    section.addEventListener("pointermove", move, { passive: true });
    section.addEventListener("pointerleave", reset);
    motion.addEventListener("change", reset);

    return () => {
      observer.disconnect();
      section.removeEventListener("pointermove", move);
      section.removeEventListener("pointerleave", reset);
      motion.removeEventListener("change", reset);
      gsap.killTweensOf(pointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-background" aria-hidden="true" />;
}

export default DotBackground;
