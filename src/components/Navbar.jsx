// Navbar is the floating glass "capsule" at the top of every page.
// On desktop, hovering a link opens a glass dropdown (submenu) below it.
// On small screens the links move into a dropdown menu.

import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import GlassButton from "./GlassButton.jsx";
import { site, navLinks } from "../data/content.js";

function Navbar() {
  // true when the mobile dropdown menu is open
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // true when the page has scrolled down a little
  const [isScrolled, setIsScrolled] = useState(false);

  // Watch the scroll position. After 20px, make the capsule a bit more solid.
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll);

    // Stop listening when the navbar is removed
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Build the class name for the capsule
  let navClass = "navbar";
  if (isScrolled) {
    navClass = "navbar navbar-scrolled";
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

      <nav className={navClass} aria-label="Main">
        {/* Logo, links back to Home */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img src="/logo-full-colour.png" alt={site.name + " home"} />
        </Link>

        {/* Main links with their dropdowns (hidden on mobile) */}
        <div className="menu">
          <div className="menu-inner">
            <ul>
              {navLinks.map((link) => {
                // Links with a dropdown get an extra class so the CSS can show it
                let itemClass = "";
                if (link.submenu) {
                  itemClass = "has-submenu";
                }
                return (
                  <li key={link.to} className={itemClass}>
                    <NavLink to={link.to} end className="menu-link">
                      {link.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            {/* One shared dropdown panel. It slides under whichever link is hovered.
                "submenu-2" belongs to the 2nd link, "submenu-3" to the 3rd, and so on. */}
            <div className="submenu">
              {navLinks.map((link, index) => {
                if (!link.submenu) {
                  return null;
                }
                return (
                  <div key={link.to} className={"submenu-" + (index + 1)}>
                    <ul>
                      {link.submenu.map((item) => (
                        <li key={item.to}>
                          <Link to={item.to} className="submenu-link">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Empty spacer that pushes the Contact button to the right */}
        <span></span>

        <div className="end">
          {/* Contact is a button, not a normal link */}
          <GlassButton text="Contact" to="/contact" onClick={closeMenu} />

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
            <NavLink key={link.to} to={link.to} end className="navbar-mobile-link" onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}

export default Navbar;
