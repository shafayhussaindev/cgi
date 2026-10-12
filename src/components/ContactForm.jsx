// ContactForm is the message form on the Contact page.
// It checks the required fields and shows a thank-you message.
// It does NOT send email yet (see the comment in handleSubmit).

import { useState } from "react";
import GlassButton from "./GlassButton.jsx";
import { contact } from "../data/content.js";

// The empty form, used at the start and after sending
const emptyForm = { name: "", email: "", company: "", reason: contact.reasons[0], message: "" };

function ContactForm() {
  // What the visitor has typed
  const [values, setValues] = useState(emptyForm);

  // Error messages, e.g. { email: "Please enter your email" }
  const [errors, setErrors] = useState({});

  // true after a successful send
  const [isSent, setIsSent] = useState(false);

  // Update one field when the visitor types
  function handleChange(event) {
    const newValues = Object.assign({}, values);
    newValues[event.target.name] = event.target.value;
    setValues(newValues);
  }

  // Check the required fields. Returns an object with any error messages.
  function checkForm() {
    const newErrors = {};
    if (values.name.trim() === "") {
      newErrors.name = contact.errors.name;
    }
    if (values.email.trim() === "") {
      newErrors.email = contact.errors.email;
    } else if (!values.email.includes("@") || !values.email.includes(".")) {
      newErrors.email = contact.errors.emailFormat;
    }
    if (values.message.trim() === "") {
      newErrors.message = contact.errors.message;
    }
    return newErrors;
  }

  // Runs when the form is submitted
  function handleSubmit(event) {
    // Stop the browser from reloading the page
    event.preventDefault();

    const newErrors = checkForm();
    setErrors(newErrors);

    // If there are any errors, stop here
    if (Object.keys(newErrors).length > 0) {
      setIsSent(false);
      return;
    }

    // ---------------------------------------------------------------
    // TODO: send the message to a real email service here.
    // For example, EmailJS (emailjs.com) or Formspree (formspree.io):
    // they give you a short code snippet to send `values` by email.
    // ---------------------------------------------------------------

    setValues(emptyForm);
    setIsSent(true);
  }

  // Shows an error message under a field, if that field has one
  function showError(fieldName) {
    if (!errors[fieldName]) {
      return null;
    }
    return (
      <p id={fieldName + "-error"} className="contact-form-error">
        <span aria-hidden="true">⚠</span> {errors[fieldName]}
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form-field">
        <label htmlFor="name">Name *</label>
        <input id="name" name="name" type="text" autoComplete="name" value={values.name} onChange={handleChange}
          aria-invalid={errors.name ? "true" : "false"} aria-describedby="name-error" />
        {showError("name")}
      </div>

      <div className="contact-form-field">
        <label htmlFor="email">Email *</label>
        <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={handleChange}
          aria-invalid={errors.email ? "true" : "false"} aria-describedby="email-error" />
        {showError("email")}
      </div>

      <div className="contact-form-field">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" autoComplete="organization" value={values.company} onChange={handleChange} />
      </div>

      <div className="contact-form-field">
        <label htmlFor="reason">Reason</label>
        <select id="reason" name="reason" value={values.reason} onChange={handleChange}>
          {contact.reasons.map((reason) => (
            <option key={reason} value={reason}>
              {reason}
            </option>
          ))}
        </select>
      </div>

      <div className="contact-form-field">
        <label htmlFor="message">Message *</label>
        <textarea id="message" name="message" rows="6" value={values.message} onChange={handleChange}
          aria-invalid={errors.message ? "true" : "false"} aria-describedby="message-error" />
        {showError("message")}
      </div>

      <GlassButton text={contact.submitText} type="submit" showArrow={true} />

      {/* Thank-you message, read out by screen readers when it appears */}
      <p className="contact-form-success" role="status">
        {isSent ? contact.successMessage : ""}
      </p>
    </form>
  );
}

export default ContactForm;
