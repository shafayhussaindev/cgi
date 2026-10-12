// GlassButton is the one button used for every call to action on the site.
//
// Props:
//   text      - the words on the button
//   to        - an internal page link, e.g. "/contact" (renders a React Router Link)
//   href      - an external link (opens in a new tab)
//   variant   - "orange" (default) or "glass-light" (white glass with blue text)
//   showArrow - true to add an arrow → after the text
//   type      - "submit" for form buttons (default "button")
//   onClick   - a function to run when the button is clicked

import { Link } from "react-router-dom";

function GlassButton(props) {
  // Choose the colour style
  let variant = "orange";
  if (props.variant) {
    variant = props.variant;
  }
  const className = "glass-button glass-button-" + variant;

  // The text, plus an optional arrow
  const label = (
    <>
      <span className="glass-button-text">{props.text}</span>
      {props.showArrow && (
        <span className="glass-button-arrow" aria-hidden="true">
          →
        </span>
      )}
    </>
  );

  // 1. Internal page link
  if (props.to) {
    return (
      <Link to={props.to} className={className} onClick={props.onClick}>
        {label}
      </Link>
    );
  }

  // 2. External link, opened in a new tab
  if (props.href) {
    return (
      <a href={props.href} className={className} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  // 3. A normal button (for forms and popups)
  let type = "button";
  if (props.type) {
    type = props.type;
  }
  return (
    <button type={type} className={className} onClick={props.onClick}>
      {label}
    </button>
  );
}

export default GlassButton;
