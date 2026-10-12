// TermsPage ("/terms") shows the Terms & Conditions.
// The text lives in content.js under legal.terms.

import { useEffect } from "react";
import LegalContent from "../components/LegalContent.jsx";
import { site, legal } from "../data/content.js";

function TermsPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "Terms & Conditions | " + site.name;
  }, []);

  return <LegalContent page={legal.terms} />;
}

export default TermsPage;
