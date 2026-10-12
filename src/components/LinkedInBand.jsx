// LinkedInBand is the dark "Stay ahead of what is coming" strip
// shown just above the footer on every page.

import Button from "./Button.jsx";
import { site, linkedinBand } from "../data/content.js";

function LinkedInBand() {
  return (
    <section className="linkedin-band" aria-labelledby="linkedin-band-title">
      <div className="container linkedin-band-inner">
        <h2 id="linkedin-band-title" className="linkedin-band-title">
          {linkedinBand.title}
        </h2>

        <div>
          <p className="linkedin-band-text">{linkedinBand.text}</p>
          {/* Opens the LinkedIn page in a new tab */}
          <Button text={linkedinBand.buttonText} href={site.linkedinUrl} variant="light" showArrow={true} />
        </div>
      </div>
    </section>
  );
}

export default LinkedInBand;
