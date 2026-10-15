import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export let lenis = null;

export function createSmoothScroll() {
  lenis = new Lenis({
    autoRaf: false,
    duration: 1.1,
    syncTouch: false,
    anchors: true,
    prevent: (node) => Boolean(node.closest(".cookie-modal-backdrop")),
  });
  const update = (time) => lenis.raf(time * 1000);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(update);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(update);
    lenis.destroy();
    lenis = null;
  };
}
