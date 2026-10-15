// FocusAreasPage ("/focus-areas") lists the seven themes we publish on.

import { useEffect } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import LinkedInBand from "../components/LinkedInBand.jsx";
import DotBackground from "../components/DotBackground.jsx";
import { site, focusAreas } from "../data/content.js";

function FocusAreasPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "Focus Areas | " + site.name;
  }, []);

  return (
    <>
      {/* Page header (white) */}
      <section className="section-white page-top dot-header">
        <DotBackground />
        <div className="container">
          <SectionHeader eyebrow={focusAreas.eyebrow} title={focusAreas.title} intro={focusAreas.intro} isPageTitle={true} />
        </div>
      </section>

      {/* One card per area (ice) */}
      <section className="section-ice">
        <div className="container">
          <ul className="focus-grid">
            {focusAreas.areas.map((area) => (
              <li key={area.number} id={"area-" + area.number} className="card focus-card">
                <span className="item-number">{area.number}</span>
                <span className="focus-watermark" aria-hidden="true">{area.number}</span>
                <h2 className="focus-card-title">{area.title}</h2>
                <p className="focus-card-text">{area.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <LinkedInBand />
    </>
  );
}

export default FocusAreasPage;
