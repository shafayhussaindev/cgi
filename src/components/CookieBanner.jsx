// CookieBanner is the small card shown at the bottom-left on a first visit.
// It asks the visitor to accept or reject cookies, or open the settings.
//
// Props (all are functions from App.jsx):
//   onAcceptAll, onRejectAll, onOpenSettings

import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import { cookies } from "../data/content.js";

function CookieBanner(props) {
  return (
    <section className="cookie-banner" aria-label="Cookie notice">
      <p className="cookie-banner-text">
        {cookies.bannerText}{" "}
        <Link to="/privacy" className="cookie-banner-link">
          {cookies.privacyLinkText}
        </Link>
      </p>

      <div className="cookie-banner-buttons">
        <Button text={cookies.acceptAll} onClick={props.onAcceptAll} />
        <Button text={cookies.rejectAll} variant="glass" onClick={props.onRejectAll} />

        {/* This text button opens the cookie settings popup */}
        <button type="button" className="cookie-banner-settings" onClick={props.onOpenSettings}>
          {cookies.settings}
        </button>
      </div>
    </section>
  );
}

export default CookieBanner;
