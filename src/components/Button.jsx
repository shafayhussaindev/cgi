// Button is the one button used for every call to action on the site.
// Every variant is a pill of "liquid glass" (styles in section 3 of index.css).
//
// Props:
//   text      - the words on the button
//   to        - an internal page link, e.g. "/contact" (renders a React Router Link)
//   href      - an external link (opens in a new tab)
//   variant   - "primary" (default, blue glass), "glass" (clear glass, takes the
//               text colour around it) or "light" (white glass, for dark backgrounds)
//   showArrow - true to add an arrow after the text (↗ for external links, → otherwise)
//   type      - "submit" for form buttons (default "button")
//   onClick   - a function to run when the button is clicked

import { Link } from "react-router-dom";

function Button(props) {
  // Choose the colour style
  let variant = "primary";
  if (props.variant) {
    variant = props.variant;
  }
  const className = "btn btn-" + variant;

  // External links get a diagonal arrow, everything else a straight one
  let arrow = "→";
  if (props.href) {
    arrow = "↗";
  }

  // The text, plus an optional arrow
  const label = (
    <>
      {props.text}
      {props.showArrow && <span aria-hidden="true">{arrow}</span>}
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

export default Button;
