// Footer is the frosted glass panel at the bottom of every page.
// It sits on the same photo as the Home hero, which you can see blurred through the glass.

import { Link } from "react-router-dom";
import Button from "./Button.jsx";
import { site, navLinks, footer } from "../data/content.js";

// The current year, so the copyright line stays up to date
const year = new Date().getFullYear();

function Footer(props) {
  return (
    <footer className="footer" style={{ "--footer-photo": "url(" + footer.backgroundImage + ")" }}>
      <div className="footer-glass">
        {/* Top row: contact message on the left, links on the right */}
        <div className="footer-top">
          <div>
            <img src="/logo-reversed.png" alt={site.name} className="footer-logo" />
            <h2 className="footer-heading">{footer.contactEyebrow}</h2>
            <p className="footer-title">{footer.contactTitle}</p>
            <Button text={footer.contactButton} href={site.linkedinUrl} showArrow={true} />
          </div>

          <div className="footer-links">
            {/* Page links */}
            <nav aria-label="Footer">
              <h2 className="footer-heading">{footer.exploreTitle}</h2>
              <ul className="footer-list">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Legal">
              <h2 className="footer-heading">{footer.legalTitle}</h2>
              <ul className="footer-list">
                <li>
                  <Link to="/terms" className="footer-link">{footer.termsText}</Link>
                </li>
                <li>
                  <Link to="/privacy" className="footer-link">{footer.privacyText}</Link>
                </li>
                <li>
                  <button type="button" className="footer-link" onClick={props.onOpenCookieSettings}>
                    {footer.cookieText}
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Copyright sits below the navigation columns. */}
        <div className="footer-bottom">
          <p className="footer-copyright">© {year} {footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
