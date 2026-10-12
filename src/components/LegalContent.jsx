// LegalContent shows a legal page (Terms or Privacy) in a narrow, easy-to-read column.
// Both TermsPage and PrivacyPage use it, so they always look the same.
//
// Props:
//   page - the legal text object from content.js (legal.terms or legal.privacy)

import { legal } from "../data/content.js";

function LegalContent(props) {
  const page = props.page;

  return (
    <>
      {/* Page header (white) */}
      <section className="section-white page-top">
        <div className="container legal-column">
          <span className="eyebrow">{page.eyebrow}</span>
          <h1 className="legal-title">{page.title}</h1>
          <p className="legal-updated">Last updated: {page.lastUpdated}</p>
        </div>
      </section>

      {/* The legal text (ice) */}
      <section className="section-ice">
        <div className="container legal-column">
          {/* Reminder to replace the placeholder text */}
          <p className="legal-notice" role="note">
            {legal.notice}
          </p>

          {page.sections.map((section) => (
            <div key={section.heading} className="legal-section">
              <h2 className="legal-heading">{section.heading}</h2>
              <p>{section.text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default LegalContent;
