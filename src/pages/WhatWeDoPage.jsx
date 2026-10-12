// WhatWeDoPage ("/what-we-do") explains what the platform is for.
// Left: text. Right: a blue panel about static and live intelligence.

import { useEffect } from "react";
import LinkedInBand from "../components/LinkedInBand.jsx";
import { site, whatWeDo } from "../data/content.js";

function WhatWeDoPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "What We Do | " + site.name;
  }, []);

  return (
    <>
      <section className="section-ice page-top glass-backdrop">
        <div className="container what-layout">
          {/* Left column: heading and paragraphs */}
          <div id="approach" className="what-text">
            <span className="eyebrow">{whatWeDo.eyebrow}</span>
            <h1 className="what-title">{whatWeDo.title}</h1>
            {whatWeDo.paragraphs.map((paragraph) => (
              <p key={paragraph} className="what-paragraph">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right column: blue panel */}
          <aside id="static-live" className="what-panel glass-card-blue" data-tilt>
            {/* Faint rings in the corner */}
            <svg className="what-panel-rings" viewBox="0 0 300 300" aria-hidden="true">
              <circle cx="300" cy="0" r="120" />
              <circle cx="300" cy="0" r="180" />
              <circle cx="300" cy="0" r="240" />
            </svg>

            <h2 className="what-panel-title">{whatWeDo.panel.title}</h2>
            <p className="what-panel-text">{whatWeDo.panel.text}</p>

            <div className="what-panel-columns">
              {whatWeDo.panel.columns.map((column) => (
                <div key={column.label}>
                  {/* White eyebrow: orange is not allowed on blue */}
                  <h3 className="eyebrow eyebrow-white">{column.label}</h3>
                  <p className="what-panel-column-text">{column.text}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <LinkedInBand />
    </>
  );
}

export default WhatWeDoPage;
