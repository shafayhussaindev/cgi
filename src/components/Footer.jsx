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
            <Button text={footer.contactButton} to="/contact" variant="light" showArrow={true} />
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
                <li>
                  <Link to="/contact" className="footer-link">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* LinkedIn and website */}
            <div>
              <h2 className="footer-heading">{footer.connectTitle}</h2>
              <ul className="footer-list">
                <li>
                  <a href={site.linkedinUrl} className="footer-link" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href={site.websiteUrl} className="footer-link">
                    {site.websiteText}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright and legal links on the left, LinkedIn icon on the right */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p className="footer-copyright">
              © {year} {footer.rights}
            </p>
            <div className="footer-legal">
              <Link to="/terms" className="footer-link">
                {footer.termsText}
              </Link>
              <Link to="/privacy" className="footer-link">
                {footer.privacyText}
              </Link>
              {/* This button opens the cookie settings popup */}
              <button type="button" className="footer-link" onClick={props.onOpenCookieSettings}>
                {footer.cookieText}
              </button>
            </div>
          </div>

          <a href={site.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social">
            {/* Simple LinkedIn "in" icon */}
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="4" fill="currentColor" />
              <path
                className="footer-social-in"
                d="M7 10v7M7 7v.01M11 17v-4a2 2 0 0 1 4 0v4M11 10v7"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
