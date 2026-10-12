// ContactPage ("/contact") shows the contact form and a LinkedIn option.

import { useEffect } from "react";
import SectionHeader from "../components/SectionHeader.jsx";
import ContactForm from "../components/ContactForm.jsx";
import GlassButton from "../components/GlassButton.jsx";
import LinkedInBand from "../components/LinkedInBand.jsx";
import { site, contact } from "../data/content.js";
import "./ContactPage.css";

function ContactPage() {
  // Set the browser tab title
  useEffect(() => {
    document.title = "Contact | " + site.name;
  }, []);

  return (
    <>
      {/* Page header (white) */}
      <section className="section-white page-top">
        <div className="container">
          <SectionHeader eyebrow={contact.eyebrow} title={contact.title} intro={contact.text} isPageTitle={true} />
        </div>
      </section>

      {/* Form card and LinkedIn box (ice) */}
      <section className="section-ice">
        <div className="container contact-layout">
          <div className="contact-card">
            <ContactForm />
          </div>

          <aside className="contact-linkedin">
            <h2 className="contact-linkedin-title">{contact.linkedinTitle}</h2>
            <p className="contact-linkedin-text">{contact.linkedinText}</p>
            <GlassButton text="LinkedIn" href={site.linkedinUrl} showArrow={true} />
          </aside>
        </div>
      </section>

      <LinkedInBand />
    </>
  );
}

export default ContactPage;
