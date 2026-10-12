// Navbar is the floating glass "capsule" at the top of every page.
// A clear glass pill sits behind the current page's link and slides to
// whichever link you hover, like a water droplet (see section 4 of index.css).
// On small screens the links move into a dropdown menu.

import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Button from "./Button.jsx";
import { site, navLinks } from "../data/content.js";

function Navbar() {
  // true when the mobile dropdown menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The number of the link for the current page (-1 if it is not in the menu, e.g. Contact)
  const location = useLocation();
  const activeIndex = navLinks.findIndex((link) => link.to === location.pathname);

  // Before the glass pill slides to link number newIndex, note on the list which way it
  // is heading ("left" or "right"), so the CSS can let the front edge lead.
  // This is written straight onto the list (not with useState) so it is already
  // there when the browser starts the movement.
  function movePill(list, newIndex) {
    const oldIndex = Number(list.dataset.pill);
    if (newIndex > oldIndex) {
      list.dataset.direction = "right";
    }
    if (newIndex < oldIndex) {
      list.dataset.direction = "left";
    }
    list.dataset.pill = newIndex;
  }

  // Close the mobile menu (used when a link is tapped)
  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="navbar-wrapper">
      {/* Lets keyboard users jump straight past the menu */}
      <a href="#main-content" className="navbar-skip-link">
        Skip to content
      </a>

      <nav className="navbar" aria-label="Main">
        {/* Logo, links back to Home */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img src="/logo-full-colour.png" alt={site.name + " home"} />
        </Link>

        {/* Main links (hidden on mobile). When the mouse leaves, the pill goes back to the current page. */}
        <ul
          className="navbar-links"
          data-pill={activeIndex}
          onMouseLeave={(event) => movePill(event.currentTarget, activeIndex)}
        >
          {navLinks.map((link, index) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className="navbar-link"
                onMouseEnter={(event) => movePill(event.currentTarget.closest("ul"), index)}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-end">
          {/* Contact is a button, not a normal link */}
          <Button text="Contact" to="/contact" onClick={closeMenu} showArrow={true} />

          {/* This button opens and closes the mobile menu */}
          <button
            type="button"
            className="navbar-menu-button"
            aria-expanded={isMenuOpen}
            aria-controls="navbar-mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="visually-hidden">Menu</span>
            <span aria-hidden="true">{isMenuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {isMenuOpen && (
        <nav id="navbar-mobile-menu" className="navbar-mobile-menu" aria-label="Mobile">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end className="navbar-link" onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
