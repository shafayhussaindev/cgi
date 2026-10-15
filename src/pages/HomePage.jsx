// HomePage is the first page visitors see ("/").
// It has a full-screen hero and short previews of the other pages.

import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button.jsx";
import Icon from "../components/Icon.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import LinkedInBand from "../components/LinkedInBand.jsx";
import { site, home, shift, whatWeDo, focusAreas } from "../data/content.js";

function HomePage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = site.name;
  }, []);

  return (
    <>
      {/* 1. Hero: a fixed background photo behind the scrolling heading */}
      <section className="home-hero" style={{ "--hero-image": "url(" + home.hero.image + ")" }}>
        {/* The photo stays fixed as the hero content scrolls away */}
        <div className="home-hero-photo" aria-hidden="true"></div>
        <div className="container">
          <span className="eyebrow eyebrow-light">{home.hero.eyebrow}</span>
          <h1 className="home-hero-title">{home.hero.title}</h1>
          <p className="home-hero-text">{home.hero.text}</p>
          <div className="button-row">
            <Button text={home.hero.linkedinButton} href={site.linkedinUrl} variant="light" showArrow={true} />
            <Button text={home.hero.exploreButton} to="/the-shift" variant="glass" showArrow={true} />
          </div>
        </div>
      </section>

      {/* 2. Preview of The Shift (white): one card per force */}
      <section className="section-white">
        <div className="container">
          <div className="header-row">
            <SectionHeader eyebrow={home.shiftPreview.eyebrow} title={home.shiftPreview.title} />
            <Link to="/the-shift" className="text-link">
              {home.shiftPreview.linkText} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="force-grid force-grid-4">
            {shift.forces.map((force) => (
              <Link key={force.number} to={"/the-shift#force-" + force.number} className="force-card">
                {force.image && <img src={force.image} alt="" className="force-card-image" loading="lazy" />}
                <div className="force-card-content">
                  {/* Icon on the left; the arrow on the right appears on hover */}
                  <div className="force-card-top">
                    <span className="force-card-icon">
                      <Icon name={force.icon} />
                    </span>
                    <Icon name="arrow-up-right" className="force-card-arrow" />
                  </div>
                  <h3 className="force-card-title">{force.title}</h3>
                  <p className="force-card-text">{force.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Preview of What We Do (ice): heading on the left, text on the right */}
      <section className="section-ice">
        <div className="container split">
          <SectionHeader eyebrow={home.whatWeDoPreview.eyebrow} title={home.whatWeDoPreview.title} />
          <div>
            <p className="lead">{whatWeDo.paragraphs[0]}</p>
            <div className="button-row">
              <Button text={home.whatWeDoPreview.buttonText} to="/what-we-do" variant="glass" showArrow={true} />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Preview of Focus Areas (white): one chip per area */}
      <section className="section-white">
        <div className="container">
          <div className="header-row">
            <SectionHeader eyebrow={home.focusPreview.eyebrow} title={home.focusPreview.title} />
            <Link to="/focus-areas" className="text-link">
              {home.focusPreview.linkText} <span aria-hidden="true">→</span>
            </Link>
          </div>

          <ul className="chip-list">
            {focusAreas.areas.map((area) => (
              <li key={area.number}>
                <Link to={"/focus-areas#area-" + area.number} className="chip">
                  <span className="item-number">{area.number}</span>
                  {area.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. LinkedIn band */}
      <LinkedInBand />
    </>
  );
}

export default HomePage;
