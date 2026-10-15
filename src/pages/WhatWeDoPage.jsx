// WhatWeDoPage ("/what-we-do") explains what the platform is for.
// Left: text. Right: a dark panel about static and live intelligence.

import { useEffect } from "react";
import LinkedInBand from "../components/LinkedInBand.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import DotBackground from "../components/DotBackground.jsx";
import { site, whatWeDo } from "../data/content.js";

function WhatWeDoPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "What We Do | " + site.name;
  }, []);

  return (
    <>
      <section className="section-white page-top what-header dot-header">
        <DotBackground />
        <div className="container">
          <SectionHeader eyebrow={whatWeDo.eyebrow} title={whatWeDo.title} intro={whatWeDo.paragraphs[0]} isPageTitle={true} />
        </div>
      </section>

      <section className="section-white what-section">
        <div className="container what-layout">
          <div className="what-text">
            <p className="lead">{whatWeDo.paragraphs[1]}</p>
            <p className="lead what-callout">{whatWeDo.paragraphs[2]}</p>
          </div>

          {/* Right column: dark panel */}
          <aside className="what-panel">
            <h2 className="what-panel-title">{whatWeDo.panel.title}</h2>
            <p className="what-panel-text">{whatWeDo.panel.text}</p>

            <div className="data-bridge" aria-hidden="true"><span>↔</span></div>
            <div className="what-panel-columns">
              {whatWeDo.panel.columns.map((column) => (
                <div key={column.label}>
                  {/* Light eyebrow: orange is not allowed on dark backgrounds */}
                  <h3 className="eyebrow eyebrow-light">{column.label}</h3>
                  <p className="what-panel-text">{column.text}</p>
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
