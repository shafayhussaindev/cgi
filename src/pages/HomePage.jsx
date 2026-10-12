// HomePage is the first page visitors see ("/").
// It has a full-screen video hero and short previews of the other pages.

import { useEffect } from "react";
import { Link } from "react-router-dom";
import GlassButton from "../components/GlassButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import LinkedInBand from "../components/LinkedInBand.jsx";
import HomeHero from "../components/HomeHero.jsx";
import { site, home, shift, whatWeDo, focusAreas } from "../data/content.js";

function HomePage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = site.name;
  }, []);

  return (
    <>
      {/* 1. Full-screen video hero */}
      <HomeHero />

      {/* 2. Preview of The Shift (white, fades into the ice section below) */}
      <section className="section-white home-blend-to-ice">
        <div className="container">
          <SectionHeader eyebrow={home.shiftPreview.eyebrow} title={home.shiftPreview.title} />
          <div className="home-force-grid">
            {shift.forces.map((force) => (
              <div key={force.number} className="home-force-card glass-card" data-tilt>
                <span className="item-number">{force.number}</span>
                <h3 className="home-force-title">{force.title}</h3>
              </div>
            ))}
          </div>
          <Link to="/the-shift" className="home-text-link">
            {home.shiftPreview.linkText} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 3. Preview of What We Do (ice) */}
      <section className="section-ice home-blend-to-white">
        <div className="container">
          {/* Glass box: lifts and its text ripples when hovered */}
          <div className="glass-box">
            <SectionHeader
              eyebrow={home.whatWeDoPreview.eyebrow}
              title={home.whatWeDoPreview.title}
              intro={whatWeDo.paragraphs[0]}
            />
            <GlassButton text={home.whatWeDoPreview.buttonText} to="/what-we-do" showArrow={true} />
          </div>
        </div>
      </section>

      {/* 4. Preview of Focus Areas (white) */}
      <section className="section-white">
        <div className="container">
          <SectionHeader eyebrow={home.focusPreview.eyebrow} title={home.focusPreview.title} />
          {/* Marquee: the chips scroll sideways forever. The list is shown twice
              in a row so the loop is seamless; the copy is hidden from screen readers
              and keyboard users so they only meet each link once. */}
          <div className="home-marquee">
            <div className="home-marquee-track">
              {[false, true].map((isCopy) => (
                <ul key={String(isCopy)} className="home-chip-list" aria-hidden={isCopy}>
                  {focusAreas.areas.map((area) => (
                    <li key={area.number}>
                      <Link to="/focus-areas" className="home-chip" tabIndex={isCopy ? -1 : undefined}>
                        <span className="home-chip-number">{area.number}</span>
                        {area.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
          <Link to="/focus-areas" className="home-text-link">
            {home.focusPreview.linkText} <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* 5. LinkedIn band */}
      <LinkedInBand />
    </>
  );
}

export default HomePage;
