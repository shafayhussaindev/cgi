// FocusAreasPage ("/focus-areas") lists the seven themes we publish on.

import { useEffect } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import LinkedInBand from "../components/LinkedInBand.jsx";
import { site, focusAreas } from "../data/content.js";

function FocusAreasPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "Focus Areas | " + site.name;
  }, []);

  return (
    <>
      {/* Blue page header band */}
      <section className="section-blue page-top">
        <div className="container">
          <SectionHeader
            eyebrow={focusAreas.eyebrow}
            title={focusAreas.title}
            intro={focusAreas.intro}
            isPageTitle={true}
            onBlue={true}
          />
        </div>
      </section>

      {/* Glass cards on a white section */}
      <section className="section-white glass-backdrop">
        <div className="container">
          <ul className="focus-grid">
            {focusAreas.areas.map((area) => (
              <li key={area.number} id={"area-" + area.number} className="focus-card glass-card" data-tilt>
                {/* Orange numbers are fine here because the card is white */}
                <span className="focus-card-number">{area.number}</span>
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
