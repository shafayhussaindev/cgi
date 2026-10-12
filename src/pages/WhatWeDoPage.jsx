// WhatWeDoPage ("/what-we-do") explains what the platform is for.
// Left: text. Right: a dark panel about static and live intelligence.

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
      <section className="section-white page-top">
        <div className="container what-layout">
          {/* Left column: heading and paragraphs */}
          <div className="what-text">
            <span className="eyebrow">{whatWeDo.eyebrow}</span>
            <h1 className="section-header-title section-header-page-title">{whatWeDo.title}</h1>
            {whatWeDo.paragraphs.map((paragraph) => (
              <p key={paragraph} className="lead">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Right column: dark panel */}
          <aside className="what-panel">
            <h2 className="what-panel-title">{whatWeDo.panel.title}</h2>
            <p className="what-panel-text">{whatWeDo.panel.text}</p>

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
