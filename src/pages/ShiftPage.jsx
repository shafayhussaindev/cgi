// ShiftPage ("/the-shift") explains the four forces reshaping the industry.

import { useEffect } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import LinkedInBand from "../components/LinkedInBand.jsx";
import { site, shift } from "../data/content.js";
import "./ShiftPage.css";

function ShiftPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "The Shift | " + site.name;
  }, []);

  return (
    <>
      {/* Page header (white) */}
      <section className="section-white page-top">
        <div className="container">
          <SectionHeader eyebrow={shift.eyebrow} title={shift.title} intro={shift.intro} isPageTitle={true} />
        </div>
      </section>

      {/* The four forces in a 2 x 2 panel (ice) */}
      <section className="section-ice">
        <div className="container">
          <div className="shift-panel">
            {shift.forces.map((force) => {
              // Cells with a photo get a dark blue photo background and light text
              let cellClass = "shift-cell";
              if (force.image) {
                cellClass = "shift-cell shift-cell-photo";
              }

              return (
                <article key={force.number} id={"force-" + force.number} className={cellClass}>
                  {/* Show a photo only if this force has one in content.js */}
                  {force.image && <img src={force.image} alt={force.imageAlt} className="shift-cell-image" data-parallax="0.08" />}
                  <span className="item-number">{force.number}</span>
                  <h2 className="shift-cell-title">{force.title}</h2>
                  <p className="shift-cell-text">{force.text}</p>
                  {/* Short line at the bottom of each cell */}
                  <span className="shift-cell-line" aria-hidden="true"></span>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <LinkedInBand />
    </>
  );
}

export default ShiftPage;
