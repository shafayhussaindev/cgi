// CookieSettingsModal is the centred popup where visitors choose which cookies to allow.
//
// Props:
//   savedChoice  - the choice saved before (or null)
//   onSave       - function to save a choice object
//   onAcceptAll  - function to accept every category
//   onClose      - function to close the popup without saving

import { useState, useEffect } from "react";
import GlassButton from "./GlassButton.jsx";
import { cookies } from "../data/content.js";
import "./CookieSettingsModal.css";

function CookieSettingsModal(props) {
  // Start the switches from the saved choice, or "off" if there is none
  let startAnalytics = false;
  let startMarketing = false;
  if (props.savedChoice) {
    startAnalytics = props.savedChoice.analytics === true;
    startMarketing = props.savedChoice.marketing === true;
  }

  const [analytics, setAnalytics] = useState(startAnalytics);
  const [marketing, setMarketing] = useState(startMarketing);

  // The function that closes the popup (from App.jsx)
  const closeModal = props.onClose;

  // When the popup opens: move keyboard focus into it and listen for the Escape key
  useEffect(() => {
    const panel = document.getElementById("cookie-modal-panel");
    if (panel) {
      panel.focus();
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeModal();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    // Stop listening when the popup closes
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal]);

  // Close when the dark area outside the panel is clicked
  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      props.onClose();
    }
  }

  // Save the switches as they are now
  function handleSave() {
    props.onSave({ necessary: true, analytics: analytics, marketing: marketing });
  }

  // Get the on/off value and change function for each category
  function getSwitch(key) {
    if (key === "analytics") {
      return { checked: analytics, onChange: () => setAnalytics(!analytics), disabled: false };
    }
    if (key === "marketing") {
      return { checked: marketing, onChange: () => setMarketing(!marketing), disabled: false };
    }
    // "necessary" is always on and cannot be changed
    return { checked: true, onChange: () => {}, disabled: true };
  }

  return (
    <div className="cookie-modal-backdrop" onClick={handleBackdropClick}>
      <div
        id="cookie-modal-panel"
        className="cookie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-modal-title"
        tabIndex={-1}
      >
        <div className="cookie-modal-header">
          <h2 id="cookie-modal-title" className="cookie-modal-title">
            {cookies.modalTitle}
          </h2>
          {/* This button closes the popup */}
          <button type="button" className="cookie-modal-close" onClick={props.onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {/* One row per cookie category, each with a switch */}
        <ul className="cookie-modal-list">
          {cookies.categories.map((category) => {
            const toggle = getSwitch(category.key);
            return (
              <li key={category.key} className="cookie-modal-item">
                <label className="cookie-modal-label" htmlFor={"cookie-" + category.key}>
                  <span className="cookie-modal-item-title">{category.title}</span>
                  <span className="cookie-modal-item-text">{category.text}</span>
                </label>
                <input
                  id={"cookie-" + category.key}
                  type="checkbox"
                  role="switch"
                  className="cookie-switch"
                  checked={toggle.checked}
                  onChange={toggle.onChange}
                  disabled={toggle.disabled}
                />
              </li>
            );
          })}
        </ul>

        <div className="cookie-modal-buttons">
          <GlassButton text={cookies.save} onClick={handleSave} />
          <GlassButton text={cookies.acceptAll} variant="glass-light" onClick={props.onAcceptAll} />
        </div>
      </div>
    </div>
  );
}

export default CookieSettingsModal;
