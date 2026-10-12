// HomeHero is the full-screen opening section of the Home page.
// A slowly rotating globe video plays behind the heading.
//
// The video's last frame does not match its first, so a normal loop "jumps".
// To hide that, there are TWO copies of the video. Just before one copy ends,
// the other starts from the beginning and they cross-fade.

import { useEffect } from "react";
import GlassButton from "./GlassButton.jsx";
import { site, home } from "../data/content.js";
import "./HomeHero.css";

// How many seconds the cross-fade takes (must match the CSS transition)
const FADE = 0.9;

function HomeHero() {
  useEffect(() => {
    const videoA = document.getElementById("hero-video-a");
    const videoB = document.getElementById("hero-video-b");
    if (!videoA || !videoB) {
      return;
    }

    // Browsers only autoplay silent videos. React does not always pass "muted"
    // through to the page, so we set it here to be sure.
    videoA.muted = true;
    videoB.muted = true;

    // People who prefer less motion see a still first frame instead
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      videoA.pause();
      videoB.pause();
      try {
        videoA.currentTime = 0;
      } catch {
        // Some browsers refuse before the video has loaded; the poster shows instead
      }
      return;
    }

    // Start a video, ignoring browsers that block autoplay
    function play(video) {
      const promise = video.play();
      if (promise) {
        promise.catch(() => {});
      }
    }

    let current = videoA;
    let next = videoB;
    let swapping = false;
    let timer = null;

    // Runs several times a second while a video plays
    function checkTime() {
      if (swapping || !current.duration) {
        return;
      }
      // Wait until the current copy is almost at its end
      if (current.duration - current.currentTime > FADE) {
        return;
      }

      // Start the other copy from the beginning and fade it in
      swapping = true;
      const finished = current;
      next.currentTime = 0;
      play(next);
      next.classList.add("is-active");
      finished.classList.remove("is-active");
      current = next;
      next = finished;

      // When the fade is done, stop and rewind the old copy
      timer = setTimeout(() => {
        finished.pause();
        finished.currentTime = 0;
        swapping = false;
      }, FADE * 1000 + 100);
    }

    play(videoA);
    videoA.addEventListener("timeupdate", checkTime);
    videoB.addEventListener("timeupdate", checkTime);

    // Clean up when leaving the Home page
    return () => {
      clearTimeout(timer);
      videoA.removeEventListener("timeupdate", checkTime);
      videoB.removeEventListener("timeupdate", checkTime);
    };
  }, []);

  return (
    <section className="home-hero">
      {/* Background video (decorative, so screen readers skip it) */}
      <div className="home-hero-bg" aria-hidden="true" data-parallax="0.35">
        <video id="hero-video-a" className="home-hero-video is-active" autoPlay muted loop playsInline
          preload="auto" disablePictureInPicture poster={home.hero.posterUrl}>
          <source src={home.hero.videoUrl} type="video/mp4" />
        </video>
        <video id="hero-video-b" className="home-hero-video" muted loop playsInline
          preload="auto" disablePictureInPicture poster={home.hero.posterUrl}>
          <source src={home.hero.videoUrl} type="video/mp4" />
        </video>
      </div>

      <div className="home-hero-inner">
        <span className="eyebrow eyebrow-white home-hero-eyebrow">{home.hero.eyebrow}</span>

        {/* Each line sits in its own "window" so it can rise into view */}
        <h1 className="home-hero-title">
          {home.hero.titleLines.map((line) => (
            <span key={line} className="ln">
              <span className="ln-i">{line}</span>
            </span>
          ))}
        </h1>

        <p className="home-hero-text">{home.hero.text}</p>

        <div className="home-hero-buttons">
          <GlassButton text={home.hero.linkedinButton} href={site.linkedinUrl} showArrow={true} />
          <GlassButton text={home.hero.exploreButton} to="/the-shift" variant="glass-light" showArrow={true} />
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
