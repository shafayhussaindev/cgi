// ShiftPage ("/the-shift") explains the four forces reshaping the industry.

import { useEffect } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import LinkedInBand from "../components/LinkedInBand.jsx";
import Icon from "../components/Icon.jsx";
import DotBackground from "../components/DotBackground.jsx";
import { site, shift } from "../data/content.js";

function ShiftPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "The Shift | " + site.name;
  }, []);

  return (
    <>
      {/* Page header (white) */}
      <section className="section-white page-top dot-header">
        <DotBackground />
        <div className="container">
          <SectionHeader eyebrow={shift.eyebrow} title={shift.title} intro={shift.intro} isPageTitle={true} />
        </div>
      </section>

      {/* The four forces as cards in a 2 x 2 grid (ice) */}
      <section className="section-ice">
        <div className="container force-grid">
          {shift.forces.map((force) => (
            <article key={force.number} id={"force-" + force.number} className="force-card">
              {/* Show a photo only if this force has one in content.js */}
              {force.image && <img src={force.image} alt={force.imageAlt} className="force-card-image" loading="lazy" />}
              <div className="force-card-content">
                <div className="force-card-top">
                  <span className="force-card-icon">
                    <Icon name={force.icon} />
                  </span>
                </div>
                <h2 className="force-card-title">{force.title}</h2>
                <p className="force-card-text">{force.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <LinkedInBand />
    </>
  );
}

export default ShiftPage;
