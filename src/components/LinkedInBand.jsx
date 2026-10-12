// LinkedInBand is the blue "Stay ahead of what is coming" strip
// shown just above the footer on every page.

import GlassButton from "./GlassButton.jsx";
import { site, linkedinBand } from "../data/content.js";
import "./LinkedInBand.css";

function LinkedInBand() {
  return (
    <section className="linkedin-band" aria-labelledby="linkedin-band-title">
      <div className="container">
        {/* Glass box: lifts and its text ripples when hovered */}
        <div className="glass-box glass-box-on-blue linkedin-band-inner">
          <h2 id="linkedin-band-title" className="linkedin-band-title">
            {linkedinBand.title}
          </h2>
          <p className="linkedin-band-text">{linkedinBand.text}</p>

          {/* Opens the LinkedIn page in a new tab */}
          <GlassButton text={linkedinBand.buttonText} href={site.linkedinUrl} showArrow={true} />
        </div>
      </div>
    </section>
  );
}

export default LinkedInBand;
