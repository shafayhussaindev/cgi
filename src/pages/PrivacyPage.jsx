// PrivacyPage ("/privacy") shows the Privacy Policy.
// The text lives in content.js under legal.privacy.

import { useEffect } from "react";
import LegalContent from "../components/LegalContent.jsx";
import { site, legal } from "../data/content.js";

function PrivacyPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "Privacy Policy | " + site.name;
  }, []);

  return <LegalContent page={legal.privacy} />;
}

export default PrivacyPage;
