// LinkedInBand is the centred "Stay ahead of what is coming" message
// shown just above the footer on every page.

import { linkedinBand } from "../data/content.js";

function LinkedInBand() {
  return (
    <section className="linkedin-band" aria-labelledby="linkedin-band-title">
      <div className="container">
        <div className="linkedin-band-inner">
          <h2 id="linkedin-band-title" className="linkedin-band-title">
            {linkedinBand.title}
          </h2>

          <p className="linkedin-band-text">{linkedinBand.text}</p>
        </div>
      </div>
    </section>
  );
}

export default LinkedInBand;
