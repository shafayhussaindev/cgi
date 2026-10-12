// NotFoundPage is shown when someone visits an address that does not exist.

import { useEffect } from "react";
import GlassButton from "../components/GlassButton.jsx";
import SectionHeader from "../components/SectionHeader.jsx";
import { site, notFound } from "../data/content.js";

function NotFoundPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "Page not found | " + site.name;
  }, []);

  return (
    <section className="section-white page-top">
      <div className="container">
        <SectionHeader eyebrow={notFound.eyebrow} title={notFound.title} intro={notFound.text} isPageTitle={true} />
        <GlassButton text={notFound.buttonText} to="/" showArrow={true} />
      </div>
    </section>
  );
}

export default NotFoundPage;
