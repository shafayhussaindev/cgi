// App is the main layout of the website.
// It shows the Navbar, the current page, the Footer and the cookie popups.
// It also remembers the visitor's cookie choice.

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Animations from "./components/Animations.jsx";
import BackToTop from "./components/BackToTop.jsx";
import CookieBanner from "./components/CookieBanner.jsx";
import CookieSettingsModal from "./components/CookieSettingsModal.jsx";

import HomePage from "./pages/HomePage.jsx";
import ShiftPage from "./pages/ShiftPage.jsx";
import WhatWeDoPage from "./pages/WhatWeDoPage.jsx";
import FocusAreasPage from "./pages/FocusAreasPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// The name we use to save the cookie choice in the browser
const CONSENT_KEY = "cgi-cookie-consent";

// Step 1: read a saved cookie choice from the browser, if there is one.
// We use try/catch because some browsers (private mode) block localStorage.
function getSavedConsent() {
  try {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Nothing saved or storage blocked: treat it as "no choice yet"
  }
  return null;
}

function App() {
  // Step 2: show the banner only if the visitor has not chosen yet
  const [showBanner, setShowBanner] = useState(getSavedConsent() === null);

  // Step 3: the cookie settings popup starts closed
  const [showSettings, setShowSettings] = useState(false);

  // Step 4: save a choice, then hide the banner and the popup
  function saveConsent(choice) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(choice));
    } catch {
      // Storage blocked: the choice still applies for this visit
    }

    // This is where analytics scripts would be loaded, ONLY if allowed.
    // For example:
    // if (choice.analytics === true) {
    //   load your analytics script here (Google Analytics, Plausible, etc.)
    // }
    // No real tracking is added on purpose.

    setShowBanner(false);
    setShowSettings(false);
  }

  // Ready-made choices for the "Accept all" and "Reject all" buttons
  function acceptAll() {
    saveConsent({ necessary: true, analytics: true, marketing: true });
  }

  function rejectAll() {
    saveConsent({ necessary: true, analytics: false, marketing: false });
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />

      {/* Lenis scrolls the native page; these containers preserve the page layout. */}
      <div id="smooth-wrapper">
        <div id="smooth-content">
          {/* The current page appears here */}
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/the-shift" element={<ShiftPage />} />
              <Route path="/what-we-do" element={<WhatWeDoPage />} />
              <Route path="/focus-areas" element={<FocusAreasPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* The footer's "Cookie settings" button opens the popup */}
          <Footer onOpenCookieSettings={() => setShowSettings(true)} />
        </div>
      </div>

      {/* Round glass "back to top" button (bottom-right, appears after scrolling) */}
      <BackToTop />

      {/* Cookie banner: only on the first visit, and hidden while the popup is open */}
      {showBanner && !showSettings && (
        <CookieBanner
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onOpenSettings={() => setShowSettings(true)}
        />
      )}

      {/* Cookie settings popup */}
      {showSettings && (
        <CookieSettingsModal
          savedChoice={getSavedConsent()}
          onSave={saveConsent}
          onAcceptAll={acceptAll}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Smooth scrolling, parallax and reveal animations (set up after the page above) */}
      <Animations />
    </>
  );
}

export default App;
